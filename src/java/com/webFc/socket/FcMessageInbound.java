/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket;

import com.google.gson.Gson;
import com.webFc.data.*;
import com.webFc.database.DataProxy;
import com.webFc.global.IData;
import com.webFc.socket.MessageType.*;
import java.io.*;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.sql.SQLException;
import java.util.*;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.http.HttpServletResponse;
import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.mime.MultipartEntity;
import org.apache.http.entity.mime.content.FileBody;
import org.apache.http.entity.mime.content.StringBody;
import org.apache.http.impl.client.DefaultHttpClient;

/**
 *
 * @author fish
 */
public class FcMessageInbound extends MessageInbound {

	 private static RoomManager rooms = new RoomManager();
	 String username;
	 int idRoom;
	 Gson gson;

	 public FcMessageInbound() {
		  username = "";
		  idRoom = -1;
		  gson = new Gson();
	 }

	 @Override
	 protected void onOpen(WsOutbound outbound) {
		  System.out.println(this.toString() + " ,new connection created");
	 }

	 @Override
	 protected void onClose(int status) {
		  try {
				System.out.println(this.toString() + "closed");
				rooms.logoutRoom(idRoom, username);
		  } catch (IOException ex) {
				Logger.getLogger(FcMessageInbound.class.getName()).log(Level.SEVERE, null, ex);
		  }
	 }

	 @Override
	 protected void onBinaryMessage(ByteBuffer bb) throws IOException {
		  throw new UnsupportedOperationException("Not supported yet.");
	 }

    @Override
    protected void onTextMessage(CharBuffer cb) throws IOException {
	String str = cb.toString();
	System.out.println(str);
	if (str != null && !str.isEmpty()) {
	    Data textData = gson.fromJson(str, Data.class);
	    //System.out.println(textData.getType());
	    //System.out.println(idRoom + " " + username);
	    if (textData.getType().equals("LoginRoom")) {
		loginRome(str);
		String userList = rooms.getUserList(idRoom);
		getUserList gul = gson.fromJson(userList, getUserList.class);
		roomBroadcast(userList);
		if(gul.getUsage().equals("first")){ roomToUser(username, userList); }
		else{
			sendUserList sul = new sendUserList();
			sul.setFrom(username);			
			roomRandomSend(gson.toJson(sul));
		}
		roomBroadcast(str);
		getFileList();
	    } else if(textData.getType().equals("leaveRoom")){
			roomBroadcast(str);
			leaveRoom lr = gson.fromJson(str, leaveRoom.class);
			String userList = rooms.leaveUserList(idRoom, lr.getUsername());
			System.out.println(userList);
			roomBroadcast(userList);
		} else if (idRoom > 0 && !username.isEmpty()) {
		if (textData.getType().equals("doodlePic")) {
		    doodlePic dp = gson.fromJson(str, doodlePic.class);
		    if (dp.getUsage().equals("replyDoodle")) {
			roomToUser(dp.getTo(), str);
		    } else if (dp.getUsage().equals("saveDoodle")) {
			saveDoodle(dp);
		    }
		}/* else if (textData.getType().equals("getUserList")){
			rooms.getUserList();
		}*/else if (textData.getType().equals("uploadFile")) {
		    int r = newFile(str);
			getFileList();
		    //openFile(r);
		} else if (textData.getType().equals("getUserList")) {
			getUserList gul = gson.fromJson(str, getUserList.class);
			roomToUser(gul.getTo(), str);
		} else if(textData.getType().equals("chatMessagePrivate")){
			replyNote rnt = gson.fromJson(str, replyNote.class);
			roomToUser(rnt.getTo(), str);
		} else if(textData.getType().equals("replyNote")){
			ChatMessage cm = gson.fromJson(str, ChatMessage.class);
			roomToUser(cm.getTo(), str);
		}else if (textData.getType().equals("dragMessage")) {
		    SaveDrag sdf = gson.fromJson(str, SaveDrag.class);
		    if (sdf.getMovement().equals("save")) {
			try {
			    IData itf = new DataProxy();
			    if (sdf.getElement().equals("file")) {
				itf.updateTableFile(sdf.getId(), sdf.isOnTable(), sdf.getX(), sdf.getY(), sdf.getRotate());
			    } else if (sdf.getElement().equals("note")) {
				if (rooms.getIdFile(idRoom) > 0) {
				    itf.updateFileNote(sdf.getId(), sdf.getX(), sdf.getY());
				} else {
				    itf.updateRoomNote(sdf.getId(), sdf.getX(), sdf.getY());
				}
			    }
			} catch (SQLException ex) {
			    Logger.getLogger(FcMessageInbound.class.getName()).log(Level.SEVERE, null, ex);
			}
		    } else {
			roomBroadcast(str);
		    }
		} else if (textData.getType().equals("NewNote")) {
		    NewNote nn = gson.fromJson(str, NewNote.class);
		    try {
			IData itf = new DataProxy();
			int idNote;
			if (rooms.getIdFile(idRoom) > 0) {
			    idNote = itf.newFileNote(nn.getContext(), nn.getX(), nn.getY(), rooms.getIdFile(idRoom));
			    FileNoteInfo result = new FileNoteInfo();
			    result.setIdFileNote(idNote);
			    result.setNoteContext(nn.getContext());
			    result.setX(nn.getX());
			    result.setY(nn.getY());
			    sendBack(gson.toJson(result));
			    roomBroadcast(gson.toJson(result));
			} else {
			    idNote = itf.newRoomNote(nn.getContext(), nn.getX(), nn.getY(), idRoom);
			    RoomNoteInfo result = new RoomNoteInfo();
			    result.setIdRoomNote(idNote);
			    result.setNoteContext(nn.getContext());
			    result.setX(nn.getX());
			    result.setY(nn.getY());
			    sendBack(gson.toJson(result));
			    roomBroadcast(gson.toJson(result));
			  }
		    } catch (SQLException ex) {
					Logger.getLogger(FcMessageInbound.class.getName()).log(Level.SEVERE, null, ex);
			  }
		} else if (textData.getType().equals("requestOpenFile")) {
			requestOpenFile rof = gson.fromJson(str, requestOpenFile.class);
			//openFile(rof.getIdFile());
		} else if (textData.getType().equals("answer") || textData.getType().equals("candidate") || textData.getType().equals("offer")) {
			callMessage cm = gson.fromJson(str, callMessage.class);
			if (cm.getSendTo() != null && !cm.getSendTo().isEmpty()) {
				roomToUser(cm.getSendTo(), str);
			} else {
				roomBroadcast(str);
			}
		} else if ( textData.getType().equals("videoRequest") ) {
			roomBroadcast(str);
			roomToUser(username,str);
		} else if ( textData.getType().equals("getVideoState") ) {
			getVideoState gvs = gson.fromJson(str, getVideoState.class);
			roomToUser(gvs.getTo(), str);
		} else {
			//System.out.println("hello");
			roomBroadcast(str);
		}
	    }
	   }
	}

	 private void roomBroadcast(String message) throws IOException {
		  if (idRoom > 0) {
				rooms.broadcast(idRoom, message, this);
		  }
	 }

	 private void roomToUser(String username, String message) throws IOException {
		  if (idRoom > 0) {
				rooms.sendUserMessage(idRoom, username, message);
		  }
	 }
	 
	 private void roomRandomSend(String message) throws IOException {
		  if (idRoom > 0) {
				rooms.randomSendNotMe(idRoom, username, message);
		  }
	 }

	 private void sendBack(String message) throws IOException {
		  CharBuffer buffer = CharBuffer.wrap(message);
		  this.getWsOutbound().writeTextMessage(buffer);
	 }

	 private void loginRome(String str) throws IOException {
		  LoginRoom lg = gson.fromJson(str, LoginRoom.class);
		  if (rooms.loginRoom(lg.getIdRoom(), lg.getUsername(), this)) {
				idRoom = lg.getIdRoom();
				username = lg.getUsername();
				if (rooms.getIdFile(idRoom) > 0) {
					 enterFile();
				} else {
					 enterRoom();
				}
		  } else {
				if (rooms.firstLoginRoom(lg.getIdRoom(), lg.getUsername(), this)) {
					 idRoom = lg.getIdRoom();
					 username = lg.getUsername();
					 firstEnterRoom();
				} else {
					 ErrorMessage e = new ErrorMessage("failed to login");
					 sendBack(gson.toJson(e));
					 rooms.closeRoom(lg.getIdRoom());
				}
		  }
	 }

	 private boolean saveDoodle(doodlePic dp) {
		  try {
				IData itf = new DataProxy();
				if (rooms.getIdFile(idRoom) > 0) {
					 itf.saveFileDoodle(rooms.getIdFile(idRoom), dp.getData());
				} else {
					 itf.saveRoom(idRoom, dp.getData());
				}
				return true;
		  } catch (SQLException ex) {
				Logger.getLogger(FcMessageInbound.class.getName()).log(Level.SEVERE, null, ex);
		  }
		  return false;
	 }

	 private void enterRoom() throws IOException {
		  try {
				IData itf = new DataProxy();
				Room r = itf.getRoomInfo(idRoom);
				List<FileShortInfo> fsi = r.getFiles();
				List<RoomNoteInfo> rni = r.getNotes();
				for (int i = 0; i < fsi.size(); i++) {
					 CharBuffer buffer = CharBuffer.wrap(gson.toJson(fsi.get(i)));
					 this.getWsOutbound().writeTextMessage(buffer);
				}
				for (int i = 0; i < rni.size(); i++) {
					 CharBuffer buffer = CharBuffer.wrap(gson.toJson(rni.get(i)));
					 this.getWsOutbound().writeTextMessage(buffer);
				}
		  } catch (SQLException ex) {
				Logger.getLogger(RoomManager.class.getName()).log(Level.SEVERE, null, ex);
		  }
	 }

    private boolean firstEnterRoom() throws IOException {
	try {
	    ClearTable ct = new ClearTable();
	    sendBack(gson.toJson(ct));
	    IData itf = new DataProxy();
	    Room result = itf.getRoomInfo(idRoom);
	    if (result.getRoomName() == null || result.getRoomName().isEmpty()) {
		return false;
	    }
	    doodlePic dp = new doodlePic();
	    dp.setData(result.getTableDoodle());
	    CharBuffer buffer = CharBuffer.wrap(gson.toJson(dp));
	    this.getWsOutbound().writeTextMessage(buffer);

				List<FileShortInfo> fsi = result.getFiles();
				List<RoomNoteInfo> rni = result.getNotes();
				for (int i = 0; i < fsi.size(); i++) {
					 CharBuffer buffer1 = CharBuffer.wrap(gson.toJson(fsi.get(i)));
					 this.getWsOutbound().writeTextMessage(buffer1);
				}
				for (int i = 0; i < rni.size(); i++) {
					 CharBuffer buffer1 = CharBuffer.wrap(gson.toJson(rni.get(i)));
					 this.getWsOutbound().writeTextMessage(buffer1);
				}
		  } catch (SQLException ex) {
				Logger.getLogger(FcMessageInbound.class.getName()).log(Level.SEVERE, null, ex);
		  }
		  return false;
	 }

	 private void enterFile() throws IOException {
		  try {
				IData itf = new DataProxy();
				FileDetailInfo r = itf.getDetailFile(rooms.getIdFile(idRoom));
				List<FileNoteInfo> rni = r.getFileNotes();
				for (int i = 0; i < rni.size(); i++) {
					 CharBuffer buffer = CharBuffer.wrap(gson.toJson(rni.get(i)));
					 this.getWsOutbound().writeTextMessage(buffer);
				}
		  } catch (SQLException ex) {
				Logger.getLogger(RoomManager.class.getName()).log(Level.SEVERE, null, ex);
		  }
	 }

    private boolean firstEnterFile() throws IOException {
	try {
	    IData itf = new DataProxy();
	    FileDetailInfo result = itf.getDetailFile(rooms.getIdFile(idRoom));
	    if (result.getFileName().isEmpty()) {
		return false;
	    }
	    doodlePic dp = new doodlePic();
	    dp.setData(result.getDoodleOfFile());
	    sendBack(gson.toJson(dp));
	    roomBroadcast(gson.toJson(dp));

	    List<FileNoteInfo> rni = result.getFileNotes();
	    for (int i = 0; i < rni.size(); i++) {
		sendBack(gson.toJson(rni.get(i)));
		roomBroadcast(gson.toJson(rni.get(i)));
	    }
	} catch (SQLException ex) {
	    Logger.getLogger(FcMessageInbound.class.getName()).log(Level.SEVERE, null, ex);
	}
	return false;
    }

	 private int newFile(String str) throws IOException {
		  int result = -1;
		  try {
				UploadFileInfo upi = gson.fromJson(str, UploadFileInfo.class);
				IData itf = new DataProxy();
				result = itf.newFile(upi.getName(), upi.getContent(), username, upi.getFiletype(), idRoom);
		  } catch (SQLException ex) {
				Logger.getLogger(FcMessageInbound.class.getName()).log(Level.SEVERE, null, ex);
		  }
		  return result;
	 }
	 
	 private List getFileList() throws IOException {
		 List result = new ArrayList();
		  try {
				IData itf = new DataProxy();
				result = itf.getFileList(idRoom);
				getFileList gfl = new getFileList();
				gfl.setFileList(result);
				System.out.println(result);
				roomToUser(username, gson.toJson(gfl));
		  } catch (SQLException ex) {
				Logger.getLogger(FcMessageInbound.class.getName()).log(Level.SEVERE, null, ex);
		  }
		  return result;
	 }

    private List<String> openFile(int idFile,List<String> usernames) throws IOException {
	try {
	    IData itf = new DataProxy();
	    FileDetailInfo fdi = itf.getDetailFile(idFile);
		String fmt = fdi.getFileType();
		String fn = fdi.getFileName() + "." + fmt;
	    String pathname = "D:\\Temp\\" + fn;
	    FileOutputStream fos = new FileOutputStream(pathname);
	    StringReader sr = new StringReader(fdi.getFileData());
	    int data = sr.read();
	    while (data != -1) {
		fos.write(data);
		data = sr.read();
	    }
	    fos.close();
		
		
		List<String> urls = new ArrayList<String>();
		//request
		if(fmt.equals("pdf")){
			for(int i =0;i < usernames.size();i ++){
				HttpClient client = new DefaultHttpClient();
				HttpPost post = new HttpPost("https://viewer.zoho.com/api/view.do");
				FileBody bin = new FileBody(new File(pathname));
				StringBody apikey = new StringBody("e276fa67375967fc635f4e007ed81aaf");
				MultipartEntity reqEntity = new MultipartEntity();
				reqEntity.addPart("file", bin);
				reqEntity.addPart("apikey", apikey);
				//reqEntity.addPart("mode",collabview );
				post.setEntity(reqEntity);
				HttpResponse response = client.execute(post);
				HttpEntity resEntity = response.getEntity();
				StringBuilder result = new StringBuilder();
				InputStream inputStream = resEntity.getContent();
				InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
				BufferedReader reader = new BufferedReader(inputStreamReader);// 读字符串用的。
				String s;
				while (((s = reader.readLine()) != null)) {
				result.append(s);
				}
				reader.close();// 关闭输入流
				Response res = gson.fromJson(result.toString(), Response.class);
				res.getResponse().setType();
				urls.add(res.getResponse().getUrl());
			}
			return urls;
		}
		else if(fmt.equals("doc") || fmt.equals("docx") || fmt.equals("rtf") || fmt.equals("odt") || fmt.equals("sxw") || fmt.equals("html") || fmt.equals("txt")){
			HttpClient client = new DefaultHttpClient();
			HttpPost post = new HttpPost("https://exportwriter.zoho.com/remotedoc.im");
			FileBody bin = new FileBody(new File(pathname));
			StringBody apikey = new StringBody("e276fa67375967fc635f4e007ed81aaf");
			StringBody output = new StringBody("url");
			StringBody filename = new StringBody(fn);
			StringBody format = new StringBody(fmt);
			StringBody mode = new StringBody("collabedit");
			StringBody saveurl = new StringBody("https://example.com/docs/save.php");
			StringBody un = new StringBody(usernames.get(0));
			MultipartEntity reqEntity = new MultipartEntity();
			reqEntity.addPart("content", bin);
			reqEntity.addPart("apikey", apikey);
			reqEntity.addPart("output", output);
			reqEntity.addPart("filename", filename);
			reqEntity.addPart("format", format);
			reqEntity.addPart("mode", mode);
			reqEntity.addPart("saveurl", saveurl);
			reqEntity.addPart("username", un);
			post.setEntity(reqEntity);
			HttpResponse res = client.execute(post);
			HttpEntity resEntity = res.getEntity();
			StringBuilder result = new StringBuilder();
			InputStream inputStream = resEntity.getContent();
			InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
			BufferedReader reader = new BufferedReader(inputStreamReader);// 读字符串用的。
			String s;
			while (((s = reader.readLine()) != null)) {
				result.append(s);
			}
			reader.close();
			String [] str = result.toString().split("=");
			urls.add(str[1] + "=" + str[2] + "=true");
			String documentID = str[6];
			for(int i =1;i < usernames.size();i ++){
				HttpClient client1 = new DefaultHttpClient();
				HttpPost post1 = new HttpPost("https://exportwriter.zoho.com/remotedoc.im");
				StringBody un1 = new StringBody(usernames.get(i));
				StringBody documentid = new StringBody(documentID);
				MultipartEntity reqEntity1 = new MultipartEntity();
				reqEntity.addPart("apikey", apikey);
				reqEntity.addPart("output", output);
				reqEntity.addPart("filename", filename);
				reqEntity.addPart("format", format);
				reqEntity.addPart("mode", mode);
				reqEntity.addPart("documentid",documentid);
				reqEntity.addPart("saveurl", saveurl);
				reqEntity.addPart("username", un1);
				post1.setEntity(reqEntity1);
				HttpResponse response = client1.execute(post1);
				HttpEntity resEntity1 = response.getEntity();
				StringBuilder result1 = new StringBuilder();
				InputStream inputStream1 = resEntity1.getContent();
				InputStreamReader inputStreamReader1 = new InputStreamReader(inputStream1);
				BufferedReader reader1 = new BufferedReader(inputStreamReader1);// 读字符串用的。
				String s1;
				while (((s1 = reader1.readLine()) != null)) {
					result1.append(s1);
				}
				reader.close();
				String [] str1 = result1.toString().split("=");
				urls.add(str1[1] + "=" + str1[2] + "=true");
			}
			return urls;
		}
		else if(fmt.equals("xls") || fmt.equals("xlsx") || fmt.equals("ods") || fmt.equals("sxc") || fmt.equals("csv") || fmt.equals("tsv")){
			HttpClient client = new DefaultHttpClient();
			HttpPost post = new HttpPost("https://sheet.zoho.com/remotedoc.im");
			FileBody bin = new FileBody(new File(pathname));
			StringBody apikey = new StringBody("e276fa67375967fc635f4e007ed81aaf");
			StringBody output = new StringBody("url");
			StringBody filename = new StringBody(fn);
			StringBody format = new StringBody(fmt);
			StringBody mode = new StringBody("collabedit");
			StringBody saveurl = new StringBody("https://example.com/docs/save.php");
			StringBody un = new StringBody(usernames.get(0));
			MultipartEntity reqEntity = new MultipartEntity();
			reqEntity.addPart("content", bin);
			reqEntity.addPart("apikey", apikey);
			reqEntity.addPart("output", output);
			reqEntity.addPart("filename", filename);
			reqEntity.addPart("format", format);
			reqEntity.addPart("mode", mode);
			reqEntity.addPart("saveurl", saveurl);
			reqEntity.addPart("username", un);
			post.setEntity(reqEntity);
			HttpResponse res = client.execute(post);
			HttpEntity resEntity = res.getEntity();
			StringBuilder result = new StringBuilder();
			InputStream inputStream = resEntity.getContent();
			InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
			BufferedReader reader = new BufferedReader(inputStreamReader);// 读字符串用的。
			String s;
			while (((s = reader.readLine()) != null)) {
				result.append(s);
			}
			reader.close();
			String [] str = result.toString().split("=");
			urls.add(str[1] + "=" + str[2] + "=true");
			String documentID = str[6];
			for(int i =1;i < usernames.size();i ++){
				HttpClient client1 = new DefaultHttpClient();
				HttpPost post1 = new HttpPost("https://sheet.zoho.com/remotedoc.im");
				StringBody un1 = new StringBody(usernames.get(i));
				StringBody documentid = new StringBody(documentID);
				MultipartEntity reqEntity1 = new MultipartEntity();
				reqEntity.addPart("apikey", apikey);
				reqEntity.addPart("output", output);
				reqEntity.addPart("filename", filename);
				reqEntity.addPart("format", format);
				reqEntity.addPart("mode", mode);
				reqEntity.addPart("documentid",documentid);
				reqEntity.addPart("saveurl", saveurl);
				reqEntity.addPart("username", un1);
				post1.setEntity(reqEntity1);
				HttpResponse response = client1.execute(post1);
				HttpEntity resEntity1 = response.getEntity();
				StringBuilder result1 = new StringBuilder();
				InputStream inputStream1 = resEntity1.getContent();
				InputStreamReader inputStreamReader1 = new InputStreamReader(inputStream1);
				BufferedReader reader1 = new BufferedReader(inputStreamReader1);// 读字符串用的。
				String s1;
				while (((s1 = reader1.readLine()) != null)) {
					result1.append(s1);
				}
				reader.close();
				String [] str1 = result1.toString().split("=");
				urls.add(str1[1] + "=" + str1[2] + "=true");
			}
			return urls;
		}
		else if(fmt.equals("ppt") || fmt.equals("pps") || fmt.equals("odp") || fmt.equals("sxi")){
			HttpClient client = new DefaultHttpClient();
			HttpPost post = new HttpPost("https://show.zoho.com/remotedoc.im");
			FileBody bin = new FileBody(new File(pathname));
			StringBody apikey = new StringBody("e276fa67375967fc635f4e007ed81aaf");
			StringBody output = new StringBody("url");
			StringBody filename = new StringBody(fn);
			StringBody format = new StringBody(fmt);
			StringBody mode = new StringBody("collabedit");
			StringBody saveurl = new StringBody("https://example.com/docs/save.php");
			StringBody un = new StringBody(usernames.get(0));
			MultipartEntity reqEntity = new MultipartEntity();
			reqEntity.addPart("content", bin);
			reqEntity.addPart("apikey", apikey);
			reqEntity.addPart("output", output);
			reqEntity.addPart("filename", filename);
			reqEntity.addPart("format", format);
			reqEntity.addPart("mode", mode);
			reqEntity.addPart("saveurl", saveurl);
			reqEntity.addPart("username", un);
			post.setEntity(reqEntity);
			HttpResponse res = client.execute(post);
			HttpEntity resEntity = res.getEntity();
			StringBuilder result = new StringBuilder();
			InputStream inputStream = resEntity.getContent();
			InputStreamReader inputStreamReader = new InputStreamReader(inputStream);
			BufferedReader reader = new BufferedReader(inputStreamReader);// 读字符串用的。
			String s;
			while (((s = reader.readLine()) != null)) {
				result.append(s);
			}
			reader.close();
			String [] str = result.toString().split("=");
			urls.add(str[1] + "=" + str[2] + "=true");
			String documentID = str[6];
			for(int i =1;i < usernames.size();i ++){
				HttpClient client1 = new DefaultHttpClient();
				HttpPost post1 = new HttpPost("https://show.zoho.com/remotedoc.im");
				StringBody un1 = new StringBody(usernames.get(i));
				StringBody documentid = new StringBody(documentID);
				MultipartEntity reqEntity1 = new MultipartEntity();
				reqEntity.addPart("apikey", apikey);
				reqEntity.addPart("output", output);
				reqEntity.addPart("filename", filename);
				reqEntity.addPart("format", format);
				reqEntity.addPart("mode", mode);
				reqEntity.addPart("documentid",documentid);
				reqEntity.addPart("saveurl", saveurl);
				reqEntity.addPart("username", un1);
				post1.setEntity(reqEntity1);
				HttpResponse response = client1.execute(post1);
				HttpEntity resEntity1 = response.getEntity();
				StringBuilder result1 = new StringBuilder();
				InputStream inputStream1 = resEntity1.getContent();
				InputStreamReader inputStreamReader1 = new InputStreamReader(inputStream1);
				BufferedReader reader1 = new BufferedReader(inputStreamReader1);// 读字符串用的。
				String s1;
				while (((s1 = reader1.readLine()) != null)) {
					result1.append(s1);
				}
				reader.close();
				String [] str1 = result1.toString().split("=");
				urls.add(str1[1] + "=" + str1[2] + "=true");
			}
			return urls;
		}
		else
			return null;
	    /*String roomFileStr = gson.toJson(res.getResponse());
	    sendBack(roomFileStr);
	    roomBroadcast(roomFileStr);
	    ClearTable ct = new ClearTable();
	    sendBack(gson.toJson(ct));
	    roomBroadcast(gson.toJson(ct));
	    rooms.setEnterFile(idRoom, idFile, roomFileStr);
	    firstEnterFile();*/
	} catch (SQLException ex) {
	    Logger.getLogger(FcMessageInbound.class.getName()).log(Level.SEVERE, null, ex);
	} catch (FileNotFoundException ex) {
	    Logger.getLogger(FcMessageInbound.class.getName()).log(Level.SEVERE, null, ex);
	}
	return null;
	}
		
	/*private void downloadFile(int idFile) throws IOException, SQLException {
		IData itf = new DataProxy();
		FileDetailInfo fdi = itf.getDetailFile(idFile);
		String pathname = "D:\\Temp\\" + fdi.getFileName() + "." + fdi.getFileType();
		FileOutputStream fos = new FileOutputStream(pathname);
		StringReader sr = new StringReader(fdi.getFileData());
		int data = sr.read();
		while (data != -1) {
			fos.write(data);
			data = sr.read();
		}
		fos.close();
		File file=new File(pathname);
		String filename = fdi.getFileName();
		HttpServletResponse response = new HttpServletResponse();
		response.setContentType("application/x-msdownload");
		response.setContentLength((int)file.length());
		// response.setHeader("Content-Disposition","attachment;filename="+filename);
		response.setHeader("Content-Disposition","attachment;filename="+new String(filename.getBytes("gbk"),"iso-8859-1"));
		BufferedInputStream buff=new BufferedInputStream(new FileInputStream(file));
		byte [] b=new byte[1024];
		long k=0;
		OutputStream myout=response.getOutputStream();
		while(k<file.length()){
			int j=buff.read(b,0,1024);
			k+=j;
			myout.write(b,0,j);
		}
		myout.flush();
	}*/

	 private void closeFile(int idFile) {
	 }

	 private void oneByOne(List<Object> messages) throws IOException {
		  rooms.oneByOne(messages, idRoom);
	 }
}


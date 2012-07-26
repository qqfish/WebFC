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
	    } else if (idRoom > 0 && !username.isEmpty()) {
		if (textData.getType().equals("doodlePic")) {
		    doodlePic dp = gson.fromJson(str, doodlePic.class);
		    if (dp.getUsage().equals("updatePic")) {
			roomToUser(dp.getTo(), str);
		    } else if (dp.getUsage().equals("saveDoodle")) {
			if (saveDoodle(dp)) {
			    AlertMessage e = new AlertMessage("save complete");
			    sendBack(gson.toJson(e));
			} else {
			    ErrorMessage e = new ErrorMessage("failed to save");
			    sendBack(gson.toJson(e));
			}
		    }
		} else if (textData.getType().equals("uploadFile")) {
		    int r = newFile(str);
		    openFile(r);
		} else if (textData.getType().equals("dragMessage")) {
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
		    openFile(rof.getIdFile());
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
	    //String clearTable = "{'type':'clearTable'}";
	    //sendBack(clearTable);
	    IData itf = new DataProxy();
	    Room result = itf.getRoomInfo(idRoom);
	    if (result.getRoomName().isEmpty()) {
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
	    CharBuffer buffer = CharBuffer.wrap(gson.toJson(dp));
	    this.getWsOutbound().writeTextMessage(buffer);

	    List<FileNoteInfo> rni = result.getFileNotes();
	    for (int i = 0; i < rni.size(); i++) {
		CharBuffer buffer1 = CharBuffer.wrap(gson.toJson(rni.get(i)));
		this.getWsOutbound().writeTextMessage(buffer1);
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

    private void openFile(int idFile) throws IOException {
	try {
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
	    HttpClient client = new DefaultHttpClient();
	    HttpPost post = new HttpPost("https://viewer.zoho.com/api/view.do");
	    FileBody bin = new FileBody(new File(pathname));
	    StringBody apikey = new StringBody("e276fa67375967fc635f4e007ed81aaf");
	    MultipartEntity reqEntity = new MultipartEntity();
	    reqEntity.addPart("file", bin);
	    reqEntity.addPart("apikey", apikey);
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
	    //System.out.println(result);
	    Response res = gson.fromJson(result.toString(), Response.class);
	    res.getResponse().setType();
	    //System.out.println(gson.toJson(res.getResponse()));
	    String roomFileStr = gson.toJson(res.getResponse());
	    sendBack(roomFileStr);
	    roomBroadcast(roomFileStr);
	    rooms.setEnterFile(idRoom, idFile, roomFileStr);
	    firstEnterFile();
	} catch (SQLException ex) {
	    Logger.getLogger(FcMessageInbound.class.getName()).log(Level.SEVERE, null, ex);
	} catch (FileNotFoundException ex) {
	    Logger.getLogger(FcMessageInbound.class.getName()).log(Level.SEVERE, null, ex);
	}

    }

    private void closeFile(int idFile) {
    }

    private void oneByOne(List<Object> messages) throws IOException {
	rooms.oneByOne(messages, idRoom);
    }
}

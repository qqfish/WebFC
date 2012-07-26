/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import com.webFc.data.Data;
import com.webFc.data.LoginRoom;
import com.webFc.data.Response;
import com.webFc.data.UploadFileInfo;
import com.webFc.socket.MessageType.AlertMessage;
import com.webFc.socket.MessageType.ErrorMessage;
import com.webFc.socket.MessageType.SaveTableDoodle;
import com.webFc.socket.MessageType.doodlePic;
import java.io.*;
import java.lang.reflect.Type;
import java.net.*;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
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

    public FcMessageInbound() {
	username = "";
	idRoom = -1;
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
	//System.out.println(str);
	if (str != null && !str.isEmpty()) {
	    Gson gson = new Gson();
	    Data textData = gson.fromJson(str, Data.class);
	    //System.out.println(textData.getType());
	    //System.out.println(idRoom + " " + username);
	    if (textData.getType().equals("LoginRoom")) {
		LoginRoom lg = gson.fromJson(str, LoginRoom.class);
		if (rooms.loginRoom(lg.getIdRoom(), lg.getUsername(), this)) {
		    idRoom = lg.getIdRoom();
		    username = lg.getUsername();
		} else {
		    if (rooms.firstLoginRoom(lg.getIdRoom(), lg.getUsername(), this)) {
			idRoom = lg.getIdRoom();
			username = lg.getUsername();
		    } else {
			ErrorMessage e = new ErrorMessage("failed to login");
			CharBuffer buffer = CharBuffer.wrap(gson.toJson(e));
			this.getWsOutbound().writeTextMessage(buffer);
		    }
		}
	    } else if (idRoom > 0 && !username.isEmpty()) {
		if (textData.getType().equals("doodlePic")) {
		    doodlePic dp = gson.fromJson(str, doodlePic.class);
		    roomToUser(dp.getTo(), str);
		} else if (textData.getType().equals("SaveTableDoodle")) {
		    SaveTableDoodle std = gson.fromJson(str, SaveTableDoodle.class);
		    if (rooms.saveRoomDoodle(idRoom, std.getDoodleOfTable())) {
			AlertMessage e = new AlertMessage("save complete");
			CharBuffer buffer = CharBuffer.wrap(gson.toJson(e));
			this.getWsOutbound().writeTextMessage(buffer);
		    } else {
			ErrorMessage e = new ErrorMessage("failed to save");
			CharBuffer buffer = CharBuffer.wrap(gson.toJson(e));
			this.getWsOutbound().writeTextMessage(buffer);
		    }
		} else if(textData.getType().equals("uploadFile")){
                    UploadFileInfo upi = gson.fromJson(str, UploadFileInfo.class);
                    
                    String pathname = "D:\\Temp\\" + upi.getName() + "." + upi.getFiletype();
                    FileOutputStream fos = new FileOutputStream(pathname);
                    StringReader sr = new StringReader(upi.getContent());
                    int data = sr.read();
                    while(data!=-1){
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
                    System.out.println(result);
                    Response res = gson.fromJson(result.toString(),Response.class);
                    res.getResponse().setType();
                    System.out.println(gson.toJson(res.getResponse()));
                    roomBroadcast(gson.toJson(res.getResponse()));
                } else {
		    //System.out.println("hello");
		    roomBroadcast(str);
		}
	    }
	}
    }

    private void roomBroadcast(String message) throws IOException {
	if (idRoom > 0) {
	    rooms.broadcast(idRoom, message);
	}
    }

    private void roomToUser(String username, String message) throws IOException {
	if (idRoom > 0) {
	    rooms.sendUserMessage(idRoom, username, message);
	}
    }
}
/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket;

import com.google.gson.Gson;
import com.webFc.data.Data;
import com.webFc.data.LoginRoom;
import com.webFc.data.UploadFileInfo;
import com.webFc.database.DataProxy;
import com.webFc.global.IData;
import com.webFc.socket.MessageType.AlertMessage;
import com.webFc.socket.MessageType.ErrorMessage;
import com.webFc.socket.MessageType.SaveTableDoodle;
import com.webFc.socket.MessageType.doodlePic;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.sql.SQLException;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.WsOutbound;

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
	System.out.println(str);
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
		} else if (textData.getType().equals("uploadFile")) {
		    System.out.println("a");
		    UploadFileInfo upi = gson.fromJson(str, UploadFileInfo.class);
		    IData itf;
		    try {
			itf = new DataProxy();
			itf.newFile(upi.getName(), upi.getContent(), username, upi.getFiletype(),idRoom);
		    } catch (SQLException ex) {
			Logger.getLogger(FcMessageInbound.class.getName()).log(Level.SEVERE, null, ex);
		    }
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
}
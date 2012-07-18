/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket;

import com.google.gson.Gson;
import com.webFc.data.Data;
import com.webFc.data.LoginRoom;
import com.webFc.socket.MessageType.ErrorMessage;
import com.webFc.socket.MessageType.doodlePic;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
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
    int idUser;
    int idRoom;

    public FcMessageInbound() {
	idUser = -1;
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
	    rooms.logoutRoom(idRoom, idUser);
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
	    System.out.println(textData.getType());
	    System.out.println(idRoom + " " + idUser);
	    if (textData.getType().equals("LoginRoom")) {
		LoginRoom lg = gson.fromJson(str, LoginRoom.class);
		if (rooms.loginRoom(lg.getIdRoom(), lg.getIdUser(), this)) {
		    idRoom = lg.getIdRoom();
		    idUser = lg.getIdUser();
		} else {
		    ErrorMessage err = new ErrorMessage("enter room error");
		    CharBuffer buffer = CharBuffer.wrap(gson.toJson(err));
		    this.getWsOutbound().writeTextMessage(buffer);
		}
	    } else if (idRoom > 0 && idUser > 0) {
		if (textData.getType().equals("doodlePic")) {
		    doodlePic dp = gson.fromJson(str, doodlePic.class);
		    rooms.sendUserMessage(idRoom, dp.getTo(), str);
		} else {
		    System.out.println("hello");
		    rooms.broadcast(idRoom, str);
		}
	    }
	}
    }
}
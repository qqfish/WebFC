/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket;

import com.google.gson.Gson;
import com.webFc.data.Data;
import com.webFc.data.LoginRoom;
import java.io.IOException;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
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
	System.out.println(this.toString() + "closed");
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
	    if (textData.getType().equals("LoginRoom")) {
		LoginRoom lg = gson.fromJson(str, LoginRoom.class);
		boolean result = rooms.loginRoom(lg.getIdRoom(), lg.getIdUser(), this);
		System.out.println("login " + result);
		if(result){
		    idRoom = lg.getIdRoom();
		    idUser = lg.getIdUser();
		}
	    } else if (idRoom > 0 && idUser > 0) {
		rooms.broadcast(idRoom, str);
	    }
	}
    }
}
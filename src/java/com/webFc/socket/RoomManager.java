/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket;

import com.google.gson.Gson;
import com.webFc.data.FileShortInfo;
import com.webFc.data.Room;
import com.webFc.data.RoomNoteInfo;
import com.webFc.database.DataProxy;
import com.webFc.global.IData;
import com.webFc.socket.MessageType.doodlePic;
import com.webFc.socket.MessageType.requestPic;
import java.io.IOException;
import java.nio.CharBuffer;
import java.sql.SQLException;
import java.util.*;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author fish
 */
public class RoomManager {

    Map<Integer, UserMap> maps = new TreeMap();
    Gson gson;

    private class UserMap {

	Map<String, FcMessageInbound> users = new TreeMap();
	int idFile;
	String roomFileStr;

	private UserMap() {
	    idFile = -1;
	}

	private boolean insertUser(String username, FcMessageInbound fmi) throws IOException {
	    if (!username.isEmpty() && !users.containsKey(username)) {
		users.put(username, fmi);
		if (idFile > 0 && !roomFileStr.isEmpty()) {
		    CharBuffer buffer = CharBuffer.wrap(roomFileStr);
		    fmi.getWsOutbound().writeTextMessage(buffer);
		}
		return true;
	    } else {
		return false;
	    }
	}

	private boolean quitUser(String username) {
	    if (users.containsKey(username)) {
		users.remove(username);
		return true;
	    } else {
		return false;
	    }
	}

	private boolean sendUserMassage(String username, String message) throws IOException {
	    if (users.containsKey(username)) {
		FcMessageInbound fmi = users.get(username);
		CharBuffer buffer = CharBuffer.wrap(message);
		fmi.getWsOutbound().writeTextMessage(buffer);
		return true;
	    } else {
		return false;
	    }
	}

	private void broadcast(String message, FcMessageInbound current) throws IOException {
	    List<String> rmArray = new ArrayList<String>();

	    Iterator<Map.Entry<String, FcMessageInbound>> iter = users.entrySet().iterator();
	    while (iter.hasNext()) {
		Map.Entry<String, FcMessageInbound> entry = iter.next();
		FcMessageInbound val = entry.getValue();
		if (!val.equals(current)) {
		    CharBuffer buffer = CharBuffer.wrap(message);
		    val.getWsOutbound().writeTextMessage(buffer);
		}
	    }
	}

	private boolean isEmpty() {
	    return users.isEmpty();
	}

	private int getNum() {
	    return users.size();
	}

	private int getIdFile() {
	    return idFile;
	}

	private String getRoomFileStr() {
	    return roomFileStr;
	}

	private void setEnterFile(int idFile, String roomFileStr) {
	    this.idFile = idFile;
	    this.roomFileStr = roomFileStr;
	}
    }

    public RoomManager() {
	gson = new Gson();
    }

    public boolean loginRoom(int idRoom, String username, FcMessageInbound fmi) throws IOException {
	//System.out.println(maps.containsKey(idRoom));
	if (maps.containsKey(idRoom)) {
	    UserMap m = maps.get(idRoom);
	    System.out.println("user " + username + " enter Room " + idRoom + ";");
	    requestPic rp = new requestPic();
	    rp.setFrom(username);
	    rp.setUsage("updatePic");
	    randomSend(idRoom, gson.toJson(rp));
	    return m.insertUser(username, fmi);
	} else {
	    return false;
	}
    }

    public boolean firstLoginRoom(int idRoom, String username, FcMessageInbound fmi) throws IOException {
	//System.out.println(maps.containsKey(idRoom));
	if (!maps.containsKey(idRoom)) {
	    maps.put(idRoom, new UserMap());
	    System.out.println("Room " + idRoom + " opened;");
	    System.out.println("user " + username + " enter Room " + idRoom + ";");
	    //System.out.println(maps.containsKey(idRoom));
	    UserMap m = maps.get(idRoom);
	    return m.insertUser(username, fmi);
	}
	return false;
    }

    public int createRoom(String roomname, String username) {
	try {
	    IData itf = new DataProxy();
	    return itf.newRoom(roomname, username);
	} catch (SQLException ex) {
	    Logger.getLogger(RoomManager.class.getName()).log(Level.SEVERE, null, ex);
	}
	return -1;
    }

    public boolean closeRoom(int idRoom) throws IOException {
	if (maps.containsKey(idRoom)) {
	    maps.remove(idRoom);
	    System.out.println("Room " + idRoom + " closed;");
	    return true;
	} else {
	    return false;
	}
    }

    public boolean logoutRoom(int idRoom, String username) throws IOException {
	if (maps.containsKey(idRoom)) {
	    UserMap m = maps.get(idRoom);
	    boolean result = m.quitUser(username);
	    System.out.println("user " + username + " leave Room " + idRoom + ";");
	    if (result) {
		if (m.isEmpty()) {
		    return closeRoom(idRoom);
		} else {
		    return true;
		}
	    } else {
		return false;
	    }
	} else {
	    return false;
	}
    }

    public boolean sendUserMessage(int idRoom, String username, String message) throws IOException {
	if (maps.containsKey(idRoom)) {
	    UserMap m = maps.get(idRoom);
	    return m.sendUserMassage(username, message);
	} else {
	    return false;
	}
    }

    public boolean broadcast(int idRoom, String message, FcMessageInbound current) throws IOException {
	if (maps.containsKey(idRoom)) {
	    UserMap m = maps.get(idRoom);
	    m.broadcast(message, current);
	    return true;
	} else {
	    return false;
	}
    }

    public int getNum(int idRoom) {
	if (maps.containsKey(idRoom)) {
	    UserMap m = maps.get(idRoom);
	    return m.getNum();
	} else {
	    return 0;
	}
    }

    public boolean randomSend(int idRoom, String message) throws IOException {
	if (maps.containsKey(idRoom)) {
	    UserMap m = maps.get(idRoom);
	    List<String> rmArray = new ArrayList<String>();

	    Iterator<Map.Entry<String, FcMessageInbound>> iter = m.users.entrySet().iterator();
	    if (iter.hasNext()) {
		Map.Entry<String, FcMessageInbound> entry = iter.next();
		FcMessageInbound val = entry.getValue();
		CharBuffer buffer = CharBuffer.wrap(message);
		val.getWsOutbound().writeTextMessage(buffer);
		System.out.println("hello");
		return true;
	    }
	}
	return false;
    }

    public void oneByOne(List<Object> messages, int idRoom) throws IOException {
	if (maps.containsKey(idRoom)) {
	    UserMap m = maps.get(idRoom);
	    List<String> rmArray = new ArrayList<String>();

	    Iterator<Map.Entry<String, FcMessageInbound>> iter = m.users.entrySet().iterator();
	    int i = 0;
	    while (iter.hasNext() && i < messages.size()) {
		Map.Entry<String, FcMessageInbound> entry = iter.next();
		FcMessageInbound val = entry.getValue();
		CharBuffer buffer = CharBuffer.wrap(gson.toJson(messages.get(i)));
		val.getWsOutbound().writeTextMessage(buffer);
		System.out.println("hello");
		i++;
	    }
	}
    }

    public int getIdFile(int idRoom) {
	if (maps.containsKey(idRoom)) {
	    UserMap m = maps.get(idRoom);
	    return m.getIdFile();
	}
	return -1;
    }

    public String getRoomFileStr(int idRoom) {
	if (maps.containsKey(idRoom)) {
	    UserMap m = maps.get(idRoom);
	    return m.getRoomFileStr();
	}
	return "";
    }

    public void setEnterFile(int idRoom, int idFile, String roomFileStr) {
	if (maps.containsKey(idRoom)) {
	    UserMap m = maps.get(idRoom);
	    m.setEnterFile(idFile, roomFileStr);
	}
    }
}

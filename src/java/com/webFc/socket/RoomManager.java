/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.*;

/**
 *
 * @author fish
 */
public class RoomManager {

    Map<Integer, UserMap> maps = new TreeMap();

    private class UserMap {

	Map<Integer, FcMessageInbound> users = new TreeMap();

	private UserMap() {
	    super();
	}

	private boolean insertUser(int idUser, FcMessageInbound fmi) {
	    if (!users.containsKey(idUser)) {
		users.put(idUser, fmi);
		return true;
	    } else {
		return false;
	    }
	}

	private boolean quitUser(int idUser) {
	    if (users.containsKey(idUser)) {
		users.remove(idUser);
		return true;
	    } else {
		return false;
	    }
	}

	private boolean sendUserMassage(int idUser, String message) throws IOException {
	    if (users.containsKey(idUser)) {
		FcMessageInbound fmi = users.get(idUser);
		CharBuffer buffer = CharBuffer.wrap(message);
		fmi.getWsOutbound().writeTextMessage(buffer);
		return true;
	    } else {
		return false;
	    }
	}

	private void broadcast(String message) throws IOException {
	    List<String> rmArray = new ArrayList<String>();

	    Iterator<Map.Entry<Integer, FcMessageInbound>> iter = users.entrySet().iterator();
	    while (iter.hasNext()) {
		Map.Entry<Integer, FcMessageInbound> entry = iter.next();
		FcMessageInbound val = entry.getValue();
		CharBuffer buffer = CharBuffer.wrap(message);
		val.getWsOutbound().writeTextMessage(buffer);
	    }
	}

	private boolean isEmpty() {
	    return users.isEmpty();
	}
    }

    public RoomManager() {
	super();
    }

    public boolean loginRoom(int idRoom, int idUser, FcMessageInbound fmi) {
	//System.out.println(maps.containsKey(idRoom));
	if (maps.containsKey(idRoom)) {
	    //System.out.println("hello");
	    UserMap m = maps.get(idRoom);
	    return m.insertUser(idUser, fmi);
	} else {
	    return newRoom(idRoom, idUser, fmi);
	}
    }

    public boolean newRoom(int idRoom, int idUser, FcMessageInbound fmi) {
	//System.out.println(maps.containsKey(idRoom));
	if (!maps.containsKey(idRoom)) {
	    maps.put(idRoom, new UserMap());
	    //System.out.println(maps.containsKey(idRoom));
	    UserMap m = maps.get(idRoom);
	    return m.insertUser(idUser, fmi);
	} else {
	    return false;
	}
    }

    public boolean closeRoom(int idRoom) throws IOException {
	if (maps.containsKey(idRoom)) {
	    String message = "{'type' : 'closeRoom'}";
	    UserMap m = maps.get(idRoom);
	    m.broadcast(message);
	    maps.remove(idRoom);
	    return true;
	} else {
	    return false;
	}
    }

    public boolean logoutRoom(int idRoom, int idUser) throws IOException {
	if (maps.containsKey(idRoom)) {
	    UserMap m = maps.get(idRoom);
	    boolean result = m.quitUser(idUser);
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

    public boolean sendUserMessage(int idRoom, int idUser, String message) throws IOException {
	if (maps.containsKey(idRoom)) {
	    UserMap m = maps.get(idRoom);
	    return m.sendUserMassage(idUser, message);
	} else {
	    return false;
	}
    }

    public boolean broadcast(int idRoom, String message) throws IOException {
	if (maps.containsKey(idRoom)) {
	    UserMap m = maps.get(idRoom);
	    m.broadcast(message);
	    return true;
	} else {
	    return false;
	}
    }
}

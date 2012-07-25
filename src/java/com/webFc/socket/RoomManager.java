/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket;

import com.google.gson.Gson;
import com.webFc.data.Room;
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

	 private class UserMap {

		  Map<String, FcMessageInbound> users = new TreeMap();

		  private UserMap() {
				super();
		  }

		  private boolean insertUser(String username, FcMessageInbound fmi) throws IOException {
				if (!username.isEmpty() && !users.containsKey(username)) {
					 users.put(username, fmi);
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

		  private void broadcast(String message) throws IOException {
				List<String> rmArray = new ArrayList<String>();

				Iterator<Map.Entry<String, FcMessageInbound>> iter = users.entrySet().iterator();
				while (iter.hasNext()) {
					 Map.Entry<String, FcMessageInbound> entry = iter.next();
					 FcMessageInbound val = entry.getValue();
					 CharBuffer buffer = CharBuffer.wrap(message);
					 val.getWsOutbound().writeTextMessage(buffer);
				}
		  }

		  private boolean isEmpty() {
				return users.isEmpty();
		  }

		  private int getNum() {
				return users.size();
		  }
	 }

	 public RoomManager() {
		  super();
	 }

	 public boolean loginRoom(int idRoom, String username, FcMessageInbound fmi) throws IOException {
		  //System.out.println(maps.containsKey(idRoom));
		  if (maps.containsKey(idRoom)) {
				UserMap m = maps.get(idRoom);
				//System.out.println("hello");
				List<String> rmArray = new ArrayList<String>();

				Iterator<Map.Entry<String, FcMessageInbound>> iter = m.users.entrySet().iterator();
				if (iter.hasNext()) {
					 Gson gson = new Gson();
					 Map.Entry<String, FcMessageInbound> entry = iter.next();
					 FcMessageInbound val = entry.getValue();
					 requestPic rp = new requestPic();
					 rp.setFrom(username);
					 CharBuffer buffer = CharBuffer.wrap(gson.toJson(rp));
					 val.getWsOutbound().writeTextMessage(buffer);
				}
				return m.insertUser(username, fmi);
		  } else {
				return false;
		  }
	 }

	 public boolean firstLoginRoom(int idRoom, String username, FcMessageInbound fmi) throws IOException {
		  //System.out.println(maps.containsKey(idRoom));
		  if (!maps.containsKey(idRoom)) {
				try {
					 IData itf = new DataProxy();
					 Room result = itf.getRoomInfo(idRoom);
					 if (result.getRoomName().isEmpty()) {
						  return false;
					 }
					 doodlePic dp = new doodlePic();
					 dp.setData(result.getTableDoodle());
					 Gson gson = new Gson();
					 CharBuffer buffer = CharBuffer.wrap(gson.toJson(dp));
					 fmi.getWsOutbound().writeTextMessage(buffer);
					 maps.put(idRoom, new UserMap());
					 //System.out.println(maps.containsKey(idRoom));
					 UserMap m = maps.get(idRoom);
					 return m.insertUser(username, fmi);
				} catch (SQLException ex) {
					 Logger.getLogger(RoomManager.class.getName()).log(Level.SEVERE, null, ex);
				}
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

	 public boolean saveRoomDoodle(int idRoom, String doodleOfTable) {
		  try {
				IData itf = new DataProxy();
				itf.saveRoom(idRoom, doodleOfTable);
				return true;
		  } catch (SQLException ex) {
				Logger.getLogger(RoomManager.class.getName()).log(Level.SEVERE, null, ex);
		  }
		  return false;
	 }

	 private boolean closeRoom(int idRoom) throws IOException {
		  if (maps.containsKey(idRoom)) {
				maps.remove(idRoom);
				return true;
		  } else {
				return false;
		  }
	 }

	 public boolean logoutRoom(int idRoom, String username) throws IOException {
		  if (maps.containsKey(idRoom)) {
				UserMap m = maps.get(idRoom);
				boolean result = m.quitUser(username);
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

	 public boolean broadcast(int idRoom, String message) throws IOException {
		  if (maps.containsKey(idRoom)) {
				UserMap m = maps.get(idRoom);
				m.broadcast(message);
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
}

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.database;

import com.webFc.data.FileDetailInfo;
import com.webFc.data.FileNoteInfo;
import com.webFc.data.Room;
import com.webFc.data.RoomNoteInfo;
import com.webFc.global.IData;
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.sql.rowset.serial.SerialBlob;

/**
 *
 * @author fish
 */
public class DataProxy implements IData {

    private Connection con;

    public DataProxy() throws SQLException {
	DriverManager.registerDriver(new com.mysql.jdbc.Driver());
	String url = "jdbc:mysql://";
	ReadSQLXml r = new ReadSQLXml();
	r.getInfo();
	url += r.getHost();
	url += "?unicode=true&characterEncoding=UTF-8&user=" + r.getUsername() + "&password=" + r.getPassword();
	System.out.println(url);
	con = DriverManager.getConnection(url);
    }

    @Override
    public boolean hasUser(String email) {
	try {
	    String sql = "SELECT * FROM User WHERE email=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setString(1, email);
	    ResultSet rs = ps.executeQuery();
	    if (rs.next()) {
		ps.close();
		return true;
	    } else {
		ps.close();
		return false;
	    }
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	    return false;
	}
    }

    @Override
    public boolean checkPassword(String email, String password) {
	try {
	    String sql = "SELECT * FROM User WHERE email=? and password=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setString(1, email);
	    ps.setString(2, password);
	    ResultSet rs = ps.executeQuery();
	    if (rs.next()) {
		ps.close();
		return true;
	    }
	    ps.close();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
	return false;
    }

    @Override
    public Room getRoomInfo(int idRoom) {
	Room result = new Room();
	try {
	    String sql = "SELECT * FROM Room WHERE idRoom=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setInt(1, idRoom);
	    ResultSet rs = ps.executeQuery();
	    if (rs.next()) {
		result.setRoomName(rs.getString("roomName"));
		result.setIdRoom(rs.getInt("idRoom"));
		result.setOwner(rs.getString("roomOwner"));
		result.setTableDoodle(rs.getString("doodleOfTable"));
		result.setLastTime(rs.getDate("lastTime"));
		String sql2 = "SELECT * FROM RoomNote WHERE idRoom=?";
		PreparedStatement ps2 = con.prepareStatement(sql2);
		ps2.setInt(1, idRoom);
		ResultSet rs2 = ps2.executeQuery();
		String sql3 = "SELECT * FROM File WHERE idRoom=?";
		PreparedStatement ps3 = con.prepareStatement(sql3);
		ps3.setInt(1, idRoom);
		ResultSet rs3 = ps3.executeQuery();
		while (rs2.next()) {
		    String noteContext = rs2.getString("noteContext");
		    int x = rs2.getInt("x");
		    int y = rs2.getInt("y");
		    int idNote = rs2.getInt("idNote");
		    result.addNote(idNote, noteContext, x, y);
		}
		while (rs3.next()) {
		    String fileName = rs3.getString("fileName");
		    boolean onTable = rs3.getBoolean("onTable");
		    String username = rs3.getString("fileOwner");
		    int xFile = rs3.getInt("xFile");
		    int yFile = rs3.getInt("yFile");
		    String fileType = rs3.getString("fileType");
		    int rotate = rs3.getInt("rotate");
		    String preview = rs3.getString("preview");
		    Date editTime = rs3.getDate("editTime");
		    result.addFile(fileName, onTable, username, xFile, yFile, fileType, rotate, preview, editTime);
		}
		ps2.close();
		ps3.close();
	    }
	    ps.close();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
	return result;
    }

    @Override
    public RoomNoteInfo getRoomNote(int idRoomNote) {
	RoomNoteInfo result = new RoomNoteInfo();
	try {
	    String sql = "SELECT * FROM RoomNote WHERE idRoomNote=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setInt(1, idRoomNote);
	    ResultSet rs = ps.executeQuery();
	    if (rs.next()) {
		result.setIdRoomNote(rs.getInt("idRoomNote"));
		result.setNoteContext(rs.getString("noteContext"));
		result.setX(rs.getInt("x"));
		result.setY(rs.getInt("y"));
	    }
	    rs.close();
	    ps.close();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
	return result;
    }

    @Override
    public FileNoteInfo getFileNote(int idFileNote) {
	FileNoteInfo result = new FileNoteInfo();
	try {
	    String sql = "SELECT * FROM FileNote WHERE idRoomNote=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setInt(1, idFileNote);
	    ResultSet rs = ps.executeQuery();
	    if (rs.next()) {
		result.setIdFileNote(rs.getInt("idRoomNote"));
		result.setNoteContext(rs.getString("noteContext"));
		result.setX(rs.getInt("x"));
		result.setY(rs.getInt("y"));
	    }
	    rs.close();
	    ps.close();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
	return result;
    }

    @Override
    public FileDetailInfo getDetailFile(int idFile) {
	FileDetailInfo result = new FileDetailInfo();
	try {
	    String sql = "SELECT * FROM File WHERE idFile=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setInt(1, idFile);
	    ResultSet rs = ps.executeQuery();
	    if (rs.next()) {
		result.setFileName(rs.getString("fileName"));
		result.setDoodleOfFile(rs.getString("doodleOfFile"));
		result.setFileData(rs.getString("fileData"));
		result.setFileType(rs.getString("fileType"));
		result.setIdFile(rs.getInt("idFile"));
		result.setOwner(rs.getString("fileOwner"));
		result.setEditTime(rs.getDate("editTime"));
		String sql2 = "SELECT * FROM FileNote WHERE idFile=?";
		PreparedStatement ps2 = con.prepareStatement(sql2);
		ps2.setInt(1, idFile);
		ResultSet rs2 = ps2.executeQuery();
		while (rs2.next()) {
		    int idFileNote = rs2.getInt("idFileNote");
		    String noteContext = rs2.getString("noteContext");
		    int x = rs2.getInt("x");
		    int y = rs2.getInt("y");
		    result.addNote(idFileNote, noteContext, x, y);
		}
		rs2.close();
		ps2.close();
	    }
	    rs.close();
	    ps.close();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
	return result;
    }

    @Override
    public void createUser(String email, String password) {
	try {
	    String sql = "INSERT INTO User (email, password) VALUES (?,?)";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setString(1, email);
	    ps.setString(2, password);
	    ps.executeUpdate();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
    }

    @Override
    public int newRoom(String roomname, String user) {
	int result = -1;
	try {
	    String sql = "INSERT INTO Room (roomName, roomOwner, lastTime) VALUES (?,?,?)";
	    PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
	    ps.setString(1, roomname);
	    ps.setString(2, user);
	    java.util.Date date = new java.util.Date();
	    Timestamp st = new Timestamp(date.getTime());
	    ps.setTimestamp(3, st);
	    ps.executeUpdate();
	    ResultSet rs = ps.getGeneratedKeys();
	    if (rs.next()) {
		result = rs.getInt(1);
	    }
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
	return result;
    }

    @Override
    public void saveRoom(int idRoom, String doodleOfTable) {
	try {
	    String sql = "UPDATE Room SET doodleOfTable=?, lastTime=? WHERE idRoom=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    Blob b = new SerialBlob(doodleOfTable.getBytes());
	    ps.setBlob(1, b);
	    java.util.Date date = new java.util.Date();
	    Timestamp st = new Timestamp(date.getTime());
	    ps.setTimestamp(2, st);
	    ps.setInt(3, idRoom);
	    ps.executeUpdate();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
    }

    @Override
    public int newRoomNote(String context, int x, int y, int idRoom) {
	int result = -1;
	try {
	    String sql = "INSERT INTO RoomNote (noteContext, x, y, idRoom) VALUES (?,?,?,?)";
	    PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
	    ps.setString(1, context);
	    ps.setInt(2, x);
	    ps.setInt(3, y);
	    ps.setInt(4, idRoom);
	    ps.executeUpdate();
	    ResultSet rs = ps.getGeneratedKeys();
	    if (rs.next()) {
		result = rs.getInt(1);
	    }
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
	return result;
    }

    @Override
    public void updateRoomNote(int idRoomNote, String context, int x, int y) {
	try {
	    String sql = "UPDATE RoomNote SET noteContext=?, x=?, y=? WHERE idRoomNote=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setString(1, context);
	    ps.setInt(2, x);
	    ps.setInt(3, y);
	    ps.setInt(3, idRoomNote);
	    ps.executeUpdate();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
    }

    @Override
    public void rmRoomNote(int idRoomNote) {
	try {
	    String sql = "DELETE FROM RoomNote WHERE idRoomNote=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setInt(1, idRoomNote);
	    ps.executeUpdate();
	    ps.close();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
    }

    @Override
    public int newFileNote(String context, int x, int y, int idFile) {
	int result = -1;
	try {
	    String sql = "INSERT INTO FileNote (noteContext, x, y, idFile) VALUES (?,?,?,?)";
	    PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
	    ps.setString(1, context);
	    ps.setInt(2, x);
	    ps.setInt(3, y);
	    ps.setInt(4, idFile);
	    ps.executeUpdate();
	    ResultSet rs = ps.getGeneratedKeys();
	    if (rs.next()) {
		result = rs.getInt(1);
	    }
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
	return result;
    }

    @Override
    public void updateFileNote(int idFileNote, String context, int x, int y) {
	try {
	    String sql = "UPDATE FileNote SET noteContext=?, x=?, y=? WHERE idFileNote=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setString(1, context);
	    ps.setInt(2, x);
	    ps.setInt(3, y);
	    ps.setInt(4, idFileNote);
	    ps.executeUpdate();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
    }

    @Override
    public void rmFileNote(int idFileNote) {
	try {
	    String sql = "DELETE FROM FileNote WHERE idFileNote=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setInt(1, idFileNote);
	    ps.executeUpdate();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
    }

    @Override
    public int newFile(String filename, String data, String user, String fileType) {
	int result = -1;
	try {
	    String sql = "INSERT INTO File (fileName, fileData, fileOwner, fileType) VALUES (?,?,?,?)";
	    PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
	    ps.setString(1, filename);
	    Blob b = new SerialBlob(data.getBytes());
	    ps.setBlob(2, b);
	    ps.setString(3, user);
	    ps.setString(4, fileType);
	    ps.executeUpdate();
	    ResultSet rs = ps.getGeneratedKeys();
	    if (rs.next()) {
		result = rs.getInt(1);
	    }
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
	return result;
    }

    @Override
    public void updateFileData(int idFile, String data, String filename) {
	try {
	    String sql = "UPDATE File SET fileData=?, fileName=? WHERE idFile=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    Blob b = new SerialBlob(data.getBytes());
	    ps.setBlob(1, b);
	    ps.setString(2, filename);
	    ps.setInt(3, idFile);
	    ps.executeUpdate();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
    }

    @Override
    public void updateTableFile(int idFile, boolean onTable, int xFile, int yFile, int rotate, String preview) {
	try {
	    String sql = "UPDATE File SET onTable=?, xFile=?, yFile=?, rotate=?, preview=? WHERE idFile=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setBoolean(1, onTable);
	    ps.setInt(2, xFile);
	    ps.setInt(3, yFile);
	    ps.setInt(4, rotate);
	    Blob b = new SerialBlob(preview.getBytes());
	    ps.setBlob(5, b);
	    ps.setInt(6, idFile);
	    ps.executeUpdate();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
    }

    @Override
    public void rmFile(int idFile) {
	try {
	    String sql = "DELETE FROM File WHERE idFile=?";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setInt(1, idFile);
	    ps.executeUpdate();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
    }

    /*public static void main(String arg[]) throws SQLException {
	DataProxy d = new DataProxy();
	int id = d.newRoom("123", "123");
	d.saveRoom(id, "haha");
	System.out.println(d.getRoomInfo(id).getTableDoodle());
    }*/
}

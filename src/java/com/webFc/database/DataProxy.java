/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.database;

import com.google.gson.internal.bind.ReflectiveTypeAdapterFactory;
import com.webFc.data.FileDetailInfo;
import com.webFc.data.FileNoteInfo;
import com.webFc.data.Room;
import com.webFc.data.RoomNoteInfo;
import com.webFc.global.IData;
import java.sql.*;
import java.util.logging.Level;
import java.util.logging.Logger;

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
		result.setIdRoom(rs.getInt("idRoom"));
		result.setOwner(rs.getString("roomOwner"));
		result.setTableDoodle(rs.getString("tableDoodle"));
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
		    result.addFile(fileName, onTable, username, xFile, yFile, fileType);
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
		result.setDoodleOfFile(rs.getString("doodleOfFile"));
		result.setFileData(rs.getString("fileData"));
		result.setFileType(rs.getString("fileType"));
		result.setIdFile(rs.getInt("idFile"));
		result.setOwner(rs.getString("fileOwner"));
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
	    String sql = "INSERT INTO User(email, password) VALUES (?,?)";
	    PreparedStatement ps = con.prepareStatement(sql);
	    ps.setString(1, email);
	    ps.setString(2, password);
	    ps.executeUpdate();
	} catch (SQLException ex) {
	    Logger.getLogger(DataProxy.class.getName()).log(Level.SEVERE, null, ex);
	}
    }
    
    public static void main(String arg[]){
	//DataProxy d = new DataProxy();
	//d.
    }
}

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

import java.awt.Image;
import java.util.ArrayList;
import java.util.List;

/**
 *
 * @author fish
 */
public class Room extends Data {

    private int idRoom;
    private String tableDoodle;
    private String owner;
    private List<FileShortInfo> files = new ArrayList();
    private List<RoomNoteInfo> notes = new ArrayList();

    public Room() {
	type = "Room";
    }

    public Room(int idRoom, String tableDoodle, String owner) {
	type = "Room";
	this.idRoom = idRoom;
	this.tableDoodle = tableDoodle;
	this.owner = owner;
    }

    public List<FileShortInfo> getFiles() {
	return files;
    }

    public void setFiles(List<FileShortInfo> files) {
	this.files = files;
    }

    public List<RoomNoteInfo> getNotes() {
	return notes;
    }

    public void setNotes(List<RoomNoteInfo> notes) {
	this.notes = notes;
    }

    public int getIdRoom() {
	return idRoom;
    }

    public String getOwner() {
	return owner;
    }

    public String getTableDoodle() {
	return tableDoodle;
    }

    public void setIdRoom(int idRoom) {
	this.idRoom = idRoom;
    }

    public void setOwner(String owner) {
	this.owner = owner;
    }

    public void setTableDoodle(String tableDoodle) {
	this.tableDoodle = tableDoodle;
    }

    public void addFile(String fileName, boolean onTable, String username, int xFile, int yFile, String fileType) {
	files.add(new FileShortInfo(fileName, onTable, username, xFile, yFile, fileType));
    }

    public void addNote(int idNote, String noteContext, int x, int y) {
	notes.add(new RoomNoteInfo(idNote, noteContext, x, y));
    }
}

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
    private Image tableDoodle;
    private String owner;
    private List<FileShortInfo> files = new ArrayList();
    private List<NoteInfo> notes = new ArrayList();

    public Room() {
	type = "Room";
    }

    public Room(int idRoom, Image tableDoodle, String owner) {
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

    public List<NoteInfo> getNotes() {
	return notes;
    }

    public void setNotes(List<NoteInfo> notes) {
	this.notes = notes;
    }

    public int getIdRoom() {
	return idRoom;
    }

    public String getOwner() {
	return owner;
    }

    public Image getTableDoodle() {
	return tableDoodle;
    }

    public void setIdRoom(int idRoom) {
	this.idRoom = idRoom;
    }

    public void setOwner(String owner) {
	this.owner = owner;
    }

    public void setTableDoodle(Image tableDoodle) {
	this.tableDoodle = tableDoodle;
    }

    public void addFile(String fileName, boolean onTable, String username, int up, int left, int right, int bottom, String fileType) {
	files.add(new FileShortInfo(fileName, onTable, username, up, left, right, bottom, fileType));
    }

    public void addNote(int idNote, String noteContext, int x, int y) {
	notes.add(new NoteInfo(idNote, noteContext, x, y));
    }
}

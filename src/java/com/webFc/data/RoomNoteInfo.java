/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

/**
 *
 * @author fish
 */
public class RoomNoteInfo extends Data {

    private int idRoomNote;
    private String noteContext;
    private int x;
    private int y;

    public RoomNoteInfo() {
	type = "RoomNoteInfo";
    }

    public RoomNoteInfo(int idRoomNote, String noteContext, int x, int y) {
	type = "RoomNoteInfo";
	this.idRoomNote = idRoomNote;
	this.noteContext = noteContext;
	this.x = x;
	this.y = y;
    }

    public void setIdRoomNote(int idRoomNote) {
	this.idRoomNote = idRoomNote;
    }

    public void setNoteContext(String noteContext) {
	this.noteContext = noteContext;
    }

    public void setX(int x) {
	this.x = x;
    }

    public void setY(int y) {
	this.y = y;
    }

    public int getIdRoomNote() {
	return idRoomNote;
    }

    public String getNoteContext() {
	return noteContext;
    }

    public int getX() {
	return x;
    }

    public int getY() {
	return y;
    }
}

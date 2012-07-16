/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

/**
 *
 * @author fish
 */
public class NoteInfo extends Data {

    private int idNote;
    private String noteContext;
    private int x;
    private int y;

    public NoteInfo() {
	type = "NoteInfo";
    }

    public NoteInfo(int idNote, String noteContext, int x, int y) {
	type = "NoteInfo";
	this.idNote = idNote;
	this.noteContext = noteContext;
	this.x = x;
	this.y = y;
    }

    public void setIdNote(int idNote) {
	this.idNote = idNote;
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

    public int getIdNote() {
	return idNote;
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

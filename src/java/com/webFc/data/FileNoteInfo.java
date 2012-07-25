/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

/**
 *
 * @author fish
 */
public class FileNoteInfo extends Data {

    private int idFileNote;
    private String noteContext;
    private int x;
    private int y;

    public FileNoteInfo() {
	type = "FileNoteInfo";
    }

    public FileNoteInfo(int idFileNote, String noteContext, int x, int y) {
	type = "FileNoteInfo";
	this.idFileNote = idFileNote;
	this.noteContext = noteContext;
	this.x = x;
	this.y = y;
    }

    public void setIdFileNote(int idFileNote) {
	this.idFileNote = idFileNote;
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

    public int getIdFileNote() {
	return idFileNote;
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

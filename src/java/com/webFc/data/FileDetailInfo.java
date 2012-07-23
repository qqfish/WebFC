/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

import java.util.List;

/**
 *
 * @author fish
 */
public class FileDetailInfo extends Data{
    int idFile;
    String fileData;
    String owner;
    String doodleOfFile;
    String fileType;
    
    List<FileNoteInfo> fileNotes;

    public FileDetailInfo() {
	type = "FileDetailInfo";
    }

    public FileDetailInfo(int idFile, String fileData, String owner, String doodleOfFile, String fileType) {
	type = "FileDetailInfo";
	this.idFile = idFile;
	this.fileData = fileData;
	this.owner = owner;
	this.doodleOfFile = doodleOfFile;
	this.fileType = fileType;
    }
    
    

    public String getDoodleOfFile() {
	return doodleOfFile;
    }

    public void setDoodleOfFile(String doodleOfFile) {
	this.doodleOfFile = doodleOfFile;
    }

    public String getFileData() {
	return fileData;
    }

    public void setFileData(String fileData) {
	this.fileData = fileData;
    }

    public List<FileNoteInfo> getFileNotes() {
	return fileNotes;
    }

    public void setFileNotes(List<FileNoteInfo> fileNotes) {
	this.fileNotes = fileNotes;
    }

    public String getFileType() {
	return fileType;
    }

    public void setFileType(String fileType) {
	this.fileType = fileType;
    }

    public int getIdFile() {
	return idFile;
    }

    public void setIdFile(int idFile) {
	this.idFile = idFile;
    }

    public String getOwner() {
	return owner;
    }

    public void setOwner(String owner) {
	this.owner = owner;
    }
    
    public void addNote(int idFileNote, String noteContext, int x, int y) {
	fileNotes.add(new FileNoteInfo(idFileNote, noteContext, x, y));
    }
    
}

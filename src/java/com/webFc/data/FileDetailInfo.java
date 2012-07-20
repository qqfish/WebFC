/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

import java.util.Date;
import java.util.List;

/**
 *
 * @author fish
 */
public class FileDetailInfo extends Data{
    int idFile;
    String fileName;
    String fileData;
    String owner;
    String doodleOfFile;
    String fileType;
    Date editTime;
    
    List<FileNoteInfo> fileNotes;

    public FileDetailInfo() {
	type = "FileDetailInfo";
    }

    public FileDetailInfo(String fileName, int idFile, String fileData, String owner, String doodleOfFile, String fileType, Date time) {
	type = "FileDetailInfo";
	this.fileName = fileName;
	this.idFile = idFile;
	this.fileData = fileData;
	this.owner = owner;
	this.doodleOfFile = doodleOfFile;
	this.fileType = fileType;
	this.editTime = time;
    }

    public Date getEditTime() {
	return editTime;
    }

    public void setEditTime(Date editTime) {
	this.editTime = editTime;
    }

    public String getFileName() {
	return fileName;
    }

    public void setFileName(String fileName) {
	this.fileName = fileName;
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

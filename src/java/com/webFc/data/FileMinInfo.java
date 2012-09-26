/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 *
 * @author fish
 */
public class FileMinInfo extends Data{
    int idFile;
    String fileName;
	String fileType;

    public FileMinInfo() {
	type = "FileMinInfo";
    }

    public FileMinInfo(String fileName, int idFile) {
	type = "FileMinInfo";
	this.fileName = fileName;
	this.idFile = idFile;
    }

    public String getFileName() {
	return fileName;
    }

    public void setFileName(String fileName) {
	this.fileName = fileName;
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
    
}

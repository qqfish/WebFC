/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

import java.util.Date;

/**
 *
 * @author fish
 */
public class FileShortInfo extends Data {

    private String fileName;
    private boolean onTable;
    private String username;
    private int xFile;
    private int yFile;
    private String fileType;
    private int rotate;
    private String preview;
    private Date editTime;

    public FileShortInfo() {
	type = "FileShortInfo";
    }

    public FileShortInfo(String fileName, boolean onTable, String username, int xFile, int yFile, String fileType, int rotate, String preview, Date editTime) {
	type = "FileShortInfo";
	this.fileName = fileName;
	this.onTable = onTable;
	this.username = username;
	this.xFile = xFile;
	this.yFile = yFile;
	this.fileType = fileType;
	this.editTime = editTime;
	this.preview = preview;
    }

    public Date getEditTime() {
	return editTime;
    }

    public void setEditTime(Date editTime) {
	this.editTime = editTime;
    }

    public String getPreview() {
	return preview;
    }

    public void setPreview(String preview) {
	this.preview = preview;
    }

    public int getRotate() {
	return rotate;
    }

    public void setRotate(int rotate) {
	this.rotate = rotate;
    }

    public int getxFile() {
	return xFile;
    }

    public void setxFile(int xFile) {
	this.xFile = xFile;
    }

    public int getyFile() {
	return yFile;
    }

    public void setyFile(int yFile) {
	this.yFile = yFile;
    }

    public String getFileName() {
	return fileName;
    }

    public String getFileType() {
	return fileType;
    }

    public boolean isOnTable() {
	return onTable;
    }

    public String getUsername() {
	return username;
    }

    public void setFileName(String fileName) {
	this.fileName = fileName;
    }

    public void setFileType(String fileType) {
	this.fileType = fileType;
    }

    public void setOnTable(boolean onTable) {
	this.onTable = onTable;
    }

    public void setUsername(String username) {
	this.username = username;
    }
}

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

/**
 *
 * @author fish
 */
public class FileShortInfo extends Data{
    private String fileName;
    private boolean onTable;
    private String username;
    private int up;
    private int left;
    private int right;
    private int bottom;
    private String fileType;

    public FileShortInfo() {
	type = "FileShortInfo";
    }

    public FileShortInfo(String fileName, boolean onTable, String username, int up, int left, int right, int bottom, String fileType) {
	type = "FileShortInfo";
	this.fileName = fileName;
	this.onTable = onTable;
	this.username = username;
	this.up = up;
	this.left = left;
	this.right = right;
	this.bottom = bottom;
	this.fileType = fileType;
    }

    public int getBottom() {
	return bottom;
    }

    public String getFileName() {
	return fileName;
    }

    public String getFileType() {
	return fileType;
    }

    public int getLeft() {
	return left;
    }

    public boolean isOnTable() {
	return onTable;
    }

    public int getRight() {
	return right;
    }

    public int getUp() {
	return up;
    }

    public String getUsername() {
	return username;
    }

    public void setBottom(int bottom) {
	this.bottom = bottom;
    }

    public void setFileName(String fileName) {
	this.fileName = fileName;
    }

    public void setFileType(String fileType) {
	this.fileType = fileType;
    }

    public void setLeft(int left) {
	this.left = left;
    }

    public void setOnTable(boolean onTable) {
	this.onTable = onTable;
    }

    public void setRight(int right) {
	this.right = right;
    }

    public void setUp(int up) {
	this.up = up;
    }

    public void setUsername(String username) {
	this.username = username;
    }
    
    
    
    
    
}

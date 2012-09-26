/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket.MessageType;

import java.util.*;
import com.webFc.data.Data;
import com.webFc.data.FileMinInfo;

/**
 *
 * @author Administrator
 */
public class getFileList extends Data{
	private List<FileMinInfo> fileList;
	
	public getFileList() {
	type = "getFileList";
    }
	
	public void setFileList( List<FileMinInfo> fileList){
		this.fileList = fileList;
	}
	public List<FileMinInfo> getFileList(){
		return this.fileList;
	}
	
}

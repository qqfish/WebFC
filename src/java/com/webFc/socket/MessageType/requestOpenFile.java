/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket.MessageType;

import com.webFc.data.Data;

/**
 *
 * @author fish
 */
public class requestOpenFile extends Data{
    int idFile;

    public requestOpenFile() {
	type = "requestOpenFile";
    }

    public int getIdFile() {
	return idFile;
    }

    public void setIdFile(int idFile) {
	this.idFile = idFile;
    }
    
}

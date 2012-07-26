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
public class SaveDoodle extends Data {

    private String doodleOfTable;

    public SaveDoodle() {
	type = "SaveTableDoodle";
    }
    
    

    public String getDoodleOfTable() {
	return doodleOfTable;
    }

    public void setDoodleOfTable(String doodleOfTable) {
	this.doodleOfTable = doodleOfTable;
    }
    
}

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket.MessageType;

import com.webFc.data.Data;
/**
 *
 * @author Administrator
 */
public class requestNote extends Data {
    
	private String from;

    public requestNote() {
	type = "requestNote";
    }
	
    public String getFrom() {
	return from;
    }

    public void setFrom(String from) {
	this.from = from;
    }
	
}

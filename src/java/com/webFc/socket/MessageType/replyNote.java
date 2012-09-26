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
public class replyNote extends Data {
	private String to;
	
	public replyNote() {
	type = "replyNote";
	}

    public String getTo() {
	return to;
    }

    public void setTo(String to) {
	this.to = to;
    }
	
}

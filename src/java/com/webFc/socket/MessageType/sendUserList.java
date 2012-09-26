/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket.MessageType;

import java.util.*;
import com.webFc.data.Data;

/**
 *
 * @author Administrator
 */
public class sendUserList extends Data {
	private String from;
	
	public sendUserList() {
	type = "sendUserList";
    }

	public String getFrom() {
		return from;
	}

	public void setFrom(String from) {
		this.from = from;
	}

	
}

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
public class getUserList extends Data{
	private List<String> userList;
	private String usage;
	private String to;

	public String getUsage() {
		return usage;
	}

	public void setUsage(String usage) {
		this.usage = usage;
	}

	
	public getUserList() {
	type = "getUserList";
    }
	
	public void setUserList( List<String> userList){
		this.userList = userList;
	}
	public List<String> getUserList(){
		return this.userList;
	}

	public String getTo() {
		return to;
	}

	public void setTo(String to) {
		this.to = to;
	}
	
}

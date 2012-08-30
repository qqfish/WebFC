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
	
	public getUserList() {
	type = "getUserList";
    }
	
	public void setUserList( List<String> userList){
		this.userList = userList;
	}
	public List<String> getUserList(){
		return this.userList;
	}
	
}

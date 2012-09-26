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
public class leaveRoom extends Data {
	private String username;
	
	public leaveRoom() {
	type = "leaveRoom";
    }
	
	public void setUsername(String username){
		this.username = username;
	}
	
	public String getUsername(){
		return this.username;
	}
}

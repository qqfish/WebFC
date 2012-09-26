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
public class getVideoState extends Data {
	private List videoState;
	private String to;
	
	public getVideoState() {
	type = "getVideoState";
    }
	
	public void setVideoState(List videoState){
		this.videoState = videoState;
	}
	
	public List getVideoState(){
		return this.videoState;
	}
	
	public void setTo(String to){
		this.to = to;
	}
	
	public String getTo(){
		return this.to;
	}
}

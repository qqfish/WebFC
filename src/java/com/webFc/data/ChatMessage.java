/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

import java.util.List;

/**
 *
 * @author fish
 */
public class ChatMessage extends Data {

    private List<String> to;
    private String from;
    private String message;

    public ChatMessage() {
	type = "ChatMessage";
    }

    public void setTo(List<String> to) {
	this.to = to;
    }

    public List<String> getTo() {
	return to;
    }
    
    public void setFrom(String from){
	this.from = from;
    }
    
    public String getFrom(){
	return from;
    }
    
    public void setMessage(String message){
	this.message = message;
    }
    
    public String getMessage(){
	return message;
    }
}

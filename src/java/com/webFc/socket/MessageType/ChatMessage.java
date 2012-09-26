/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket.MessageType;

import com.webFc.data.Data;

/**
 *
 * @author hp
 */
public class ChatMessage extends Data{
    private String message;
    private String to;
    private String from;

    public ChatMessage() {
        type = "ChatMessage";
    }

    public ChatMessage(String message, String peopleTo, String peopleFrom) {
        type = "ChatMessage";
        this.message = message;
        this.to = peopleTo;
        this.from = peopleFrom;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getFrom() {
        return from;
    }

    public void setFrom(String peopleFrom) {
        this.from = peopleFrom;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String peopleTo) {
        this.to = peopleTo;
    }
    
    
    
}

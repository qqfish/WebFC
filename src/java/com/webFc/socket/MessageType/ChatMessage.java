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
    private String peopleTo;
    private String peopleFrom;

    public ChatMessage() {
        type = "ChatMessage";
    }

    public ChatMessage(String message, String peopleTo, String peopleFrom) {
        type = "ChatMessage";
        this.message = message;
        this.peopleTo = peopleTo;
        this.peopleFrom = peopleFrom;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getPeopleFrom() {
        return peopleFrom;
    }

    public void setPeopleFrom(String peopleFrom) {
        this.peopleFrom = peopleFrom;
    }

    public String getPeopleTo() {
        return peopleTo;
    }

    public void setPeopleTo(String peopleTo) {
        this.peopleTo = peopleTo;
    }
    
    
    
}

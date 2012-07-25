/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket.MessageType;

import com.webFc.data.Data;

/**
 *
 * @author fish
 */
public class AlertMessage extends Data{
    private String alertWord;

    public AlertMessage() {
	type = "AlertMessage";
    }

    public AlertMessage(String alertWord) {
	type = "AlertMessage";
	this.alertWord = alertWord;
    }
    
    

    public String getAlertWord() {
	return alertWord;
    }

    public void setAlertWord(String alertWord) {
	this.alertWord = alertWord;
    }
    
    
}

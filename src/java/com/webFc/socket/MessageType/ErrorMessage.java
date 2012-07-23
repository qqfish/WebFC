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
public class ErrorMessage extends Data {

    String errorWord;

    public ErrorMessage(String errorWord) {
	type = "Error";
	this.errorWord = errorWord;
    }

    public String getErrorWord() {
	return errorWord;
    }

    public void setErrorWord(String errorWord) {
	this.errorWord = errorWord;
    }
}

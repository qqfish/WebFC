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
public class NewNote extends Data{
    private String context;
    private int x;
    private int y;

    public NewNote() {
	type = "NewNote";
    }
    

    public NewNote(String context, int x, int y) {
	type = "NewNote";
	this.context = context;
	this.x = x;
	this.y = y;
    }

    public String getContext() {
	return context;
    }

    public void setContext(String context) {
	this.context = context;
    }

    public int getX() {
	return x;
    }

    public void setX(int x) {
	this.x = x;
    }

    public int getY() {
	return y;
    }

    public void setY(int y) {
	this.y = y;
    }
    
}

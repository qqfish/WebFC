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
public class SaveDragFile extends Data{
    private int id;
    private int x;
    private int y;
    private int rotate;
    private String movement;
    private boolean onTable;

    public SaveDragFile() {
	type = "dragMessage";
    }

    public SaveDragFile(int id, int x, int y, int rotate, String movement, String type, boolean onTable) {
	type = "dragMessage";
	this.id = id;
	this.x = x;
	this.y = y;
	this.rotate = rotate;
	this.movement = movement;
	this.type = type;
	this.onTable = onTable;
    }

    public int getId() {
	return id;
    }

    public void setId(int id) {
	this.id = id;
    }

    public String getMovement() {
	return movement;
    }

    public void setMovement(String movement) {
	this.movement = movement;
    }

    public boolean isOnTable() {
	return onTable;
    }

    public void setOnTable(boolean onTable) {
	this.onTable = onTable;
    }

    public int getRotate() {
	return rotate;
    }

    public void setRotate(int rotate) {
	this.rotate = rotate;
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

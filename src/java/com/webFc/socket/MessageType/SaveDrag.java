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
public class SaveDrag extends Data{
    private int id;
    private int x;
    private int y;
    private String element;
    private int rotate;
    private String movement;
    private boolean onTable;

    public SaveDrag() {
	type = "dragMessage";
    }

    public SaveDrag(int id, int x, int y, int rotate, String movement, String type, boolean onTable, String element) {
	type = "dragMessage";
	this.id = id;
	this.x = x;
	this.y = y;
	this.rotate = rotate;
	this.movement = movement;
	this.type = type;
	this.onTable = onTable;
	this.element = element;
    }

    public String getElement() {
	return element;
    }

    public void setElement(String element) {
	this.element = element;
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

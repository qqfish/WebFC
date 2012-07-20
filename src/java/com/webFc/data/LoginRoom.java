/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

/**
 *
 * @author fish
 */
public class LoginRoom extends Data {

    private int idRoom;
    private String username;

    public LoginRoom() {
	type = "LoginRoom";
    }

    public LoginRoom(int idRoom, String username) {
	type = "LoginRoom";
	this.idRoom = idRoom;
	this.username = username;
    }

    public int getIdRoom() {
	return idRoom;
    }

    public void setIdRoom(int idRoom) {
	this.idRoom = idRoom;
    }

    public String getUsername() {
	return username;
    }

    public void setUsername(String username) {
	this.username = username;
    }
}

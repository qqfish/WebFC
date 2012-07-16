/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

/**
 *
 * @author fish
 */
public class LoginRoom extends Data{
    
    private int idRoom;
    private int idUser;
    
    public LoginRoom(){
	type = "LoginRoom";
    }

    public LoginRoom(int idRoom, int idUser) {
	type = "LoginRoom";
	this.idRoom = idRoom;
	this.idUser = idUser;
    }
    
    

    public int getIdRoom() {
	return idRoom;
    }

    public int getIdUser() {
	return idUser;
    }

    public void setIdRoom(int idRoom) {
	this.idRoom = idRoom;
    }

    public void setIdUser(int idUser) {
	this.idUser = idUser;
    }
    
    
    
}

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
public class requestPic extends Data {

    private String from;

    public requestPic() {
	type = "requestPic";
    }
    
    public String getFrom() {
	return from;
    }

    public void setFrom(String from) {
	this.from = from;
    }
    
    
}

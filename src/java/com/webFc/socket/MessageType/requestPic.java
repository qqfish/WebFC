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

    private int from;

    public requestPic() {
	type = "requestPic";
    }
    
    public int getFrom() {
	return from;
    }

    public void setFrom(int from) {
	this.from = from;
    }
    
    
}

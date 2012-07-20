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
public class doodlePic extends Data{
    private String data;
    private String to;

    public doodlePic() {
	type = "doodlePic";
    }
    
    

    public String getData() {
	return data;
    }

    public void setData(String data) {
	this.data = data;
    }

    public String getTo() {
	return to;
    }

    public void setTo(String to) {
	this.to = to;
    }
    
    
    
}

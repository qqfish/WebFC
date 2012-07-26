/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket.MessageType;

import com.webFc.data.Data;
import java.util.List;

/**
 *
 * @author fish
 */
public class offerList extends Data{
    private class offer extends Data{
	private String sdp;
	private int id;

	public offer() {
	    type = "offer";
	}

	public String getSdp() {
	    return sdp;
	}

	public void setSdp(String sdp) {
	    this.sdp = sdp;
	}

	public int getId() {
	    return id;
	}

	public void setId(int id) {
	    this.id = id;
	}
	
    }
    List<offer> ooList;

    public offerList() {
	type = "offerList";
    }

    public List<offer> getOoList() {
	return ooList;
    }

    public void setOoList(List<offer> ooList) {
	this.ooList = ooList;
    }
    
}

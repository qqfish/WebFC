/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

/**
 *
 * @author hp
 */
public class Response {
    OpenFileInfo response;

    public Response(OpenFileInfo response) {
        this.response = response;
    }

    public OpenFileInfo getResponse() {
        return response;
    }

    public void setResponse(OpenFileInfo response) {
        this.response = response;
    }
    
}

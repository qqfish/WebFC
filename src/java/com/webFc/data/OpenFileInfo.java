/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

/**
 *
 * @author hp
 */
public class OpenFileInfo extends Data{
    String result;
    String url;

    public OpenFileInfo(String result, String url) {
        type = "OpenFile";
        this.result = result;
        this.url = url;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public void setType() {
        this.type = "OpenFile";
    }
    
}

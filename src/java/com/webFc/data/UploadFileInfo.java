/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.data;

import java.io.FileInputStream;

/**
 *
 * @author hp
 */
public class UploadFileInfo extends Data{
    String name;
    String Filetype;
    String content;

    public UploadFileInfo() {
        type = "uploadFile";
    }

    public UploadFileInfo(String name, String Filetype, String content) {
        this.name = name;
        this.Filetype = Filetype;
        this.content = content;
    }

    public String getFiletype() {
        return Filetype;
    }

    public void setFiletype(String Filetype) {
        this.Filetype = Filetype;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
}

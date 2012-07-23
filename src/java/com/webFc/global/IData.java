/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.global;

import com.webFc.data.FileDetailInfo;
import com.webFc.data.FileNoteInfo;
import com.webFc.data.RoomNoteInfo;
import com.webFc.data.Room;

/**
 *
 * @author fish
 */
public interface IData {
    boolean hasUser(String email);
    boolean checkPassword(String email, String password);
    void createUser(String email, String password);
    
    Room getRoomInfo(int idRoom);
    RoomNoteInfo getRoomNote(int idRoomNote);
    FileNoteInfo getFileNote(int idFileNote);
    FileDetailInfo getDetailFile(int idFile);
    
    //int new
}

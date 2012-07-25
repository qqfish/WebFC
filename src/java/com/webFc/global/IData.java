/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.global;

import com.webFc.data.*;

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
    FileShortInfo getTableFile(int idFIle);
    
    int newRoom(String roomname, String user);
    void saveRoom(int idRoom, String doodleOfTable);
    
    int newRoomNote(String context, int x, int y, int idRoom);
    void updateRoomNote(int idRoomNote, String context, int x, int y);
    void rmRoomNote(int idRoomNote);
    
    int newFileNote(String context, int x, int y, int idFile);
    void updateFileNote(int idFileNote, String context, int x, int y);
    void rmFileNote(int idFileNote);
    
    int newFile(String filename, String data, String user, String fileType, int idRoom);
    void updateFileData(int idFile, String data, String filename);
    void updateTableFile(int idFile, boolean onTable, int xFile, int yFile, int rotate, String preview);
    void updateTableFile(int idFile, boolean onTable, int xFile, int yFile, int rotate);
    void rmFile(int idFile);
    
}

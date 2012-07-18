/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

login = {};

login.init = function(){
    login.type = "LoginRoom";
    login.idUser = prompt( "输入用户id "); 
    login.idRoom = prompt("输入房间id");
    connection.sendMessage(JSON.stringify(login));
}


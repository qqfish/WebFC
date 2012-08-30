/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var login = {};

$(document).ready(function() {
	$("#loginButton").click(function(){
		login.init();
	})
})

login.init = function(){
    login.type = "LoginRoom";
    login.username = username.value; 
    login.idRoom = roomId.value;
	var message = JSON.stringify(login);
	console.log(message);
    connection.sendMessage(message);
	$("#loginAll").fadeOut();
	$("#menuButton").fadeIn();
	$("#canvasButton").fadeIn();
	$("#canvasTop").fadeIn();
	$("#canvasTemp").fadeIn();
	//doodle.requestDoodle();//获取当前房间的涂鸦
	//getUserList();//获取当前房间的用户列表
}
/*
function getUserList(){
	var message={};
	message.type = "userList";
	message.from = login.username;
	var Jmessage = JSON.stringify(message);
	console.log(Jmessage);
    connection.sendMessage(Jmessage);
}*/
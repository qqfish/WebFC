var chat = {};

$(document).ready(function() {
	$(window).resize(function(){
		chat.relocate();
	})
	$(window).scroll(function(){
		chat.relocate();
	})
	$("#chatButton").click(function(){
		if($('#chatWindow').css('display') == "block"){
			$("#chatWindow").fadeOut();
		}
		else{
			$("#chatWindow").fadeIn();
		}
	})	
	$("#chatSend").click(function(){
		var usernameTo = $("#chatUserList").val();
		if(usernameTo =="所有人"){
			chat.sendBroadcastMessage();
		}
		else{
			chat.sendMessageTo(usernameTo);
		}
	})
	$("#chatInput").keypress(function(e){
		var key = e.which;
		console.log(key);
		if(key==13){
			$("#chatSend").click();
		}
	})
})

chat.relocate = function(){
	var height_b = Math.abs(document.documentElement.clientHeight + document.body.scrollTop - 85);
	var width_b =Math.abs(document.documentElement.clientWidth + document.body.scrollLeft - 45);
	var height_w = Math.abs(document.documentElement.clientHeight + document.body.scrollTop - 330);
	var width_w =Math.abs(document.documentElement.clientWidth + document.body.scrollLeft - 387);
	//window.status = document.documentElement.clientHeight + " " + document.body.scrollTop;
	$("#chatButton").css("top", height_b);
	$("#chatButton").css("left", width_b);
	$("#chatWindow").css("top", height_w);
	$("#chatWindow").css("left", width_w);
}

chat.sendBroadcastMessage = function() {
	var chatMessage = $("#chatInput").val();
	if (chatMessage != "") {
		var message = {};
		message.type = "chatMessagePublic";
		message.from = login.username;
		message.color = $("#chatColors").val();
		message.context = chatMessage;
		chat.printMessagePublic(message);
		var Jmessage = JSON.stringify(message);
		console.log("C->S: " + Jmessage);
		connection.sendMessage(Jmessage);
		$("#chatInput").val("");
	}
};

chat.sendMessageTo = function(username) {
	var chatMessage = $("#chatInput").val();
	if (chatMessage != "") {
		var message = {};
		message.type = "chatMessagePrivate";
		message.color = $("#chatColors").val();
		message.from = login.username;
		message.to = username;
		message.context = chatMessage;
		chat.printMessagePrivate(message,"send");
		var Jmessage = JSON.stringify(message);
		console.log("C->S: " + Jmessage);
		connection.sendMessage(Jmessage);
		$("#chatInput").val("");
	}
};

chat.printMessagePublic = function(data) {
	var chatContext = document.getElementById("chatContext");
	var p = document.createElement('p');
	p.style.wordWrap = 'break-word';
	p.style.color = data.color;
	p.innerHTML = data.from + " : " + data.context;
	chatContext.appendChild(p);
	/*while (chatContext.childNodes.length > 25) {
		chatContext.removeChild(chatContext.firstChild);
	}*/
     chatContext.scrollTop = chatContext.scrollHeight;
}

chat.printMessagePrivate = function(data,type) {
	var chatContext = document.getElementById("chatContext");
	var p = document.createElement('p');
	p.style.wordWrap = 'break-word';
	p.style.color = data.color;
	if(type == "send"){
		p.innerHTML = "你悄悄地对" + data.to + "说 : " + data.context;
	}
	else{
		p.innerHTML = data.from + "悄悄地对你说 : " + data.context;
	}
	chatContext.appendChild(p);
	/*while (chatContext.childNodes.length > 25) {
		chatContext.removeChild(chatContext.firstChild);
	}*/
     chatContext.scrollTop = chatContext.scrollHeight;
}

chat.getUserList = function(message){
	var userlist_temp = message.userList;
	$("#chatUserList").html("<option>所有人</option>");
	currentUser = 0;
	while(userlist_temp[currentUser]){
		var inner = $("#chatUserList").html();
		$("#chatUserList").html( inner +"<option>"+ userlist_temp[currentUser] +"</option>");
		currentUser = currentUser + 1;
	}
}

/*
var data={};
data.init = function()
{
    //data.type="ChatInformations";
    data.message="";
    data.color="#000000";
    var width=document.body.clientWidth;
    var height=document.body.clientHeight;
    var canvas=document.getElementById("canvas");
    var canvasTop=document.getElementById("canvasTop");	
    canvas.width=width-20;
    canvas.height=height-20;
    canvasTop.width=width-20;
    canvasTop.height=height-20;
}
data.init();
    $("#send").click(function(event){
        var z=document.getElementById("tab");
        var results = {};
        results.type = "ChatMessage";
        results.message = document.getElementById("input").value;
	connection.sendMessage(JSON.stringify(results));
	var T=document.getElementById("dialog");
	var x=T.insertRow(T.rows.length);
	if ((T.rows.length%2)!=0)
	    x.className="dia1";
	else
	    x.className="dia2";
	var y=x.insertCell(0);
	y.innerHTML="<a >"+document.getElementById("input").value+"</a>";
	var z=document.getElementById("tab");
	document.getElementById("input").value="";
	z.scrollTop=z.scrollHeight;
    });
    $("#chatButton").mouseenter(function(){
	$('#frame').fadeIn();
    });

    $("#canvasTop").mousedown(function(){
	$('#frame').fadeOut();
    });
    
    $(".namelist").mousedown(function(){
	document.getElementById("input").value="To "+event.srcElement.name+":";
    });
    $("#colors").change(
	function(){
	    var selectType=document.getElementById("colors");
	    switch (selectType.selectedIndex)
	    {
		case 0:
		    data.color="#000000";
		    break;
		case 1:
		    data.color="#FF0000";
		    break;
		case 2:
		    data.color="#0000FF";
		    break;
		default:
		    data.color="#000000";
	    }
	});
        
        

data.sendMessage = function(){
    var T=document.getElementById("dialog");
    var x=T.insertRow(T.rows.length);
    if ((T.rows.length%2)!=0)
	x.className="dia1";
    else 
	x.className="dia2";
    var y=x.insertCell(0);
    y.innerHTML="<a style=\"color:"+dialog.color+"\">"+message.data+"</a>";
    var z=document.getElementById("tab");
    z.scrollTop=z.scrollHeight;
    document.getElementById("input").value="";
}

data.writeMessage = function(message){
    
}*/

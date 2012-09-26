/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var logg = function(s) {
    console.log(s);
};

var connection = {};

connection.socket = null;

connection.connect = (function(host) {
    if ('WebSocket' in window) {
	connection.socket = new WebSocket(host);
    } else if ('MozWebSocket' in window) {
	connection.socket = new MozWebSocket(host);
    } else {
	console.log('Error: WebSocket is not supported by this browser.');
	return;
    }

    connection.socket.onopen = function () {
	    console.log('Info: WebSocket connection opened.');
	//每隔10秒发送一条空信息，防止websocket自动断开。
	    setInterval("connection.sendMessage('')",1000 * 10);
    };

    connection.socket.onclose = function () {
	    console.log('Info: WebSocket closed.');
    };

    connection.socket.onmessage = function (message) {
	var socketData = JSON.parse(message.data);
	console.log('S->C: ' + message.data);
	if(socketData.type == "LoginRoom"){
		mediaStream.getVideoState(socketData);
	}else if(socketData.type == "leaveRoom"){
		mediaStream.hideVideo(socketData.username);
	}else if(socketData.type == "doodleTable"){
		if(socketData.drawElement == "P"){
			doodle.DrawPLD(socketData);
		}
		else if(socketData.drawElement == "shape"){
			doodle.DrawShapeLD(socketData);
		}
		else if(socketData.drawElement == "word"){
			doodle.DrawWordLD(socketData);
		}
	}
	else if(socketData.type == "doodlePic"){
	    if(socketData.usage == "saveDoodle"){
		    doodle.restorePic(socketData.data);
		}
		else if(socketData.usage == "replyDoodle"){
			doodle.restorePic(socketData.data);
		}else { //第三种情况即为第一个登陆房间的人直接获取保存值
			doodle.restorePic(socketData.data);
		}
	}else if(socketData.type == "requestPic"){
		doodle.getDoodlePic(socketData);
	}else if(socketData.type == "sendUserList"){
		mediaStream.sendUserList(socketData);
	}else if(socketData.type == "getUserList"){
		mediaStream.getUserList(socketData);
		chat.getUserList(socketData);
	}else if(socketData.type == "getFileList"){
		fileInfo.addFile(socketData);
	}
	/*else if(socketData.type == "ClearTable"){
	    note.clear();
	    drag.clear();
	    doodle.clear();	    
	}*/
	else if (socketData.type == "videoRequest"){
		mediaStream.doRequest(socketData);
	}else if(socketData.type == "getVideoState"){
		mediaStream.maybeDoVideoRequest(socketData);
	}else if (socketData.type == "videoDrag"){
		mediaStream.move(socketData.id, socketData.start, socketData.stop);
	}
	else if (socketData.type == "ErrorMessage"){
	    alert(socketData.errorWord);
	}
	else if (socketData.type == "offer"){
	    do_Offer(socketData);
	}
	else if (socketData.type == "answer" && started){
	    do_Answer(socketData);
	}
	else if (socketData.type =="candidate" && started){
	    do_Candidate(socketData);
	}
	else if ( socketData.type == "bye" && started ){
	    onRemoteHangup();
	}
	else if (socketData.type == "AlertMessage"){
	    alert(socketData.alertWord);
	}/*
	else if (socketData.type == "dragMessage"){
	    drag.onmessage(socketData);
	}
	else if(socketData.type == "FileShortInfo"){
	    drag.setFilePosition(socketData);
	    fileInfo.addFile(socketData);
	}
	else if(socketData.type == "RoomNoteInfo" || socketData.type == "FileNoteInfo"){
	    note.setNotePosition(socketData);
	}
	else if(socketData.type == "OpenFile"){
	    $("#openfile").attr("src",socketData.url);
	}*/
	else if(socketData.type == "noteCreate"){
		note.display(socketData.P, socketData.value);
	}
	else if(socketData.type == "noteDrag"){
		note.move(socketData.id, socketData.start, socketData.stop);
	}else if(socketData.type == "requestNote"){
		note.getNoteList(socketData.from);
	}else if(socketData.type == "replyNote"){
		note.drawAllNote(socketData);
	}else if(socketData.type == "chatMessagePublic"){
	   if($('#chatWindow').css('display') == "none"){$("#chatButton").addClass("Message");}
        chat.printMessagePublic(socketData);
     }else if(socketData.type == "chatMessagePrivate"){
	   if($('#chatWindow').css('display') == "none"){$("#chatButton").addClass("Message");}
        chat.printMessagePrivate(socketData,"receive");
     }
    };
});

connection.initialize = function() {
    if (window.location.protocol == 'http:') {
	connection.connect('ws://' + window.location.host + '/WebFc/WebFcSocketServlet');
    } else {
	connection.connect('wss://' + window.location.host + '/WebFc/WebFcSocketServlet');
    }
};

connection.sendMessage = function(message) {
    connection.socket.send(message);
};

connection.initialize();



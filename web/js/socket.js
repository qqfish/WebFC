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
	logg('Error: WebSocket is not supported by this browser.');
	return;
    }

    connection.socket.onopen = function () {
	logg('Info: WebSocket connection opened.');
	//每隔10秒发送一条空信息，防止websocket自动断开。
	setInterval("connection.sendMessage('')",1000 * 10);
    };

    connection.socket.onclose = function () {
	logg('Info: WebSocket closed.');
    };

    connection.socket.onmessage = function (message) {
	var socketData = JSON.parse(message.data);
	console.log('S->C: ' + message.data);
	if(socketData.type == "doodleTable"){
	    if(socketData.drawElement == "freeDraw"){
		doodle.redraw(socketData.index, socketData);
	    }
	    else if(socketData.drawElement == "shape"){
		doodle.drawToCanvasGraph(socketData.index, socketData);
	    }	    
	}
	else if(socketData.type == "requestPic"){
	    if(socketData.usage == "updatePic"){
		connection.sendMessage(doodle.getDoodlePic(socketData));
	    } else if(socketData.usage == "saveDoodle"){
		doodle.saveDoodle();
	    }
	}
	else if(socketData.type == "clearTable"){
	    note.clear();
	    drag.clear();
	    
	}
	else if(socketData.type == "doodlePic"){
	    doodle.restorePic(socketData.data);
	}
	else if(socketData.type == "OpenFile"){
	    $("#openfile").attr("src",socketData.url);
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
	}
	else if (socketData.type == "dragMessage"){
	    drag.onmessage(socketData);
	}
	else if(socketData.type == "FileShortInfo"){
	    drag.setFilePosition(socketData)
	}
	else if(socketData.type == "RoomNoteInfo" || socketData.type == "FileNoteInfo"){
	    note.setNotePosition(socketData);
	}
	else if(socketData.type == "OpenFile"){
	    $("#openfile").attr("src",socketData.url);
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



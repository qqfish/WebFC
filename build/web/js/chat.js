var data={};

data.init = function(){
    data.type="ChatInformations";
    data.message="";
    data.color="#000000";
    $("#send").click(function(event){
	if (event.keyCode == 13) {
	    Chat.sendMessage();
	}
	var T=document.getElementById("dialog");
	var x=T.insertRow(T.rows.length);
	if ((T.rows.length%2)!=0)
	    x.className="dia1";
	else
	    x.className="dia2";
	var y=x.insertCell(0);
	y.innerHTML="<a style=\"color:"+dialog.color+"\">"+message.data+"</a>";
	var z=document.getElementById("tab");
	document.getElementById("input").value="";
	z.scrollTop=z.scrollHeight;
    });
    $("#chatButton").mousedown(function(){
	$("#frame").slideToggle("slow");
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
} 

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
    
}
var Chat = {};
Chat.socket = null;
Chat.connect = (function(host) {
    if ('WebSocket' in window) {
	Chat.socket = new WebSocket(host);
    } else if ('MozWebSocket' in window) {
	Chat.socket = new MozWebSocket(host);
    } else {
	alert('Error: WebSocket is not supported by this browser.');
	return;
    }
    Chat.socket.onopen = function () {
	// alert('Info: WebSocket connection opened.'); 
	document.getElementById('input').onkeydown = function(event) {
	    if (event.keyCode == 13) {
		Chat.sendMessage();
	    }
	};
    };

    Chat.socket.onclose = function () {
	document.getElementById('input').onkeydown = null;
	alert('Info: WebSocket closed.');
    };

    Chat.socket.onmessage = function (message) {
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
    };
});
Chat.initialize = function() {
    //Chat.connect('ws://' + window.location.host + '/examples/websocket/chat');
    Chat.connect('ws://' + window.location.host + '/ChatWebSocketServlet');
};
Chat.sendMessage = (function() {
    data.message = document.getElementById('input').value;
    if (message != '') {
	Chat.socket.send(JSON.stringfy(data));
	document.getElementById('input').value = '';
    }
});
Chat.initialize();


/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var toolbox = {};
var note = {};
note.counter = 0;

$(document).ready(function(){
	$('#canvasTemp').mousedown(function(e){
		if (toolbox.type=="addTag"){
			$("#noteArea").css("display","none");
			document.getElementById("ntextArea").value = "";
			$("#noteArea").css("left",e.pageX - this.offsetLeft);
			$("#noteArea").css("top",e.pageY - this.offsetTop);
			toolbox.lastPoint = new Array(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			$("#noteArea").fadeIn();
		}
	})
	$('#noteOk').mousedown(function(){
        $("#noteArea").fadeOut();
	   note.display(toolbox.lastPoint, document.getElementById("ntextArea").value);
	   note.createSend(toolbox.lastPoint, document.getElementById("ntextArea").value);
    })
    $('#noteCancel').mousedown(function(){
        $("#noteArea").fadeOut();
    })
	//如果侦听到按下回车键，显示输入文字
	$("#ntextArea").keypress(function(e){
		var key = e.which;
		console.log(key);
		if(key==13){
			$("#noteArea").fadeOut();
	         note.display(toolbox.lastPoint, document.getElementById("ntextArea").value);
			note.createSend(toolbox.lastPoint, document.getElementById("ntextArea").value);
		}
	})
})

note.display = function(P, value){
	var nId = "note" + note.counter;
	var newNote = $("<div "+"id='"+ nId +"' class='note'>");
	newNote.mousedown(function(e){
		if (toolbox.type=="clearElement"){
			$(this).fadeOut();
		}
	})
	newNote.draggable({
		start:function(e,ui){
			console.log("start: "+(e.pageX) +", " +(e.pageY));
			note.dragstart = new Array(e.pageX, e.pageY);
		},
		stop:function(e,ui){
			console.log("stop: "+(e.pageX) +", " +(e.pageY));
			note.dragstop = new Array(e.pageX, e.pageY);
			note.dragSend(nId, note.dragstart, note.dragstop);
		}
	});
	newNote.html(value);
	newNote.css("width",value.length * 10);
	newNote.css("z-index","0");
	
	newNote.appendTo($("#noteAll")).css({
		left:P[0],
		top:P[1]-36*note.counter
	});
	console.log(P[0]);
	console.log(P[1]-36*note.counter);
	note.counter = note.counter + 1;
}

note.createSend = function(P, value){
	var message = {};
	message.type = "noteCreate";
	message.P = P;
	message.value = value;
	var Jmessage = JSON.stringify(message);
	console.log("C->S: " + Jmessage);
	connection.sendMessage(Jmessage);
}

note.dragSend = function(id, start, stop){
	var message = {};
	message.type = "noteDrag";
	message.id = id;
	message.start = start;
	message.stop = stop;
	var Jmessage = JSON.stringify(message);
	console.log("C->S: " + Jmessage);
	connection.sendMessage(Jmessage);
}

note.move = function(id, start, stop){
	var nt = $("#"+id);
	var x = parseInt(nt.css("left"));
	x = x - start[0] + stop[0];
	var y = parseInt(nt.css("top"));
	y = y  - start[1] + stop[1];
	nt.css("left", x);
	nt.css("top", y);
}

note.getNoteList = function(from){
	var id = 0;
	var oneNote = $("#note"+id);
	var noteList = new Array();
	while(id != note.counter){
		noteList[id] = new Array( oneNote.html(), 
			new Array( parseInt(oneNote.css("left")), parseInt(oneNote.css("top"))) );
		id = id + 1;
		oneNote = $("#note"+id);
	}
	var message = {};
	message.type = "replyNote";
	message.to = from;
	message.noteList = noteList;
	message.num = note.counter;
	var Jmessage = JSON.stringify(message);
	console.log("C->S: " + Jmessage);
	connection.sendMessage(Jmessage);
}

note.drawAllNote = function(data){
	for(var i=0; i<data.num; i++){
		note.display(data.noteList[i][1],data.noteList[i][0]);
	}
}
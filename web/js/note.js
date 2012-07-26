/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function (document) {
    //Usage: $("#id").drag()
    $.fn.initNote = function () {
	var t = $(this);
	var idNote = t.attr("idNote");
	t.css("z-index",2);
	t.dblclick(function (event) {
	    var message = $("[idNote=" + idNote +"].noteMessage");
	    var cor = $("[idNote=" + idNote + "].noteMessageCor");
	    var corFloat = - 10 * 2;
	    var Rx = event.pageX - parseInt($(window).scrollLeft());
	    var Ry = event.pageY - parseInt($(window).scrollTop());
	    if(Ry < parseInt(message.css("height")) - corFloat + 5){
		cor.css("border-color"," transparent transparent #f3961c #f3961c");
		if(Rx < parseInt(message.css("width"))/2){
		    var x = event.pageX;
		    var y = event.pageY - corFloat + 5 ;
		    message.css({
			left:x,
			top:y
		    }).toggle();
		    cor.css({
			left:5,
			top:corFloat
		    })
		}
		else if(Rx > parseInt($(window).width()) - parseInt(message.css("width"))){
		    var x = event.pageX - parseInt(message.css("width"));
		    var y = event.pageY - corFloat + 5;
		    message.css({
			left:x,
			top:y
		    }).toggle();
		    cor.css({
			left:parseInt(message.css("width"))-5,
			top:corFloat
		    })
		}
		else{
		    var mid = parseInt(message.css("width")) / 4;
		    var x = event.pageX - mid;
		    var y = event.pageY - corFloat + 5;
		    message.css({
			left:x,
			top:y
		    }).toggle();
		    cor.css({
			left:mid,
			top:corFloat
		    })
		}
	    } 
	    else {
		cor.css("border-color","#f3961c #f3961c transparent transparent");
		if(Rx < parseInt(message.css("width"))/2){
		    var x = event.pageX;
		    var y = event.pageY + corFloat - 5 - parseInt(message.css("height"));
		    message.css({
			left:x,
			top:y
		    }).toggle();
		    cor.css({
			left:5,
			top: parseInt(message.css("height"))
		    })
		}
		else if(Rx > parseInt($(window).width()) - parseInt(message.css("width"))/2){
		    var x = event.pageX - parseInt(message.css("width"));
		    var y = event.pageY + corFloat - 5 - parseInt(message.css("height"));
		    message.css({
			left:x,
			top:y
		    }).toggle();
		    cor.css({
			left: parseInt(message.css("width")) - 5,
			top: parseInt(message.css("height"))
		    })
		}
		else{
		    var mid = parseInt(message.css("width")) / 4;
		    var x = event.pageX - mid;
		    var y = event.pageY + corFloat - 5 - parseInt(message.css("height"));
		    message.css({
			left:x,
			top:y
		    }).toggle();
		    cor.css({
			left:mid,
			top: parseInt(message.css("height"))
		    })
		}
	    }
	});
    }
})(document);

var note ={};

note.init = function(){
    $(".noteButton").initNote();
}

note.setNotePosition = function(note){
    var button = $("<div class='noteButton'>");
    var message = $("<div class='noteMessage'>");
    var cor = $("<div class='noteMessageCor'>");
    button.html("lallaa").appendTo($("#mainTable")).css({
	left:note.x,
	top:note.y
    });
    message.html(note.noteContext);
    message.appendTo($("#mainTable"));
    cor.appendTo(message);
    if(typeof(note.idRoomNote) != "undefined"){
	button.attr("idNote",note.idRoomNote);
	message.attr("idNote",note.idRoomNote);
	cor.attr("idNote", note.idRoomNote);
    } else {
	button.attr("idNote",note.idFileNote);
	message.attr("idNote",note.idFileNote);
	cor.attr("idNote", note.idFileNote);
    }
    //logg(newEle.attr("idFile"));
    button.initDrag();
    button.enableDrag();
    button.initNote();
}

note.sendNewNote = function(message, x, y){
    result = {};
    result.type = "NewNote";
    result.context = message;
    result.x = x;
    result.y = y;
    connection.sendMessage(JSON.stringify(result));
}

note.newNote = function(){
    $("#mainTable").one('click', function(event){
	var m = login.idRoom = prompt("输入内容");
	note.sendNewNote(m, event.pageX, event.pageY);
    });
}

note.clear = function(){
    $(".noteButton").remove();
    $(".noteMessage").remove();
    $(".noteMessageCor").remove();
}

$(document).ready(function () {
    note.init();
    $(".newTag").mouseup(function(event){
	note.newNote();
    })
})


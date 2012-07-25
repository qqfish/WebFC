/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function (document) {
    //Usage: $("#id").drag()  
    //Author: hooyes
    
    $.fn.initDrag = function (){
	$(this).attr("moving",0);
	$(this).attr("locking",1);
	$(this).attr("selfMove",0);
	//logg($(this).attr("idFile"));
    }
    
    $.fn.enableDrag = function () {
	var Rx, Ry;
	var t = $(this);
	t.attr("locking",0);
	t.css("z-index",2);
	t.mousedown(function (event) {
	    if(t.attr("locking") == 0 && t.attr("moving") == 0){
		Rx = event.pageX - (parseInt(t.css("left")) || 0);
		Ry = event.pageY - (parseInt(t.css("top")) || 0);
		t.css('cursor', 'move')
		drag.begin(t);
		t.attr("selfMove",1);
		if(t.attr("idFile") != "undefined"){
		    drag.sendBeginDrag(t.attr("idFile"), "file");
		}
	    }
	})
	.mouseup(function (event) {
	    if(t.attr("locking") == 0 && t.attr("moving") == 1 && t.attr("selfMove") == 1){
		t.attr("selfMove",0);
		drag.stop(t);
		if(t.attr("idFile") != "undefined"){
		    drag.sendStopDrag(t.attr("idFile"), "file");
		    drag.sendSaveDragFile(t.attr("idFile"), event.pageX - Rx, event.pageY - Ry, 0, "true")
		}
	    }
	});
	$(document).mousemove(function (event) {
	    if (t.attr("locking") == 0 && t.attr("moving") == 1 && t.attr("selfMove") == 1) {
		var x = event.pageX - Rx;
		var y = event.pageY - Ry
		drag.move(t, x, y);
		if(t.attr("idFile") != "undefined"){
		    drag.sendMoveDrag(t.attr("idFile"), x, y, "file")
		}
	    }
	});
    }
    
    $.fn.disableDrag = function(){
	var t = $(this)
	t.attr("locking", 1);
	//logg(this.locking);
	t.fadeTo(20, 1);
	t.css("z-index",1);
    }
})(document);

var drag = {};

drag.move = function(ele,x,y){
    ele.css({
	'top': y, 
	'left': x
    });
}

drag.stop = function(ele){
    ele.fadeTo(20, 1);
    ele.attr("moving",0);
}

drag.begin = function(ele){
    ele.css("position", "absolute").fadeTo(20, 0.5);
    ele.attr("moving",1);
}

drag.moveFile = function(idFile, x, y){
    drag.move($("[idFile=" + idFile + "].dragElement"), x, y);
}

drag.stopFile = function(idFile){
    drag.stop($("[idFile=" + idFile + "].dragElement"));
}

drag.beginFile = function(idFile){
    drag.begin($("[idFile=" + idFile + "].dragElement"));
}

drag.sendBeginDrag = function(id, element){
    var result = {};
    result.type = "dragMessage";
    result.movement = "begin";
    result.element = element;
    result.id = id;
    connection.sendMessage(JSON.stringify(result));
}

drag.sendStopDrag = function(id, element){
    var result = {};
    result.type = "dragMessage";
    result.movement = "stop";
    result.element = element;
    result.id = id;
    connection.sendMessage(JSON.stringify(result));
}

drag.sendMoveDrag = function(id, x, y, element){
    var result = {};
    result.type = "dragMessage";
    result.movement = "move";
    result.element = element;
    result.id = id;
    result.x = x;
    result.y = y;
    connection.sendMessage(JSON.stringify(result));
}

drag.sendSaveDragFile = function(id, x, y, rotate, onTable){
    var result = {};
    result.type = "dragMessage";
    result.movement ="save";
    result.id = id;
    result.x = x;
    result.y = y;
    result.rotate = rotate;
    result.onTable = onTable;
    connection.sendMessage(JSON.stringify(result));
}

drag.onmessage = function(message){
    if(message.movement == "begin"){
	if(message.element == "file"){
	    drag.beginFile(message.id);
	}
    }
    else if(message.movement == "stop"){
	if(message.element == "file"){
	    drag.stopFile(message.id);
	}
    }
    else if(message.movement == "move"){
	if(message.element == "file"){
	    drag.moveFile(message.id, message.x, message.y);
	}
    }
}

drag.setFilePosition = function(file){
    var r = "rotate(" + file.rotate + "deg";
    if(file.onTable){
	var newEle = $("<div class='dragElement'>")
	newEle.html(file.fileName).appendTo($("#mainTable")).css({
	    '-webkit-transform':r,
	    '-moz-transform':r
	})
	newEle.attr("idFile",file.idFile);
	logg(newEle.attr("idFile"));
	drag.moveFile(file.idFile, file.xFile, file.yFile);
	drag.initDrag();
	drag.enableDrag();
    }
}

drag.initDrag = function(){
    $(".dragElement").initDrag();
}

drag.enableDrag = function(){
    $(".dragElement").enableDrag();
}

drag.disableDrag = function(){
    $(".dragElement").disableDrag();
}

$(document).ready(function () {
    drag.initDrag();
    drag.enableDrag();
});

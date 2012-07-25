/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function (document) {
    //Usage: $("#id").drag()  
    //Author: hooyes
    
    $.fn.initDrag = function (){
	var element = this;
	element.moving = false;
	element.locking = true;	
	element.abcd = "asd";
    }
    
    $.fn.enableDrag = function () {
	var element = this;
	element.locking = false;
	element.moving = false;
	var Rx, Ry;
	var t = $(this);
	t.mousedown(function (event) {
	    logg(element.abcd);
	    if(!element.locking && !element.moving){
		Rx = event.pageX - (parseInt(t.css("left")) || 0);
		Ry = event.pageY - (parseInt(t.css("top")) || 0);
		t.css("position", "absolute").css('cursor', 'move').fadeTo(20, 0.5);
		element.moving = true;
	    }
	})
	.mouseup(function (event) {
	    if(!element.locking && element.moving){
		element.moving = false;
		t.fadeTo(20, 1);
	    }
	});
	$(document).mousemove(function (event) {
	    if (!element.locking && element.moving) {
		t.css({
		    top: event.pageY - Ry, 
		    left: event.pageX - Rx
		});
	    }
	});
    }
    
    $.fn.disableDrag = function(){
	this.locking = true;
	logg(this.locking);
	var t = $(this);
	t.fadeTo(20, 1);
    }
})(document);

var drag = {};

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
    drag.disableDrag();
});

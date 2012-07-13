/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(function() {
    //滑过显示,滑出隐藏
    $('#display').live('mouseenter',function (){
	$('#content').fadeIn();
    });
    $('#toolbox').live('mouseleave',function () {
	$('#content').fadeOut();
    });
		
    //点击
    $('.paint').click(function(){
	$('#content').hide();
	$('#paint').fadeIn();
    })
		
    $('.content').click(function(){
	$('#paint').hide();
	$('#content').fadeIn();
    })
		
    $('.filelist').click(function(){
	$('#filelist').load('',{
	    action:'file'
	});
    })
		
    $('.upload').click(function(){
	$('#toolbox').width('20%');
	$('#content').hide();
	$('#upload').fadeIn();
    })
		
    //拖动
    $( "#draggable" ).draggable({
	//appendTo: "body",
	//helper: "clone"
	})
		
    //droppable
    $("#droppable").droppable({
	accept:'.droppable'
    })
});

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var prestate = "#mainFunction"; //存储退出菜单时的状态，默认为主菜单
var toolbar = {};

$(document).ready(function() {
	$(window).resize(function(){
		toolbar.relocate();
	})
	$(window).scroll(function(){
		toolbar.relocate();
	})
	
	$('#saveDoodle').mousedown(function(){
        toolbox.type="saveDoodle";
        document.getElementById("canvasTemp").style.cursor="default";
    })
	$('#leaveRoom').mousedown(function(){
        toolbox.type="leaveRoom";
        document.getElementById("canvasTemp").style.cursor="default";
    })
	$('#addTag').mousedown(function(){
        toolbox.type="addTag";
        document.getElementById("canvasTemp").style.cursor="url('image/tag.png') 12 9,auto";
    })
	$('#clearElement').mousedown(function(){
        toolbox.type="clearElement";
        document.getElementById("canvasTemp").style.cursor="url('image/clearElement.png') 12 12,auto";
    })
	
	$('.uservideo').mousedown(function(e){
		if (toolbox.type=="clearElement"){
			$(this).fadeOut();
		}
	})
	$('.note').mousedown(function(e){
		if (toolbox.type=="clearElement"){
			$(this).fadeOut();
		}
	})
	
	$("#menuButton").click(function(){
		console.log("#menuButton is clicked");
		if($('#mainFunction').css('display') == "block"){
			$("#mainFunction").fadeOut();
			$("#userListFunction").fadeOut();
			$("#uploadArea").fadeOut();
			$("#fileListArea").fadeOut();
			prestate = "#mainFunction";
		}
		else if($('#paintFunction').css('display') == "block"){
			$("#paintFunction").fadeOut();
			prestate = "#paintFunction";
		}//其中 对于菜单栏的若干种情况 ， 还需要加入若干句 else if 
		else{
			$(prestate).fadeIn();
		}
	})
	
	$("#paintTools").click(function(){
		toolbox.type="paintTools";
         document.getElementById("canvasTemp").style.cursor="default";
		//隐藏主菜单
		$("#mainFunction").fadeOut();
		$("#userListFunction").fadeOut();
		$("#uploadArea").fadeOut();
		$("#fileListArea").fadeOut();
		//显示绘画工具菜单
		$("#paintFunction").fadeIn();
	})
	
	$("#pointer").click(function(){
		//显示主菜单
		$("#mainFunction").fadeIn();
		//隐藏绘画工具菜单
		$("#paintFunction").fadeOut();
	})
	
	$("#userList").click(function(){
		toolbox.type="userList";
         document.getElementById("canvasTemp").style.cursor="default";
		if($('#userListFunction').css('display') == "block"){
			$("#userListFunction").fadeOut();
		}
		else{
			$("#userListFunction").fadeIn();
		}
	})
	
	$("#uploadFile").click(function(){
		toolbox.type="uploadFile";
         document.getElementById("canvasTemp").style.cursor="default";
		if($('#uploadArea').css('display') == "block"){
			$("#uploadArea").fadeOut();
		}
		else{
			$("#uploadArea").fadeIn();
		}
	})
	
	$("#filelist").click(function(){
		toolbox.type="filelist";
         document.getElementById("canvasTemp").style.cursor="default";
		if($('#fileListArea').css('display') == "block"){
			$("#fileListArea").fadeOut();
		}
		else{
			$("#fileListArea").fadeIn();
		}
	})
});

toolbar.relocate = function(){
	var height = Math.abs(document.body.scrollTop);
	var width =Math.abs( document.body.scrollLeft);
	//window.status = document.documentElement.clientHeight + " " + document.body.scrollTop;
	$("#menuButton").css("top", height+20);
	$("#paintFunction").css("top", height+58);
	$("#mainFunction").css("top", height+58);
	$("#userListFunction").css("top", height+130);
	$("#colorArea").css("top", height+300);
	$("#lineWidthArea").css("top", height+325);
	$("#menuButton").css("left", width+20);
	$("#paintFunction").css("left", width+20);
	$("#mainFunction").css("left", width+20);
	$("#userListFunction").css("left", width+113);
	$("#colorArea").css("left", width+80);
	$("#lineWidthArea").css("left", width+80);
}

/*
function changeShowContent(id){
    $('#content').hide();
    $(id).fadeIn();
    $('#display').unbind('mouseenter')
    $('#toolbox').unbind('mouseleave')
    $('#display').bind('mouseenter',function (){
	$(id).fadeIn();
    });
    $('#toolbox').bind('mouseleave',function () {
	$(id).fadeOut();
    });
}

function restoreShowContent(id){
    $(id).hide();
    $('#content').fadeIn();
    $('#display').unbind('mouseenter');
    $('#toolbox').unbind('mouseleave');
    $('#display').bind('mouseenter',function (){
	$('#content').fadeIn();
    });
    $('#toolbox').bind('mouseleave',function () {
	$('#content').fadeOut();
    });
}

$(function() {
    var curContent = '#content';
    
    //滑过显示,滑出隐藏
    $('#display').bind('mouseenter',function (){
	$('#content').fadeIn();
    });
    $('#toolbox').bind('mouseleave',function () {
	$('#content').fadeOut();
    });
		
    //点击
    $('.paint').click(function(){
        curContent = '#paint';
        changeShowContent(curContent);
    })
		
    $('.content').click(function(){
	restoreShowContent(curContent);
        curContent = '#content';
    })
		
    $('.filelist').click(function(){
	curContent = '#filelist';
        changeShowContent(curContent);
    })
		
    $('.upload').click(function(){
	$('#toolbox').width('20%');
	curContent = '#upload';
        changeShowContent(curContent);
    })

    
});
*/
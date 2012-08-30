/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var prestate = "#mainFunction"; //存储退出菜单时的状态，默认为主菜单

$(document).ready(function() {
	$("#menuButton").click(function(){
		console.log("#menuButton is clicked");
		if($('#mainFunction').css('display') == "block"){
			$("#mainFunction").fadeOut();
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
		//隐藏主菜单
		$("#mainFunction").fadeOut();
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
		if($('#userListFunction').css('display') == "block"){
			$("#userListFunction").fadeOut();
		}
		else{
			$("#userListFunction").fadeIn();
		}
	})
});


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
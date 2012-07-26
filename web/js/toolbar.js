/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

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

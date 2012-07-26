/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

(function (document) {
    //Usage: $("#id").drag()    
    $.fn.enableOpenFile = function () {
	var t = $(this);
	t.dblclick(function (event) {
	    doodle.saveDoodle();
	    var result = {};
	    result.type = "requestOpenFile";
	    result.idFile = t.attr("idFile");
	    connection.sendMessage(JSON.stringify(result));
	});
    }
})(document);

var fileInfo = {};

fileInfo.init = function(){
    $("[idFile].dragElement").enableOpenFile();
}

fileInfo.addFile = function(data){
    var newEle = $("<li>")
    newEle.html(data.fileName).appendTo($("#filelist"));
    newEle.attr("idFile",data.idFile);
    
} 

$(document).ready(function () {
    fileInfo.init();
})


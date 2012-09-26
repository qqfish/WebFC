/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var currentFile = 0;

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
	fileList = data.fileList;
	currentFile = 0;
	for(var i=0; i <10; i++){
		$("#file"+i).html(null);
	}
	while(fileList[currentFile]){
		var fileOne = $("#file"+currentFile);
		fileOne.html(fileList[currentFile].fileName + "." + fileList[currentFile].fileType);
		fileOne.attr("idFile",fileList[currentFile].idFile);
		currentFile = currentFile + 1;
	}
}

$(document).ready(function () {
    fileInfo.init();
	
	$(".file").click(function(){
		var idFile = $(this).attr("idFile");
		console.log(idFile);
		fileInfo.sendDownloadRequest(idFile);
	})
})

fileInfo.sendDownloadRequest = function(idFile){
	var message = {};
	message.type = "downloadRequest";
	message.idFile = idFile;
	message.from = login.username;
	var Jmessage = JSON.stringify(message);
	console.log("C->S: " + Jmessage);
	connection.sendMessage(Jmessage);
}


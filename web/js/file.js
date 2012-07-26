/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var fileInfo = {};

fileInfo.addFile = function(data){
    var newEle = $("<li>")
    newEle.html(data.fileName).appendTo($("#filelist"));
    newEle.attr("idFile",file.idFile);
}

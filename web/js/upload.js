/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$("#progressbar").progressbar({
    value:0
});
$("#sub").attr("disabled",true);
    
$("#file").change(function(){
    if(this.files[0].size > 0 && this.files[0].size < 40*1024*1024)
	$("#sub").attr("disabled",false);
});
    
$("#sub").click(function(){
    $("#progressbar").progressbar("value",0);
    var s;
    var file = document.getElementById("file").files[0];
    var pos = file.name.lastIndexOf(".");
    var name = file.name.substring(0,pos);
    var type = file.name.substring(pos+1,file.name.length);
    var result = {};
    if (file.webkitSlice){
	var blob = file.webkitSlice();
    }
    else if (file.mozSlice){
	var blob = file.mozSlice();
    }
    var reader = new FileReader();
    reader.readAsBinaryString(blob);
    reader.onprogress = function updateProgress(evt){
	if (evt.lengthComputable){
	    var percentLoaded = Math.round((evt.loaded / evt.total) * 100);
	    if (percentLoaded < 100) {
		$("#progressbar").progressbar("value",percentLoaded);
	    }
	}
    }
    reader.onload = function loaded(evt) {
	$("#progressbar").progressbar("value",100);
	result.type = "uploadFile";
	result.name = name;
	result.Filetype = type;
	result.content = evt.target.result;
	logg(JSON.stringify(result));
	connection.sendMessage(JSON.stringify(result))
    }
});


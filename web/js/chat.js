var data={};
data.init = function()
{
    //data.type="ChatInformations";
    data.message="";
    data.color="#000000";
    var width=document.body.clientWidth;
    var height=document.body.clientHeight;
    var canvas=document.getElementById("canvas");
    var canvasTop=document.getElementById("canvasTop");	
    canvas.width=width-20;
    canvas.height=height-20;
    canvasTop.width=width-20;
    canvasTop.height=height-20;
}
data.init();
    $("#send").click(function(event){
        var z=document.getElementById("tab");
        var results = {};
        results.type = "ChatMessage";
        results.message = document.getElementById("input").value;
	connection.sendMessage(JSON.stringify(results));
	var T=document.getElementById("dialog");
	var x=T.insertRow(T.rows.length);
	if ((T.rows.length%2)!=0)
	    x.className="dia1";
	else
	    x.className="dia2";
	var y=x.insertCell(0);
	y.innerHTML="<a >"+document.getElementById("input").value+"</a>";
	var z=document.getElementById("tab");
	document.getElementById("input").value="";
	z.scrollTop=z.scrollHeight;
    });
    $("#chatButton").mouseenter(function(){
	$('#frame').fadeIn();
    });

    $("#canvasTop").mousedown(function(){
	$('#frame').fadeOut();
    });
    
    $(".namelist").mousedown(function(){
	document.getElementById("input").value="To "+event.srcElement.name+":";
    });
    $("#colors").change(
	function(){
	    var selectType=document.getElementById("colors");
	    switch (selectType.selectedIndex)
	    {
		case 0:
		    data.color="#000000";
		    break;
		case 1:
		    data.color="#FF0000";
		    break;
		case 2:
		    data.color="#0000FF";
		    break;
		default:
		    data.color="#000000";
	    }
	});
        
        

data.sendMessage = function(){
    var T=document.getElementById("dialog");
    var x=T.insertRow(T.rows.length);
    if ((T.rows.length%2)!=0)
	x.className="dia1";
    else 
	x.className="dia2";
    var y=x.insertCell(0);
    y.innerHTML="<a style=\"color:"+dialog.color+"\">"+message.data+"</a>";
    var z=document.getElementById("tab");
    z.scrollTop=z.scrollHeight;
    document.getElementById("input").value="";
}

data.writeMessage = function(message){
    
}

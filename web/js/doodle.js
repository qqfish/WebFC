//here announce some variables
/*type=0 means use pen to draw
*type=1 means draw rectangle
*type=2 means draw circle
*type=3 means write text
*type=4 means draw straight line
*type=5 means use pointer and not draw
*/



var doodle = {};

doodle.init = function(){
    
    
    
    
    //here initial the size of canvas
    doodle.canvas=document.getElementById("canvas");
    doodle.canvasTop=document.getElementById("canvasTop");
    doodle.context=doodle.canvas.getContext("2d");
    doodle.contextTop=doodle.canvasTop.getContext("2d");
    var width=$(window).width();
    var height=$(window).height();
    doodle.canvas.width=width-20;
    doodle.canvas.height=height-20;
    doodle.canvasTop.width=width-20;
    doodle.canvasTop.height=height-20;
    //the initialize of canvas have down
    doodle.mulClick = {};
    doodle.mulClick.init = function(){
	doodle.mulClick.mulClickX=new Array();
	doodle.mulClick.mulClickY=new Array();
	doodle.mulClick.mulClickDrag=new Array();
    }
    doodle.mulClick.init();
    doodle.recClick = {};
    doodle.recClick.init = function(){
	doodle.recClick.recA=new Array(0,0);
	doodle.recClick.recB=new Array(0,0);
    }
    doodle.recClick.init();
    doodle.drawRec=0;
    doodle.paint;
    doodle.touchable = 'createTouch' in document;
    doodle.type=5;
    doodle.context.strokeStyle="#cb3594";
    doodle.context.lineJoin = "round";
    doodle.context.lineWidth = 4;
    doodle.contextTop.strokeStyle="#cb3594";
    doodle.contextTop.lineJoin = "round";
    doodle.contextTop.lineWidth = 4;
    
    //here start the touch model
    doodle.onBegin();
//start have done
}
    
    
//here deal with the operations in touch
$('#canvasTop').mousedown(function(e){    
    //alert((e.pageX - this.offsetLeft)+" "+(e.pageY - this.offsetTop));
    if (doodle.type==5)
	doodle.paint = false;
    else doodle.paint=true;
    doodle.mulClick.mulClickX[0]=new Array();
    doodle.mulClick.mulClickY[0]=new Array();
    doodle.mulClick.mulClickDrag[0]=new Array();
    if (doodle.type==0)
    {
	doodle.addClick(0,e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	doodle.sendReDraw(0, doodle.mulClick);
	doodle.redraw(0, doodle.mulClick); 
    }
    if (doodle.type==1||doodle.type==2||doodle.type==3||doodle.type==4){
	doodle.recClick.recA.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
	doodle.recClick.recB.splice(0,2,doodle.recClick.recA[0],doodle.recClick.recA[1]);
    }
});
$('#canvasTop').mousemove(function(e){
    if(doodle.paint)
    {
	switch (doodle.type){
	    case 0:
		doodle.addClick(0,e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		doodle.sendReDraw(0, doodle.mulClick);
		doodle.redraw(0, doodle.mulClick);
		break;
	    case 1:
		doodle.context.clearRect(0,0,doodle.canvas.width,doodle.canvas.height);
		doodle.context.beginPath();
		DrawRect(doodle.context,new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]),new Array(e.pageX - this.offsetLeft,e.pageY - this.offsetTop));
		doodle.context.closePath();
		doodle.context.stroke();
		doodle.recClick.recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
		break;
	    case 2:
		doodle.context.clearRect(0,0,doodle.canvas.width,doodle.canvas.height);
		doodle.context.beginPath();
		doodle.recClick.recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
		DrawCircle(doodle.context,new Array((doodle.recClick.recA[0]+doodle.recClick.recB[0])/2,(doodle.recClick.recA[1]+doodle.recClick.recB[1])/2),ABLen(new Array(doodle.recClick.recB[0],doodle.recClick.recB[1]),new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]))/2);
		doodle.context.closePath();
		doodle.context.stroke();
		break;
	    case 3:
		break;
	    case 4:
		doodle.context.clearRect(0,0,doodle.canvas.width,doodle.canvas.height);
		doodle.context.beginPath();
		doodle.recClick.recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
		DrawLine(doodle.context,new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]),new Array(e.pageX - this.offsetLeft,e.pageY - this.offsetTop));
		doodle.context.closePath();
		doodle.context.stroke();
		break;
	    default:
	}
    }
});
			
$('#canvasTop').mouseup(function(e){
    doodle.context.clearRect(0,0,doodle.canvas.width,doodle.canvas.height);
    doodle.paint = false;
    doodle.recClick.recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
    if (doodle.type==3)
    {
	doodle.contextTop.fillText(prompt("Input the Text"),e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
    }
    else if(doodle.type > 0)
    {
	doodle.sendDrawShape(doodle.type, doodle.recClick);
	doodle.drawToCanvasGraph(doodle.type, doodle.recClick);
    }
			    
});

$('#canvasTop').mouseleave(function(e){
    doodle.paint = false;
});


//here rewrite the change mode
$('#usePointer').click(function(){
    doodle.type=5;
    document.getElementById("canvasTop").style.cursor="default";
    drag.enableDrag();
});
$('#usePen').click(function(){
    doodle.type=0;
    document.getElementById("canvasTop").style.cursor="crosshair";
    drag.disableDrag();
});
$('#drawRec').click(function(){
    doodle.type=1;
    document.getElementById("canvasTop").style.cursor="crosshair";
    drag.disableDrag();
});
$('#drawCircle').click(function(){
    doodle.type=2;
    document.getElementById("canvasTop").style.cursor="crosshair";
    drag.disableDrag();
});
$('#drawWord').click(function(){
    doodle.type=3;
    document.getElementById("canvasTop").style.cursor="text";
    drag.disableDrag();
});
$('#drawLine').click(function(){
    doodle.type=4;
    document.getElementById("canvasTop").style.cursor="crosshair";
    drag.disableDrag();
});
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
$("button#clearButton").click(
    function (){
	/*context.save();
		    c.width=c.width;
			context.restore();*/
	doodle.contextTop.clearRect(0,0,doodle.canvasTop.width,doodle.canvasTop.height);
    }
    );
$("#Colors").change(
    function (){
	var selectColor=document.getElementById("Colors");
	switch (selectColor.selectedIndex)
	{
	    case 0:
		doodle.contextTop.strokeStyle="#cb3594";
		doodle.context.strokeStyle="#cb3594";
		break;
	    case 1:
		doodle.contextTop.strokeStyle="#659b41";
		doodle.context.strokeStyle="#659b41";
		break;
	    case 2:
		doodle.contextTop.strokeStyle="#ffcf33";
		doodle.context.strokeStyle="#ffcf33";
		break;
	    case 3:
		doodle.contextTop.strokeStyle="#986928";
		doodle.context.strokeStyle="#986928";
		break;
	    case 4:
		doodle.contextTop.strokeStyle="#FFFFFF";
		doodle.context.strokeStyle="#FFFFFF";
		break;
	    default:
		doodle.contextTop.strokeStyle="#cb3594";
		doodle.context.strokeStyle="#cb3594";		
	}
    }
    );
$("#Sizes").change(
    function (){
	var selectSize=document.getElementById("Sizes");
	switch (selectSize.selectedIndex)
	{
	    case 0:
		doodle.contextTop.lineWidth=4;
		doodle.context.lineWidth=4;
		break;
	    case 1:
		doodle.contextTop.lineWidth=7;
		doodle.context.lineWidth=7;
		break;
	    case 2:
		doodle.contextTop.lineWidth=10;
		doodle.context.lineWidth=10;
		break;
	    case 3:
		doodle.contextTop.lineWidth=15;
		doodle.context.lineWidth=15;
		break;
	    default:
		doodle.contextTop.lineWidth=4;
		doodle.context.lineWidth=4;		
	}
    }
    );
$("#Type").change(
    function (){
	var selectType=document.getElementById("Type");
	switch (selectType.selectedIndex)
	{
	    case 0:
		doodle.type=0;
		break;
	    case 1:
		doodle.type=1;
		break;
	    case 2:
		doodle.type=2;
		break;
	    case 3:
		doodle.type=3;
		break;
	    default:
		doodle.type=0;		
	}
    }
    );


doodle.onBegin = function(){
    if (doodle.touchable) {
	doodle.canvasTop.addEventListener('touchstart', doodle.onTouchStart, false);
	doodle.canvasTop.addEventListener('touchmove', doodle.onTouchMove, false);
	doodle.canvasTop.addEventListener('touchend', doodle.onTouchEnd, false); 
    }
}

doodle.onClose = function(){
    
    }
    
doodle.changeColor = function(color){
    
    }

doodle.changeShape = function(shape){
    
    }

//here deal with the operation in drawing the canvas
doodle.addClick = function(i, x, y, dragging){
    doodle.mulClick.mulClickX[i].push(x);
    doodle.mulClick.mulClickY[i].push(y);
    doodle.mulClick.mulClickDrag[i].push(dragging);
}

//here deal with the operations in Click


////////////////////////////////////////
var showTool={};
showTool.x1=new Array();
showTool.x2=new Array();
showTool.show=true;
showTool.hide=true;
/////////////////////////////////////////
doodle.onTouchStart = function(event) {
    if (event.touches.length!=2){
	showTool.show=false;
	showTool.hide=false;
    }        
    else {
	showTool.show=true;
	showTool.hide=true;
    }
    if (doodle.type==5)
	doodle.paint = false;
    else doodle.paint=true;
    for (i=0;i<event.touches.length;i++){
	if (doodle.type==1||doodle.type==2||doodle.type==4)
	{
	    if (event.touches.length==2)
	    {
		doodle.drawRec=1;
		doodle.recClick.recA.splice(0,2,event.touches[0].pageX - this.offsetLeft, event.touches[0].pageY - this.offsetTop);
		doodle.recClick.recB.splice(0,2,event.touches[1].pageX - this.offsetLeft, event.touches[1].pageY - this.offsetTop);
	    }
	}
	if (doodle.type==0)
	{
	    doodle.mulClick.mulClickX[i]=new Array();
	    doodle.mulClick.mulClickY[i]=new Array();
	    doodle.mulClick.mulClickDrag[i]=new Array();
	    doodle.addClick(i,event.touches[i].pageX - this.offsetLeft, event.touches[i].pageY - this.offsetTop);
	    doodle.sendReDraw(i, doodle.mulClick);
	    doodle.redraw(i, doodle.mulClick);
	}
	if (doodle.type==3)
	{
	    doodle.context.fillText(prompt("Input the Text"),event.touches[0].pageX - this.offsetLeft, event.touches[0].pageY - this.offsetTop);
	}
    }
}



doodle.onTouchMove = function(event) {
    // Prevent the browser from doing its default thing (scroll, zoom)
    event.preventDefault();
    if(doodle.paint){
	for (i=0;i<event.touches.length;i++){	
	    if (doodle.type==1||doodle.type==2||doodle.type==4)
	    { 
		doodle.context.clearRect(0,0,doodle.canvas.width,doodle.canvas.height);
		doodle.context.beginPath();
		doodle.recClick.recA.splice(0,2,event.touches[0].pageX - this.offsetLeft, event.touches[0].pageY - this.offsetTop);
		doodle.recClick.recB.splice(0,2,event.touches[1].pageX - this.offsetLeft, event.touches[1].pageY - this.offsetTop);
		switch (doodle.type){
		    case 1:
			DrawRect(doodle.context,new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]),new Array(doodle.recClick.recB[0],doodle.recClick.recB[1]));
			break;
		    case 2:
			DrawCircle(doodle.context,new Array((doodle.recClick.recA[0]+doodle.recClick.recB[0])/2,(doodle.recClick.recA[1]+doodle.recClick.recB[1])/2),ABLen(new Array(doodle.recClick.recB[0],doodle.recClick.recB[1]),new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]))/2);
			break;
		    case 4:
			DrawLine(doodle.context,new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]),new Array(doodle.recClick.recB[0],doodle.recClick.recB[1]));
			break;
		    default:
		}
		doodle.context.closePath();
		doodle.context.stroke();
	    }				
	    if (doodle.type==0)
	    {			
		doodle.addClick(i,event.touches[i].pageX - this.offsetLeft, event.touches[i].pageY - this.offsetTop,true);
		doodle.sendReDraw(i, doodle.mulClick);
		doodle.redraw(i, doodle.mulClick);
	    }    
	    showTool.x1.push(event.touches[0].pageX - this.offsetLeft);
	    showTool.x2.push(event.touches[1].pageX - this.offsetLeft);
	}
    }
}


doodle.onTouchEnd = function(event) {
    /*showTool.flag=true;
    if (showTool.X[0]<document.getElementById('canvasTop').width-20)
        showTool.flag=false;
    for (var i=1;i<showTool.X.length;i++){
        if (showTool.X[i]>showTool.X[i-1]){
            showTool.flag=false;
        }
        showTool.X=[];
    }
    if (showTool.flag){
        $('#content').fadeIn();
    }*/
    for (var i=1;i<showTool.x1.length;i++){
	if (showTool.x1[i]>showTool.x1[i-1]){
	    showTool.show=false;
	}
    }
    for (var i=1;i<showTool.x1.length;i++){
	if (showTool.x1[i]<showTool.x1[i-1]){
	    showTool.hide=false;
	}
    }
    for (var i=1;i<showTool.x2.length;i++){
	if (showTool.x2[i]>showTool.x2[i-1]){
	    showTool.show=false;
	}
    }
    for (var i=1;i<showTool.x2.length;i++){
	if (showTool.x2[i]<showTool.x2[i-1]){
	    showTool.hide=false;
	}
    }
    showTool.x1=[];
    showTool.x2=[];
    if (showTool.show){
	$('#paint').fadeOut();
	$('#content').fadeIn();
    }
    if (showTool.hide){
	$('#paint').fadeOut();
	$('#content').fadeOut();
    }
    ////////////////////////////////////
    doodle.context.clearRect(0,0,doodle.canvasTop.width,doodle.canvasTop.height);
    if (doodle.type==3)
    {
	doodle.contextTop.fillText(prompt("Input the Text"),e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
    }else
    if (doodle.drawRec==1)
    {
	doodle.sendDrawShape(doodle.type, doodle.recClick);
	doodle.drawToCanvasGraph(doodle.type, doodle.recClick);
    }
    doodle.paint=false;
    doodle.drawRec=0;
}
		


doodle.redraw = function(index, click){
    var flag=true;//if flag==true means the toolbar will appear
    for(var i=0; i < click.mulClickX[index].length; i++)
    {
	doodle.contextTop.beginPath();
	if(click.mulClickDrag[index][i] && i)
	{
	    doodle.contextTop.moveTo(click.mulClickX[index][i-1], click.mulClickY[index][i-1]);
	}else
	{
	    doodle.contextTop.moveTo(click.mulClickX[index][i]-1, click.mulClickY[index][i]);
	}
	doodle.contextTop.lineTo(click.mulClickX[index][i], click.mulClickY[index][i]);
	doodle.contextTop.closePath();
	doodle.contextTop.stroke();
    }
}

//here deal with the transfering
doodle.drawToCanvasGraph = function(index,shapeClick)
{
    doodle.contextTop.beginPath();
    switch (index){
	case 1:
	    DrawRect(doodle.contextTop,new Array(shapeClick.recA[0],shapeClick.recA[1]),new Array(shapeClick.recB[0],shapeClick.recB[1]));
	    break;
	case 2:
	    DrawCircle(doodle.contextTop,new Array((shapeClick.recA[0]+shapeClick.recB[0])/2,(shapeClick.recA[1]+shapeClick.recB[1])/2),ABLen(new Array(shapeClick.recB[0],shapeClick.recB[1]),new Array(shapeClick.recA[0],shapeClick.recA[1]))/2);
	    break;
	case 4:
	    DrawLine(doodle.contextTop,new Array(shapeClick.recA[0],shapeClick.recA[1]),new Array(shapeClick.recB[0],shapeClick.recB[1]));
	    break;
	default:
    }
    doodle.contextTop.closePath();
    doodle.contextTop.stroke();
}


doodle.sendReDraw = function (index, click){
    var tmp = click;
    tmp.type = "doodleTable";
    tmp.drawElement = "freeDraw";
    tmp.index = index;
    connection.sendMessage(JSON.stringify(tmp));
//logg(JSON.stringify(tmp));
}

doodle.clear = function(){
    doodle.contextTop.clearRect(0,0,doodle.canvasTop.width,doodle.canvasTop.height);
}

doodle.sendDrawShape = function(index, shapeClick)
{
    var tmp = shapeClick;
    tmp.type = "doodleTable";
    tmp.drawElement = "shape";
    tmp.index = index;
    connection.sendMessage(JSON.stringify(tmp));    
}

doodle.getDoodlePic = function(request){
    var result = {};
    result.type = "doodlePic";
    var data = doodle.canvasTop.toDataURL();
    //var b64 = data.substring( 22 ); 
    result.data = data;
    result.to = request.from;
    result.usage = request.usage;
    return JSON.stringify(result);
}

doodle.restorePic = function(data){
    var image = new Image();
    image.src = data;
    image.onload = function(){
	doodle.contextTop.drawImage(image,0,0);
    }
}

doodle.saveDoodle = function(){
    var result = {};
    result.type = "doodlePic";
    result.usage = "saveDoodle";
    result.data = doodle.canvasTop.toDataURL();
    connection.sendMessage(JSON.stringify(result));
}


doodle.init();
/*
window.addEventListener("resize",resize,true);
function resize(){
    //here context.save() and context.restore() are valid and I hava no idea why this happen
    var canvas=document.getElementById("canvas");
    var canvasTop=document.getElementById("canvasTop");
    var context=canvas.getContext("2d");
    var contextTop=canvas.getContext("2d");
    context.save();
    contextTop.save();
    var width=document.body.clientWidth;
    var height=document.body.clientHeight;
    canvas.width=width-20;
    canvas.height=height-20;
    canvasTop.width=width-20;
    canvasTop.height=height-20;
    context.restore();
    contextTop.restore();
}*/
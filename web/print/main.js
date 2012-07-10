//here announce some variables
var c=document.getElementById("canvas");
var context=c.getContext("2d");
var c2=document.getElementById("canvasTop");
var context2=c2.getContext("2d");
var mulClickX=new Array();
var mulClickY=new Array();
var mulClickDrag=new Array();
var paint;
var touchable = 'createTouch' in document;
var type=0;
var recA=new Array(0,0);
var recB=new Array(0,0);
var drawRec=0;
context.strokeStyle="#cb3594";
context.lineJoin = "round";
context.lineWidth = 4;
context2.strokeStyle="#cb3594";
context2.lineJoin = "round";
context2.lineWidth = 4;
if (touchable) {
    c2.addEventListener('touchstart', onTouchStart, false);
    c2.addEventListener('touchmove', onTouchMove, false);
    c2.addEventListener('touchend', onTouchEnd, false);
}


//here deal with the operations in Click
function onTouchStart(event) {
    //do stuff
    paint=true;
    for (i=0;i<event.touches.length;i++){
	if (type==1||type==2)
	{
	    if (event.touches.length==2)
	    {
		drawRec=1;
		recA.splice(0,2,event.touches[0].pageX - this.offsetLeft, event.touches[0].pageY - this.offsetTop);
		recB.splice(0,2,event.touches[1].pageX - this.offsetLeft, event.touches[1].pageY - this.offsetTop);
	    }
	}
	if (type==0)
	{
	    mulClickX[i]=new Array();
	    mulClickY[i]=new Array();
	    mulClickDrag[i]=new Array();
	    addClick(i,event.touches[i].pageX - this.offsetLeft, event.touches[i].pageY - this.offsetTop);
	    redraw(i);
	}
	if (type==3)
	{
	    context.fillText(prompt("Input the Text"),event.touches[0].pageX - this.offsetLeft, event.touches[0].pageY - this.offsetTop);
	}
    }
}

function onTouchMove(event) {
    // Prevent the browser from doing its default thing (scroll, zoom)
    //e.preventDefault();
    event.preventDefault();
    if(paint){
	for (i=0;i<event.touches.length;i++){	
	    /*if (type==1||type==2)
				{
				    if (drawRec==1)
					{
					    recA.splice(0,2,event.touches[0].pageX - this.offsetLeft, event.touches[0].pageY - this.offsetTop);
					    recB.splice(0,2,event.touches[1].pageX - this.offsetLeft, event.touches[1].pageY - this.offsetTop);
					}
				    //do nothing
				}*/
	    if (type==1||type==2)
	    { 
		/*var oldStrokeStyle=context.strokeStyle;
				    context.strokeStyle="FFFFFF";
				    context.beginPath();
					if (type==1)
					{
      				    DrawRect(context,new Array(recA[0],recA[1]),new Array(recB[0],recB[1]));
				    }
					if (type==2)
					{
					    DrawCircle(context,new Array((recA[0]+recB[0])/2,(recA[1]+recB[1])/2),ABLen(new Array(recB[0],recB[1]),new Array(recA[0],recA[1]))/2);
					}
					context.closePath();
				    context.stroke();
				    context.strokeStyle=oldStrokeStyle;
					context.restore();
					context.save();*/
		context.clearRect(0,0,c.width,c.hegith);
		context.beginPath();
		recA.splice(0,2,event.touches[0].pageX - this.offsetLeft, event.touches[0].pageY - this.offsetTop);
		recB.splice(0,2,event.touches[1].pageX - this.offsetLeft, event.touches[1].pageY - this.offsetTop);
		if (type==1)
		{
		    DrawRect(context,new Array(recA[0],recA[1]),new Array(recB[0],recB[1]));
		}
		if (type==2)
		{
		    DrawCircle(context,new Array((recA[0]+recB[0])/2,(recA[1]+recB[1])/2),ABLen(new Array(recB[0],recB[1]),new Array(recA[0],recA[1]))/2);
		}
		context.closePath();
		context.stroke();
	    }				
	    if (type==0)
	    {			
		addClick(i,event.touches[i].pageX - this.offsetLeft, event.touches[i].pageY - this.offsetTop,true);
		redraw(i);
	    }
	}
    }
}

function onTouchEnd(event) {
    if (drawRec==1)
    {
	context.beginPath();
	if (type==1)
	{
	    context.clearRect(0,0,c2.width,c2.height);
	    DrawRect(context2,new Array(recA[0],recA[1]),new Array(recB[0],recB[1]));
	}
	if (type==2)
	{
	    context.clearRect(0,0,c2.width,c2.height);
	    DrawCircle(context2,new Array((recA[0]+recB[0])/2,(recA[1]+recB[1])/2),ABLen(new Array(recB[0],recB[1]),new Array(recA[0],recA[1]))/2);
	}
	context2.closePath();
	context2.stroke();
    }
    paint=false;
    drawRec=0;
}
		
//here deal with the operations in touch
$('#canvasTop').mousedown(function(e){    
    //alert((e.pageX - this.offsetLeft)+" "+(e.pageY - this.offsetTop));
    e.preventDefault();
    paint = true;
    mulClickX[0]=new Array();
    mulClickY[0]=new Array();
    mulClickDrag[0]=new Array();
    if (type==1||type==2)
    {
	//context.save();
	recA.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
	recB.splice(0,2,recA[0],recA[1]);
    }
    if (type==0)
    {
	addClick(0,e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	redraw(0); 
    }
    if (type==3)
    {
	recA.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
	recB.splice(0,2,recA[0],recA[1]);
    }
});
$('#canvasTop').mousemove(function(e){
    if(paint)
    {
	if (type==1)
	{
	    //var oldStrokeStyle=context.strokeStyle;
	    //context.strokeStyle="FFFFFF";
	    //context.beginPath();
	    //DrawRect(context,new Array(recA[0],recA[1]),new Array(recB[0],recB[1]));
	    context.clearRect(0,0,c.width,c.height);
	    //context.closePath()5;
	    //context.stroke();
	    //context.strokeStyle=oldStrokeStyle;
	    //context.restore();
	    //context.save();
	    context.beginPath();
	    DrawRect(context,new Array(recA[0],recA[1]),new Array(e.pageX - this.offsetLeft,e.pageY - this.offsetTop));
	    context.closePath();
	    context.stroke();
	    recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);		
	}
	if (type==2)
	{
	    //var oldStrokeStyle=context.strokeStyle;
	    //context.strokeStyle="FFFFFF";
	    //context.beginPath();
	    //DrawCircle(context,new Array((recA[0]+recB[0])/2,(recA[1]+recB[1])/2),ABLen(new Array(recB[0],recB[1]),new Array(recA[0],recA[1]))/2);
	    context.clearRect(0,0,c.width,c.height);
	    //context.closePath();
	    //context.stroke();
	    //context.strokeStyle=oldStrokeStyle;
	    //context.restore();
	    //context.save();
	    context.beginPath();
	    recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
	    DrawCircle(context,new Array((recA[0]+recB[0])/2,(recA[1]+recB[1])/2),ABLen(new Array(recB[0],recB[1]),new Array(recA[0],recA[1]))/2);
	    context.closePath();
	    context.stroke();	
	}
	if (type==0)
	{
	    addClick(0,e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
	    redraw(0);
	}
    }
});
			
$('#canvasTop').mouseup(function(e){
    context.clearRect(0,0,c.width,c.height);
    paint = false;
    context2.beginPath();
    recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
    if (type==1)
    {
	DrawRect(context2,new Array(recA[0],recA[1]),new Array(recB[0],recB[1]));
    //DrawRect(context2,new Array(recA[0],recA[1]),new Array(recB[0],recB[1]));
    //drawToCanvasGraph(1,recA,recB);
    //context2.clearRect(0,0,c2.width,c2.height);
    }
    if (type==2)
    {
	DrawCircle(context2,new Array((recA[0]+recB[0])/2,(recA[1]+recB[1])/2),ABLen(new Array(recB[0],recB[1]),new Array(recA[0],recA[1]))/2);
    //DrawCircle(context2,new Array((recA[0]+recB[0])/2,(recA[1]+recB[1])/2),ABLen(new Array(recB[0],recB[1]),new Array(recA[0],recA[1]))/2);
    //drawToCanvasGraph(2,recA,recB);
    //context2.clearRect(0,0,c2.width,c2.height);
    }
    context2.closePath();
    context2.stroke();
    if (type==3)
    {
	context2.fillText(prompt("Input the Text"),e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
    }
			    
});

$('#canvasTop').mouseleave(function(e){
    paint = false;
});
//here deal with the operation in drawing the canvas
function addClick(i, x, y, dragging)
{
    mulClickX[i].push(x);
    mulClickY[i].push(y);
    mulClickDrag[i].push(dragging);
}

function redraw(index)
{
    for(var i=0; i < mulClickX[index].length; i++)
    {
	context2.beginPath();
	if(mulClickDrag[index][i] && i)
	{
	    context2.moveTo(mulClickX[index][i-1], mulClickY[index][i-1]);
	}else
	{
	    context2.moveTo(mulClickX[index][i]-1, mulClickY[index][i]);
	}
	context2.lineTo(mulClickX[index][i], mulClickY[index][i]);
	context2.closePath();
	context2.stroke();
    }
}
$("button#clearButton").click(
    function (){
	/*context.save();
		    c.width=c.width;
			context.restore();*/
	context2.clearRect(0,0,c2.width,c2.height);
    }
    );
$("#Colors").change(
    function (){
	var selectColor=document.getElementById("Colors");
	switch (selectColor.selectedIndex)
	{
	    case 0:
		context2.strokeStyle="#cb3594";
		context.strokeStyle="#cb3594";
		break;
	    case 1:
		context2.strokeStyle="#659b41";
		context.strokeStyle="#659b41";
		break;
	    case 2:
		context2.strokeStyle="#ffcf33";
		context.strokeStyle="#ffcf33";
		break;
	    case 3:
		context2.strokeStyle="#986928";
		context.strokeStyle="#986928";
		break;
	    case 4:
		context2.strokeStyle="#FFFFFF";
		context.strokeStyle="#FFFFFF";
		break;
	    default:
		context2.strokeStyle="#cb3594";
		context.strokeStyle="#cb3594";		
	}
    }
    );
$("#Sizes").change(
    function (){
	var selectSize=document.getElementById("Sizes");
	switch (selectSize.selectedIndex)
	{
	    case 0:
		context2.lineWidth=4;
		context.lineWidth=4;
		break;
	    case 1:
		context2.lineWidth=7;
		context.lineWidth=7;
		break;
	    case 2:
		context2.lineWidth=10;
		context.lineWidth=10;
		break;
	    case 3:
		context2.lineWidth=15;
		context.lineWidth=15;
		break;
	    default:
		context2.lineWidth=4;
		context.lineWidth=4;		
	}
    }
    );
$("#Type").change(
    function (){
	var selectType=document.getElementById("Type");
	switch (selectType.selectedIndex)
	{
	    case 0:
		type=0;
		break;
	    case 1:
		type=1;
		break;
	    case 2:
		type=2;
		break;
	    case 3:
		type=3;
		break;
	    default:
		type=0;		
	}
    }
    );
//here deal with the transfering
function drawToCanvasGraph(index,recA,recB)
{
    context.beginPath();
    if (index==1)
    {
	DrawRect(context,new Array(recA[0],recA[1]),new Array(recB[0],recB[1]));
    }
    if (index==2)
    {
	DrawCircle(context,new Array((recA[0]+recB[0])/2,(recA[1]+recB[1])/2),ABLen(new Array(recB[0],recB[1]),new Array(recA[0],recA[1]))/2);
    }
    context.closePath();
    context.stroke();
}
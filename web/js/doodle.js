//here announce some variables

var doodle = {};

doodle.init = function(){
    
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
    doodle.c=document.getElementById("canvas");
    doodle.context=doodle.c.getContext("2d");
    doodle.c2=document.getElementById("canvasTop");
    doodle.context2=doodle.c2.getContext("2d");

    doodle.paint;
    doodle.touchable = 'createTouch' in document;
    doodle.type=0;
    doodle.context.strokeStyle="#cb3594";
    doodle.context.lineJoin = "round";
    doodle.context.lineWidth = 4;
    doodle.context2.strokeStyle="#cb3594";
    doodle.context2.lineJoin = "round";
    doodle.context2.lineWidth = 4;
    
    
    
    //here deal with the operations in touch
    $('#canvasTop').mousedown(function(e){    
	//alert((e.pageX - this.offsetLeft)+" "+(e.pageY - this.offsetTop));
	e.preventDefault();
	doodle.paint = true;
	doodle.mulClick.mulClickX[0]=new Array();
	doodle.mulClick.mulClickY[0]=new Array();
	doodle.mulClick.mulClickDrag[0]=new Array();
	if (doodle.type==1||doodle.type==2)
	{
	    //context.save();
	    doodle.recClick.recA.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
	    doodle.recClick.recB.splice(0,2,doodle.recClick.recA[0],doodle.recClick.recA[1]);
	}
	if (doodle.type==0)
	{
	    doodle.addClick(0,e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
	    doodle.sendReDraw(0, doodle.mulClick);
	    doodle.redraw(0, doodle.mulClick); 
	}
	if (doodle.type==3)
	{
	    doodle.recClick.recA.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
	    doodle.recClick.recB.splice(0,2,doodle.recClick.recA[0],doodle.recClick.recA[1]);
	}
    });
    $('#canvasTop').mousemove(function(e){
	if(doodle.paint)
	{
	    if (doodle.type==1)
	    {
		//var oldStrokeStyle=context.strokeStyle;
		//context.strokeStyle="FFFFFF";
		//context.beginPath();
		//DrawRect(context,new Array(recA[0],recA[1]),new Array(recB[0],recB[1]));
		doodle.context.clearRect(0,0,doodle.c.width,doodle.c.height);
		//context.closePath()5;
		//context.stroke();
		//context.strokeStyle=oldStrokeStyle;
		//context.restore();
		//context.save();
		doodle.context.beginPath();
		DrawRect(doodle.context,new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]),new Array(e.pageX - this.offsetLeft,e.pageY - this.offsetTop));
		doodle.context.closePath();
		doodle.context.stroke();
		doodle.recClick.recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);		
	    }
	    if (doodle.type==2)
	    {
		//var oldStrokeStyle=context.strokeStyle;
		//context.strokeStyle="FFFFFF";
		//context.beginPath();
		//DrawCircle(context,new Array((recA[0]+recB[0])/2,(recA[1]+recB[1])/2),ABLen(new Array(recB[0],recB[1]),new Array(recA[0],recA[1]))/2);
		doodle.context.clearRect(0,0,doodle.c.width,doodle.c.height);
		//context.closePath();
		//context.stroke();
		//context.strokeStyle=oldStrokeStyle;
		//context.restore();
		//context.save();
		doodle.context.beginPath();
		doodle.recClick.recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
		DrawCircle(doodle.context,new Array((doodle.recClick.recA[0]+doodle.recClick.recB[0])/2,(doodle.recClick.recA[1]+doodle.recClick.recB[1])/2),ABLen(new Array(doodle.recClick.recB[0],doodle.recClick.recB[1]),new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]))/2);
		doodle.context.closePath();
		doodle.context.stroke();	
	    }
	    if (doodle.type==0)
	    {
		doodle.addClick(0,e.pageX - this.offsetLeft, e.pageY - this.offsetTop, true);
		doodle.sendReDraw(0, doodle.mulClick);
		doodle.redraw(0, doodle.mulClick);
	    }
	}
    });
			
    $('#canvasTop').mouseup(function(e){
	doodle.context.clearRect(0,0,doodle.c.width,doodle.c.height);
	doodle.paint = false;
	doodle.recClick.recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
	if (doodle.type==3)
	{
	    doodle.context2.fillText(prompt("Input the Text"),e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
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


    
    $("button#clearButton").click(
	function (){
	    /*context.save();
		    c.width=c.width;
			context.restore();*/
	    doodle.context2.clearRect(0,0,doodle.c2.width,doodle.c2.height);
	}
	);
    $("#Colors").change(
	function (){
	    var selectColor=document.getElementById("Colors");
	    switch (selectColor.selectedIndex)
	    {
		case 0:
		    doodle.context2.strokeStyle="#cb3594";
		    doodle.context.strokeStyle="#cb3594";
		    break;
		case 1:
		    doodle.context2.strokeStyle="#659b41";
		    doodle.context.strokeStyle="#659b41";
		    break;
		case 2:
		    doodle.context2.strokeStyle="#ffcf33";
		    doodle.context.strokeStyle="#ffcf33";
		    break;
		case 3:
		    doodle.context2.strokeStyle="#986928";
		    doodle.context.strokeStyle="#986928";
		    break;
		case 4:
		    doodle.context2.strokeStyle="#FFFFFF";
		    doodle.context.strokeStyle="#FFFFFF";
		    break;
		default:
		    doodle.context2.strokeStyle="#cb3594";
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
		    doodle.context2.lineWidth=4;
		    doodle.context.lineWidth=4;
		    break;
		case 1:
		    doodle.context2.lineWidth=7;
		    doodle.context.lineWidth=7;
		    break;
		case 2:
		    doodle.context2.lineWidth=10;
		    doodle.context.lineWidth=10;
		    break;
		case 3:
		    doodle.context2.lineWidth=15;
		    doodle.context.lineWidth=15;
		    break;
		default:
		    doodle.context2.lineWidth=4;
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
}


doodle.onBegin = function(){
    if (doodle.touchable) {
	doodle.c2.addEventListener('touchstart', onTouchStart, false);
	doodle.c2.addEventListener('touchmove', onTouchMove, false);
	doodle.c2.addEventListener('touchend', onTouchEnd, false);
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
doodle.onTouchStart = function(event) {
    //do stuff
    event.preventDefault();
    doodle.paint=true;
    for (i=0;i<event.touches.length;i++){
	if (doodle.type==1||doodle.type==2)
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
    //e.preventDefault();
    event.preventDefault();
    if(doodle.paint){
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
	    if (doodle.type==1||doodle.type==2)
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
		doodle.context.clearRect(0,0,doodle.c.width,doodle.c.hegith);
		doodle.context.beginPath();
		doodle.recClick.recA.splice(0,2,event.touches[0].pageX - this.offsetLeft, event.touches[0].pageY - this.offsetTop);
		doodle.recClick.recB.splice(0,2,event.touches[1].pageX - this.offsetLeft, event.touches[1].pageY - this.offsetTop);
		if (doodle.type==1)
		{
		    doodle.DrawRect(doodle.context,new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]),new Array(doodle.recClick.recB[0],doodle.recClick.recB[1]));
		}
		if (doodle.type==2)
		{
		    doodle.DrawCircle(context,new Array((doodle.recClick.recA[0]+doodle.recClick.recB[0])/2,(doodle.recClick.recA[1]+doodle.recClick.recB[1])/2),ABLen(new Array(doodle.recClick.recB[0],doodle.recClick.recB[1]),new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]))/2);
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
	}
    }
}

doodle.onTouchEnd = function(event) {
    if (doodle.drawRec==1)
    {
	doodle.context.clearRect(0,0,doodle.c2.width,doodle.c2.height);
	doodle.drawToCanvasGraph(doodle.type, doodle.recClick);
    //	doodle.context.beginPath();
    //	if (doodle.type==1)
    //	{
    //	    doodle.context.clearRect(0,0,doodle.c2.width,doodle.c2.height);
    //	    doodle.DrawRect(doodle.context2,new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]),new Array(doodle.recClick.recB[0],doodle.recClick.recB[1]));
    //	}
    //	if (doodle.type==2)
    //	{
    //	    doodle.context.clearRect(0,0,doodle.c2.width,doodle.c2.height);
    //	    doodle.DrawCircle(doodle.context2,new Array((doodle.recClick.recA[0]+doodle.recClick.recB[0])/2,(doodle.recClick.recA[1]+doodle.recClick.recB[1])/2),ABLen(new Array(doodle.recClick.recB[0],doodle.recClick.recB[1]),new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]))/2);
    //	}
    //	doodle.context2.closePath();
    //	doodle.context2.stroke();
    }
    doodle.paint=false;
    doodle.drawRec=0;
}
		


doodle.redraw = function(index, click){
    for(var i=0; i < click.mulClickX[index].length; i++)
    {
	doodle.context2.beginPath();
	if(click.mulClickDrag[index][i] && i)
	{
	    doodle.context2.moveTo(click.mulClickX[index][i-1], click.mulClickY[index][i-1]);
	}else
	{
	    doodle.context2.moveTo(click.mulClickX[index][i]-1, click.mulClickY[index][i]);
	}
	doodle.context2.lineTo(click.mulClickX[index][i], click.mulClickY[index][i]);
	doodle.context2.closePath();
	doodle.context2.stroke();
    }
}

//here deal with the transfering
doodle.drawToCanvasGraph = function(index,shapeClick)
{
    doodle.context2.beginPath();    
    if (index==1)
    {
	DrawRect(doodle.context2,new Array(shapeClick.recA[0],shapeClick.recA[1]),new Array(shapeClick.recB[0],shapeClick.recB[1]));
    //DrawRect(context2,new Array(recA[0],recA[1]),new Array(recB[0],recB[1]));
    //drawToCanvasGraph(1,recA,recB);
    //context2.clearRect(0,0,c2.width,c2.height);
    }
    if (index==2)
    {
	DrawCircle(doodle.context2,new Array((shapeClick.recA[0]+shapeClick.recB[0])/2,(shapeClick.recA[1]+shapeClick.recB[1])/2),ABLen(new Array(shapeClick.recB[0],shapeClick.recB[1]),new Array(shapeClick.recA[0],shapeClick.recA[1]))/2);
    //DrawCircle(context2,new Array((recA[0]+recB[0])/2,(recA[1]+recB[1])/2),ABLen(new Array(recB[0],recB[1]),new Array(recA[0],recA[1]))/2);
    //drawToCanvasGraph(2,recA,recB);
    //context2.clearRect(0,0,c2.width,c2.height);
    }
    doodle.context2.closePath();
    doodle.context2.stroke();
}


doodle.sendReDraw = function (index, click){
    var tmp = click;
    tmp.type = "doodleTable";
    tmp.drawElement = "freeDraw";
    tmp.index = index;
    connection.sendMessage(JSON.stringify(tmp));
//logg(JSON.stringify(tmp));
}

doodle.sendDrawShape = function(index, shapeClick)
{
    var tmp = shapeClick;
    tmp.type = "doodleTable";
    tmp.drawElement = "shape";
    tmp.index = index;
    connection.sendMessage(JSON.stringify(tmp));    
}


doodle.init();
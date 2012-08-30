var doodle = {};

doodle.init = function(){
    doodle.canvasBottom=document.getElementById("canvasBottom");
    doodle.canvasTop=document.getElementById("canvasTop");
    doodle.canvasTemp=document.getElementById("canvasTemp");
    doodle.contextBottom=doodle.canvasBottom.getContext("2d");
    doodle.contextTop=doodle.canvasTop.getContext("2d");
    doodle.contextTemp=doodle.canvasTemp.getContext("2d");
    doodle.paint = false; //默认绘画状态为关闭
    doodle.lastPointX = null;
    doodle.lastPointY = null;
	CanvasSizeRefresh();
    doodle.type = "pointer";
	doodle.contextTop.strokeStyle="#000000";
	doodle.contextTemp.strokeStyle="#000000";
    //doodle.contextTop.lineJoin = "round";
    //doodle.contextTop.lineWidth = 4;
}

function CanvasSizeRefresh(){
	var width=$(window).width();
    var height=$(window).height();
    doodle.canvasBottom.width=width*0.98;
    doodle.canvasBottom.height=height*0.98;
    doodle.canvasTop.width=width*0.98;
    doodle.canvasTop.height=height*0.98;
	doodle.canvasTemp.width=width*0.98;
    doodle.canvasTemp.height=height*0.98;
	console.log("Canvas - width: " + width*0.98 +", height: " + height*0.98 )
}

function refreshTempOnly(){
	var width=$(window).width();
    var height=$(window).height();
	doodle.canvasTemp.width=width*0.98;
    doodle.canvasTemp.height=height*0.98;
}

//here deal with the operations
$(document).ready(function() {
	//初始化涂鸦板
	doodle.init();
	//每当窗口大小发生变化时，立即更新Canvas的大小。
	$(window).resize(function() {
        CanvasSizeRefresh();
	});
    //here rewrite the change mode
    $('#pointer').mousedown(function(){
        doodle.type="pointer";
        document.getElementById("canvasTemp").style.cursor="default";
        //drag.enableDrag();
    })
    $('#pen').mousedown(function(){
        doodle.type="pen";
        document.getElementById("canvasTemp").style.cursor="crosshair";
        //drag.disableDrag();
    })
	$('#rubber').mousedown(function(){
        doodle.type="rubber";
        document.getElementById("canvasTemp").style.cursor="url('image/rubber.jpg') 12 12,auto";
        //drag.disableDrag();
    })
    $('#line').mousedown(function(){
        doodle.type="line";
        document.getElementById("canvasTemp").style.cursor="crosshair";
        //drag.disableDrag();
    })
    $('#rectangle').mousedown(function(){
        doodle.type="rectangle";
        document.getElementById("canvasTemp").style.cursor="crosshair";
        //drag.disableDrag();
    })
    $('#circle').mousedown(function(){
        doodle.type="circle";
        document.getElementById("canvasTemp").style.cursor="crosshair";
        //drag.disableDrag();
    })
    $('#word').mousedown(function(){
        doodle.type="word";
        document.getElementById("canvasTemp").style.cursor="text";
        //drag.disableDrag();
    })
    $('#wordOk').mousedown(function(){
        $("#wordArea").fadeOut();
	   doodle.displayWord(doodle.lastPointX,  doodle.lastPointY,  document.getElementById("textArea").value);
    })
    $('#wordCancel').mousedown(function(){
        $("#wordArea").fadeOut();
    })
	//如果侦听到按下回车键，显示输入文字
	$("#textArea").keypress(function(e){
		var key = e.which;
		console.log(key);
		if(key==13){
			$("#wordArea").fadeOut();
	         doodle.displayWord(doodle.lastPointX,  doodle.lastPointY,  document.getElementById("textArea").value);
		}
	})
	
	//here deal with the operations in touch
    $('#canvasTemp').mousedown(function(e){    
        console.log("MouseDown:"+(e.pageX - this.offsetLeft)+","+(e.pageY - this.offsetTop));
        /*if (doodle.type==5)
	    doodle.paint = false;
        else doodle.paint=true;
        doodle.mulClick.mulClickX[0]=new Array();
        doodle.mulClick.mulClickY[0]=new Array();
        doodle.mulClick.mulClickDrag[0]=new Array();*/
        if (doodle.type=="pen"){
			doodle.lastPointX = e.pageX - this.offsetLeft;
			doodle.lastPointY = e.pageY - this.offsetTop;
			//doodle.addClick(0,e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			//doodle.sendReDraw(0, doodle.mulClick);
			doodle.drawPoint(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			doodle.paint = true;
        }
	   else if(doodle.type=="rubber"){
			doodle.lastPointX = e.pageX - this.offsetLeft;
			doodle.lastPointY = e.pageY - this.offsetTop;
			doodle.clearSquare(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			doodle.paint = true;
	   }
	   else if (doodle.type=="line"||doodle.type=="rectangle"||doodle.type=="circle"){
	        	 doodle.lastPointX = e.pageX - this.offsetLeft;
			 doodle.lastPointY = e.pageY - this.offsetTop;
			 doodle.paint = true;
	   }
	   else if (doodle.type=="word"){
		  $("#wordArea").css("display","none");
		  document.getElementById("textArea").value = "";
		  $("#wordArea").css("left",e.pageX - this.offsetLeft);
           $("#wordArea").css("top",e.pageY - this.offsetTop);
		  doodle.lastPointX = e.pageX - this.offsetLeft;
	       doodle.lastPointY = e.pageY - this.offsetTop;
	       $("#wordArea").fadeIn();
	   }
        /*else if (doodle.type=="line"||doodle.type=="rectangle"||doodle.type=="circle"||doodle.type=="word"){
			doodle.recClick.recA.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
			doodle.recClick.recB.splice(0,2,doodle.recClick.recA[0],doodle.recClick.recA[1]);
        }*/
    })
	
    $('#canvasTemp').mousemove(function(e){
        if(doodle.paint){
		   console.log("MouseMove:"+(e.pageX - this.offsetLeft)+","+(e.pageY - this.offsetTop));
	       if(doodle.type=="pen"){
		      //doodle.sendReDraw(0, doodle.mulClick);
		      doodle.freeDraw(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		  }
		  else if(doodle.type=="rubber"){
		      doodle.clearSquare(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);	
		  }
		  else if(doodle.type=="line"){
			 doodle.drawTempLine(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		  }
		  else if(doodle.type=="rectangle"){
			 doodle.drawTempRectangle(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		  }
		  else if(doodle.type=="circle"){
			 doodle.drawTempCircle(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		  }
		    /*
	        case 1:
		    doodle.context.clearRect(0,0,doodle.canvas.width,doodle.canvas.height);
		    doodle.context.beginPath();
		    rectanglet(doodle.context,new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]),new Array(e.pageX - this.offsetLeft,e.pageY - this.offsetTop));
		    doodle.context.closePath();
		    doodle.context.stroke();
		    doodle.recClick.recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
		    break;
	        case 2:
		    doodle.context.clearRect(0,0,doodle.canvas.width,doodle.canvas.height);
		    doodle.context.beginPath();
		    doodle.recClick.recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
		    circle(doodle.context,new Array((doodle.recClick.recA[0]+doodle.recClick.recB[0])/2,(doodle.recClick.recA[1]+doodle.recClick.recB[1])/2),ABLen(new Array(doodle.recClick.recB[0],doodle.recClick.recB[1]),new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]))/2);
		    doodle.context.closePath();
		    doodle.context.stroke();
		    break;
	        case 3:
		    break;
	        case 4:
		    doodle.context.clearRect(0,0,doodle.canvas.width,doodle.canvas.height);
		    doodle.context.beginPath();
		    doodle.recClick.recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
		    line(doodle.context,new Array(doodle.recClick.recA[0],doodle.recClick.recA[1]),new Array(e.pageX - this.offsetLeft,e.pageY - this.offsetTop));
		    doodle.context.closePath();
		    doodle.context.stroke();
		    break;
	        default:*/
		}
	})
	
	$('#canvasTemp').mouseup(function(e){
		//doodle.context.clearRect(0,0,doodle.canvas.width,doodle.canvas.height);
		doodle.paint = false;
		refreshTempOnly();
		if(doodle.type=="line"){
			doodle.drawLine(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		}
		if(doodle.type=="rectangle"){
			doodle.drawRectangle(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		}
		if(doodle.type=="circle"){
			doodle.drawCircle(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
		}
		//doodle.recClick.recB.splice(0,2,e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
		/*
		if (doodle.type==3)
		{
		doodle.contextTop.fillText(prompt("Input the Text"),e.pageX - this.offsetLeft,e.pageY - this.offsetTop);
		}
		else if(doodle.type > 0)
		{
		doodle.sendDrawShape(doodle.type, doodle.recClick);
		doodle.drawToCanvasGraph(doodle.type, doodle.recClick);
		}		    */
	})
/*
	$('#canvasTemp').mouseleave(function(e){
		doodle.paint = false;
	})*/
});

doodle.drawPoint = function(x,y){
	doodle.contextTop.beginPath();
	doodle.contextTop.moveTo(x-1, y);
	doodle.contextTop.lineTo(x, y);
	doodle.contextTop.closePath();
	doodle.contextTop.stroke();
}

doodle.clearSquare = function(x,y){
	doodle.contextTop.clearRect(x-12,y-12,24,24);
}

doodle.freeDraw = function(x,y){
	doodle.contextTop.beginPath();
	doodle.contextTop.moveTo(doodle.lastPointX, doodle.lastPointY);
	doodle.contextTop.lineTo(x, y);
	doodle.contextTop.closePath();
	doodle.contextTop.stroke();
	doodle.lastPointX = x;
	doodle.lastPointY = y;
}

doodle.drawTempLine = function(x,y){
	refreshTempOnly();//清屏
	//doodle.contextTemp.fillStyle = "rgb(255,255,255)";
	//doodle.contextTemp.fillRect = (0,0,doodle.canvasTemp.width,doodle.canvasTemp.height);
	//doodle.contextTemp.clearRect(0,0,doodle.canvasTemp.width,doodle.canvasTemp.height);
	doodle.contextTemp.beginPath();
	doodle.contextTemp.moveTo(doodle.lastPointX, doodle.lastPointY);
	doodle.contextTemp.lineTo(x,y);
	doodle.contextTemp.closePath();
	doodle.contextTemp.stroke();
}

doodle.drawLine = function(x,y){
	doodle.contextTop.beginPath();
	doodle.contextTop.moveTo(doodle.lastPointX, doodle.lastPointY);
	doodle.contextTop.lineTo(x,y);
	doodle.contextTop.closePath();
	doodle.contextTop.stroke();
}

doodle.drawTempRectangle = function(x,y){
	refreshTempOnly();
	//doodle.contextTemp.fillStyle = "rgb(255,255,255)";
	//doodle.contextTemp.fillRect = (0,0,doodle.canvasTemp.width,doodle.canvasTemp.height);
	//doodle.contextTemp.clearRect(0,0,doodle.canvasTemp.width,doodle.canvasTemp.height);
	doodle.contextTemp.beginPath();
	doodle.contextTemp.moveTo(doodle.lastPointX, doodle.lastPointY);
	doodle.contextTemp.lineTo(doodle.lastPointX, y);
	doodle.contextTemp.lineTo(x, y);
	doodle.contextTemp.lineTo(x, doodle.lastPointY);
	doodle.contextTemp.lineTo(doodle.lastPointX, doodle.lastPointY);
	doodle.contextTemp.closePath();
	doodle.contextTemp.stroke();
}

doodle.drawRectangle = function(x,y){
	doodle.contextTop.beginPath();
	doodle.contextTop.moveTo(doodle.lastPointX, doodle.lastPointY);
	doodle.contextTop.lineTo(doodle.lastPointX, y);
	doodle.contextTop.lineTo(x, y);
	doodle.contextTop.lineTo(x, doodle.lastPointY);
	doodle.contextTop.lineTo(doodle.lastPointX, doodle.lastPointY);
	doodle.contextTop.closePath();
	doodle.contextTop.stroke();
}

doodle.drawTempCircle = function(x,y){
    refreshTempOnly();
    var x2 = doodle.lastPointX;
	var y2 = doodle.lastPointY;
    var r = Math.pow( ( Math.pow(x2-x,2) + Math.pow(y2-y,2)) ,0.5);
    console.log("R = " + r);
    doodle.contextTemp.beginPath();
    doodle.contextTemp.arc(doodle.lastPointX, doodle.lastPointY, r, 0, Math.PI*2, true);
    doodle.contextTemp.closePath();
	doodle.contextTemp.stroke();
}

doodle.drawCircle = function(x,y){
    var x2 = doodle.lastPointX;
	var y2 = doodle.lastPointY;
    var r = Math.pow( ( Math.pow(x2-x,2) + Math.pow(y2-y,2)) ,0.5);
    console.log("R = " + r);
    doodle.contextTop.beginPath();
    doodle.contextTop.arc(doodle.lastPointX, doodle.lastPointY, r, 0, Math.PI*2, true);
    doodle.contextTop.closePath();
    doodle.contextTop.stroke();
}

doodle.displayWord = function (x, y, value){
	doodle.contextTop.font = "18px calibri";
	doodle.contextTop.fillText(value, x, y);
}

/*
//here deal with the operation in drawing the canvas
doodle.addClick = function(i, x, y, dragging){
    doodle.mulClick.mulClickX[i].push(x);
    doodle.mulClick.mulClickY[i].push(y);
    doodle.mulClick.mulClickDrag[i].push(dragging);
}

doodle.redraw = function(index, click){
    //var flag=true;//if flag==true means the toolbar will appear
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
}*/
/*
//here deal with the transfering
doodle.drawToCanvasGraph = function(index,shapeClick)
{
    doodle.contextTop.beginPath();
    switch (index){
	case 1:
	    rectanglet(doodle.contextTop,new Array(shapeClick.recA[0],shapeClick.recA[1]),new Array(shapeClick.recB[0],shapeClick.recB[1]));
	    break;
	case 2:
	    circle(doodle.contextTop,new Array((shapeClick.recA[0]+shapeClick.recB[0])/2,(shapeClick.recA[1]+shapeClick.recB[1])/2),ABLen(new Array(shapeClick.recB[0],shapeClick.recB[1]),new Array(shapeClick.recA[0],shapeClick.recA[1]))/2);
	    break;
	case 4:
	    line(doodle.contextTop,new Array(shapeClick.recA[0],shapeClick.recA[1]),new Array(shapeClick.recB[0],shapeClick.recB[1]));
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
}*/
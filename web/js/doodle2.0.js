var doodle = {};

doodle.init = function(){
    doodle.canvasBottom=document.getElementById("canvasBottom");
    doodle.canvasTop=document.getElementById("canvasTop");
    doodle.canvasTemp=document.getElementById("canvasTemp");
    doodle.contextBottom=doodle.canvasBottom.getContext("2d");
    doodle.contextTop=doodle.canvasTop.getContext("2d");
    doodle.contextTemp=doodle.canvasTemp.getContext("2d");
	//here initial the size of canvas
	CanvasSizeRefresh();
    doodle.paint = false; //默认绘画状态为关闭
    doodle.type = "pointer";//默认鼠标状态为指针
	doodle.contextTop.strokeStyle="#000000"; //默认线条颜色为黑色,下同
	doodle.contextTop.lineJoin = "round";
	doodle.contextTop.lineWidth = 2;
	doodle.contextTemp.strokeStyle="#000000";
	doodle.contextTemp.lineJoin = "round";
	doodle.contextTemp.lineWidth = 2;
    doodle.lastPoint = new Array(0,0); //用于保存上一鼠标位置
	var Vred = document.getElementById("Vred");
	var Vgreen = document.getElementById("Vgreen");
	var Vblue = document.getElementById("Vblue");
	var colorDemo = document.getElementById("colorDemo").getContext("2d");
	colorDemo.fillStyle="#000000";//初始化为黑色
	colorDemo.fillRect(0,0,30,30);
}

//here deal with the operations
$(document).ready(function() {
	//初始化涂鸦板
	doodle.init();
	//每当窗口大小发生变化时，立即更新Canvas的大小。 ???
	$(window).resize(function() {

	 });
    //here rewrite the change mode
    $('#pointer').mousedown(function(){
		$("#colorArea").fadeOut();
		$("#lineWidthArea").fadeOut();
        doodle.type="pointer";
        document.getElementById("canvasTemp").style.cursor="default";
        //drag.enableDrag();???
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
	$("#saveDoodle").mousedown(function(){
		doodle.saveDoodle();
	})
    $('#word').mousedown(function(){
        doodle.type="word";
        document.getElementById("canvasTemp").style.cursor="text";
        //drag.disableDrag();
    })
    $('#wordOk').mousedown(function(){
        $("#wordArea").fadeOut();
	   doodle.displayWord(doodle.lastPoint, document.getElementById("textArea").value);
	   sendWord(doodle.lastPoint, document.getElementById("textArea").value);
    })
    $('#wordCancel').mousedown(function(){
        $("#wordArea").fadeOut();
    })
	$('#color').mousedown(function(){
		if($('#colorArea').css('display') == "none"){
			$("#colorArea").fadeIn();
		}
		else{
			$("#colorArea").fadeOut();
		}
		if($('#lineWidthArea').css('display') == "block"){
			$("#lineWidthArea").fadeOut();
		}
    })
	$('#colorClose').mousedown(function(){
        $("#colorArea").fadeOut();
    })
	$('#lineWidth').mousedown(function(){
		if($('#lineWidthArea').css('display') == "none"){
			$("#lineWidthArea").fadeIn();
		}
		else{
			$("#lineWidthArea").fadeOut();
		}
		if($('#colorArea').css('display') == "block"){
			$("#colorArea").fadeOut();
		}
    })
	$('#lineWidthClose').mousedown(function(){
        $("#lineWidthArea").fadeOut();
    })
	//如果侦听到按下回车键，显示输入文字
	$("#textArea").keypress(function(e){
		var key = e.which;
		console.log(key);
		if(key==13){
			$("#wordArea").fadeOut();
	         doodle.displayWord(doodle.lastPoint, document.getElementById("textArea").value);
			sendWord(doodle.lastPoint, document.getElementById("textArea").value);
		}
	})
	//以下针对拖动条进行设置和操作
	$("#red").slider({
		min: 0,
		max: 255,
		slide: function( event, ui ) {
			$("#Vred").val(ui.value);
			colorRefresh();
		}
	});
	$("#Vred").val( $("#red").slider("value") );
	$("#Vred").change(function() {	
		if(this.value>255){
			$("#colorAlert").val("value > 255!!");
			this.value = 255;
		}
		else if(this.value<0){
			$("#colorAlert").val("value < 0!!");
			this.value = 0;
		}
		else{
			$("#colorAlert").val("Good Job");
			$("#red").slider( "value", this.value );
		}
		colorRefresh();
	});
	$("#green").slider({
		min: 0,
		max: 255,
		slide: function( event, ui ) {
			$("#Vgreen").val(ui.value);
			colorRefresh();
		}
	});
	$("#Vgreen").val( $("#green").slider("value") );
	$("#Vgreen").change(function() {	
		if(this.value>255){
			$("#colorAlert").val("value > 255!!");
			this.value = 255;
		}
		else if(this.value<0){
			$("#colorAlert").val("value < 0!!");
			this.value = 0;
		}
		else{
			$("#colorAlert").val("Good Job");
			$("#green").slider( "value", this.value );
		}
		colorRefresh();
	});
	$("#blue").slider({
		min: 0,
		max: 255,
		slide: function( event, ui ) {
			$("#Vblue").val(ui.value);
			colorRefresh();
		}
	});
	$("#Vblue").val( $("#blue").slider("value") );
	$("#Vblue").change(function() {	
		if(this.value>255){
			$("#colorAlert").val("value > 255!!");
			this.value = 255;
		}
		else if(this.value<0){
			$("#colorAlert").val("value < 0!!");
			this.value = 0;
		}
		else{
			$("#colorAlert").val("Good Job");
			$("#blue").slider( "value", this.value );
		}
		colorRefresh();
	})
	
	$("#lineWidthSelect").slider({
		min: 2,
		max: 10,
		slide: function( event, ui ) {
			$("#VlineWidth").val(ui.value);
			doodle.contextTop.lineWidth = ui.value;
			doodle.contextTemp.lineWidth = ui.value;
		}
	})
	$("#VlineWidth").val( $("#lineWidthSelect").slider("value") );
	$("#VlineWidth").change(function() {	
		if(this.value>10){
			$("#lineWidthAlert").val("value > 10!!");
			this.value = 10;
		}
		else if(this.value<2){
			$("#lineWidthAlert").val("value < 2!!");
			this.value = 2;
		}
		else{
			$("#colorAlert").val("Good Job");
			$("#lineWidthSelect").slider( "value", this.value );
		}
		doodle.contextTop.lineWidth = this.value;
		doodle.contextTemp.lineWidth = this.value;
	})
	
	
	
	
	//here deal with the operations
	$('#canvasTemp').mousedown(function(e){    
		console.log("MouseDown:"+(e.pageX - this.offsetLeft)+","+(e.pageY - this.offsetTop));
		if (doodle.type=="pen"){
			doodle.lastPoint = new Array(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			DrawP(doodle.contextTop, doodle.lastPoint);
			sendDrawP(doodle.lastPoint, "point");
			doodle.paint = true;
		}
		else if(doodle.type=="rubber"){
			doodle.lastPoint = new Array(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			doodle.clearSquare(doodle.lastPoint);
			sendDrawP(doodle.lastPoint, "rubber");
			doodle.paint = true;
	    }
		else if (doodle.type=="line"||doodle.type=="rectangle"||doodle.type=="circle"){
			doodle.lastPoint = new Array(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			doodle.paint = true;
		}
		else if (doodle.type=="word"){
			$("#wordArea").css("display","none");
			document.getElementById("textArea").value = "";
			$("#wordArea").css("left",e.pageX - this.offsetLeft);
			$("#wordArea").css("top",e.pageY - this.offsetTop);
			doodle.lastPoint = new Array(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			$("#wordArea").fadeIn();
	    }
	})
	
	$('#canvasTemp').mousemove(function(e){
        if(doodle.paint){
			console.log("MouseMove:"+(e.pageX - this.offsetLeft)+","+(e.pageY - this.offsetTop));
			if(doodle.type=="pen"){
				var thisPoint = new Array(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
				DrawLine(doodle.contextTop, doodle.lastPoint, thisPoint);
				sendDrawShape(doodle.lastPoint, thisPoint, "line");
				doodle.lastPoint = thisPoint;
			}
			else if(doodle.type=="rubber"){
				var thisPoint = new Array(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
				doodle.clearSquare(thisPoint);
				sendDrawP(thisPoint, "rubber");
			}
			else if(doodle.type=="line"){
				refreshTempOnly();//清屏
				var thisPoint = new Array(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
				DrawLine(doodle.contextTemp, doodle.lastPoint, thisPoint);
			}
			else if(doodle.type=="rectangle"){
				refreshTempOnly();//清屏
				var thisPoint = new Array(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
				DrawRect(doodle.contextTemp, doodle.lastPoint, thisPoint);
			}
			else if(doodle.type=="circle"){
				refreshTempOnly();//清屏
				var thisPoint = new Array(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
				var r = ABLen(doodle.lastPoint, thisPoint);
				DrawCircle(doodle.contextTemp, doodle.lastPoint, r);
			}
		}
	})
	
	$('#canvasTemp').mouseup(function(e){
		doodle.paint = false;
		refreshTempOnly();
		if(doodle.type=="line"){
			var thisPoint = new Array(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			DrawLine(doodle.contextTop, doodle.lastPoint, thisPoint);
			sendDrawShape(doodle.lastPoint, thisPoint, "line");
		}
		if(doodle.type=="rectangle"){
			var thisPoint = new Array(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			DrawRect(doodle.contextTop, doodle.lastPoint, thisPoint);
			sendDrawShape(doodle.lastPoint, thisPoint, "rectangle");
		}
		if(doodle.type=="circle"){
			var thisPoint = new Array(e.pageX - this.offsetLeft, e.pageY - this.offsetTop);
			var r = ABLen(doodle.lastPoint, thisPoint);
			DrawCircle(doodle.contextTop, doodle.lastPoint, r);
			sendDrawShape(doodle.lastPoint, thisPoint, "circle");
		}
	})
})

function CanvasSizeRefresh(){
    doodle.canvasBottom.width=1200;
    doodle.canvasBottom.height=600;
    doodle.canvasTop.width=1200;
    doodle.canvasTop.height=600;
    doodle.canvasTemp.width=1200;
    doodle.canvasTemp.height=600;
	/*var width=$(window).width();
    var height=$(window).height();
    doodle.canvasBottom.width=width*0.98;
    doodle.canvasBottom.height=height*0.98;
    doodle.canvasTop.width=width*0.98;
    doodle.canvasTop.height=height*0.98;
	doodle.canvasTemp.width=width*0.98;
    doodle.canvasTemp.height=height*0.98;
	console.log("Canvas - width: " + width*0.98 +", height: " + height*0.98 )*/
}

function refreshTempOnly(){
    doodle.canvasTemp.width=1200;
    doodle.canvasTemp.height=600;
	/*var width=$(window).width();
    var height=$(window).height();
	doodle.canvasTemp.width=width*0.98;
    doodle.canvasTemp.height=height*0.98;*/
}

function colorRefresh(){
	doodle.contextTop.strokeStyle = "rgb("+Vred.value+","+Vgreen.value+","+Vblue.value+")"; 
	doodle.contextTemp.strokeStyle = "rgb("+Vred.value+","+Vgreen.value+","+Vblue.value+")";
	doodle.contextTop.fillStyle = "rgb("+Vred.value+","+Vgreen.value+","+Vblue.value+")"; 
	console.log(doodle.contextTemp.strokeStyle);
	var colorDemo = document.getElementById("colorDemo").getContext("2d");
	colorDemo.fillStyle= "rgb("+Vred.value+","+Vgreen.value+","+Vblue.value+")";
	colorDemo.fillRect(0,0,30,30);
}

doodle.clearSquare = function(P){
	//橡皮大小为 24*24
	doodle.contextTop.clearRect(P[0]-12,P[1]-12,24,24);
}

doodle.displayWord = function (P, value){
	doodle.contextTop.font = "18px calibri";
	doodle.contextTop.fillText(value, P[0], P[1]);
}

function sendDrawP(P, method){
	var message = {};
	message.type = "doodleTable";
	message.drawElement = "P";
	message.method = method;
	message.point = P;
	message.color = doodle.contextTop.strokeStyle;
	message.lineWidth = doodle.contextTop.lineWidth;
	var Jmessage = JSON.stringify(message);
	console.log("C->S: " + Jmessage);
	connection.sendMessage(Jmessage);
}

doodle.DrawPLD = function(message){
	tempColor = doodle.contextTop.strokeStyle;
	tempLineWidth = doodle.contextTop.lineWidth;
	doodle.contextTop.strokeStyle = message.color;
	doodle.contextTop.lineWidth = message.lineWidth;
	if(message.method == "point"){
		DrawP(doodle.contextTop ,message.point);
	}
	else if(message.method == "rubber"){
		doodle.clearSquare(message.point);
	}
	doodle.contextTop.strokeStyle = tempColor;
	doodle.contextTop.lineWidth = tempLineWidth;
}

function sendDrawShape(A, B, shape){
	var message = {};
	message.type = "doodleTable";
	message.drawElement = "shape";
	message.shape = shape;
	message.A = A;
	message.B = B;
	message.color = doodle.contextTop.strokeStyle;
	message.lineWidth = doodle.contextTop.lineWidth;
	var Jmessage = JSON.stringify(message);
	console.log("C->S: " + Jmessage);
	connection.sendMessage(Jmessage);
}

doodle.DrawShapeLD = function(message){
	tempColor = doodle.contextTop.strokeStyle;
	tempLineWidth = doodle.contextTop.lineWidth;
	doodle.contextTop.strokeStyle = message.color;
	doodle.contextTop.lineWidth = message.lineWidth;
	if(message.shape == "line"){
	    DrawLine(doodle.contextTop ,message.A, message.B);
	}
	else if(message.shape == "rectangle"){
		DrawRect(doodle.contextTop ,message.A, message.B);
	}
	else if(message.shape == "circle"){
		var r = ABLen(message.A, message.B);
		DrawCircle(doodle.contextTop, message.A, r);
	}
	doodle.contextTop.strokeStyle = tempColor;
	doodle.contextTop.lineWidth = tempLineWidth;
}

function sendWord(P, word){
	var message = {};
	message.type = "doodleTable";
	message.drawElement = "word";
	message.point = P;
	message.word = word;
	message.color = doodle.contextTop.fillStyle;
	var Jmessage = JSON.stringify(message);
	console.log("C->S: " + Jmessage);
	connection.sendMessage(Jmessage);
}

doodle.DrawWordLD = function(message){
	tempColor = doodle.contextTop.fillStyle;
	doodle.contextTop.fillStyle = message.color;
	doodle.displayWord(message.point, message.word);
	doodle.contextTop.fillStyle = tempColor;
} 

doodle.restorePic = function(data){
    var image = new Image();
    image.src = data;
    image.onload = function(){
        doodle.contextTop.drawImage(image,0,0);
    }
}

/*doodle.requestDoodle = function(){
	var message = {};
	message.type = "requestDoodle";
	message.from = login.username;
	var Jmessage = JSON.stringify(message);
	console.log("C->S: " + Jmessage);
	connection.sendMessage(Jmessage);
}*/

doodle.getDoodlePic = function(request){
    var message = {};
    message.type = "doodlePic";
	message.usage = "replyDoodle";
    //var b64 = data.substring( 22 ); 
    message.to = request.from;
    message.data = doodle.canvasTop.toDataURL();
    var Jmessage = JSON.stringify(message);
	console.log("C->S: " + Jmessage);
	connection.sendMessage(Jmessage);
}

doodle.saveDoodle = function(){
    var message = {};
    message.type = "doodlePic";
    message.usage = "saveDoodle";
    message.data = doodle.canvasTop.toDataURL();
	var Jmessage = JSON.stringify(message);
	console.log("C->S: " + Jmessage);
	connection.sendMessage(Jmessage);
}
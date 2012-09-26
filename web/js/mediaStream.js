/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var currentVideoId;
var currentUsername;
var currentUser = 0;

var userlist = new Array();
var videoConnectionlist = new Array();
var videoState = new Array();
var userlistQueue = new Array();
userlistQueue.top = 0;
userlistQueue.end = 0;

for(var i=0;i<10;i++){
	videoConnectionlist[i] = false;
	videoState[i] = new Array(false, 0, 0);
}

$(document).ready(function(){
	$(".uservideo").draggable({
		start:function(e,ui){
			console.log("start: "+(e.pageX) +", " +(e.pageY));
			mediaStream.dragstart = new Array(e.pageX, e.pageY);
		},
		stop:function(e,ui){
			console.log("stop: "+(e.pageX) +", " +(e.pageY));
			mediaStream.dragstop = new Array(e.pageX, e.pageY);
			mediaStream.dragSend($(this).attr("id"), mediaStream.dragstart, mediaStream.dragstop);
			var vid = parseInt($(this).attr("id").substring(5));
			videoState[vid] = new Array(true, $(this).css("left"), $(this).css("top"));
		}
	});
	
	mediaStream.dragSend = function(id, start, stop){
		var message = {};
		message.type = "videoDrag";
		message.id = id;
		message.start = start;
		message.stop = stop;
		var Jmessage = JSON.stringify(message);
		console.log("C->S: " + Jmessage);
		connection.sendMessage(Jmessage);
	}
	
	mediaStream.move = function(id, start, stop){
		var v = $("#"+id);
		console.log(v);
		var x = parseInt(v.css("left"));
		console.log(x);
		x = x - start[0] + stop[0];
		console.log(x);
		var y = parseInt(v.css("top"));
		y = y  - start[1] + stop[1];
		console.log(parseInt(v.css("left")));
		console.log(y);
		v.css("left", x);
		v.css("top", y);
		var subId = id.substring(5);
		videoState[subId] = new Array(true, v.css("left"), v.css("top"));
	}
	
	$(".user").click(function(){
		var message = {};
		message.type = "videoRequest";
		message.username = $(this).html();
		sendMessage(message);
	})
	
	$('#userList').mousedown(function(){
        doodle.type="userList";
        document.getElementById("canvasTemp").style.cursor="default";
    })
		
	mediaStream.getVideoState = function(data){
		var message = {};
		message.type = "getVideoState";
		message.to = data.username;
		message.videoState = videoState;
		sendMessage(message);
	}
	
	mediaStream.maybeDoVideoRequest = function(data){
		videoState = data.videoState;
		for(var i=0;i<10;i++){
			if(videoState[i][0]==true){
				$("#video"+i).css("left",videoState[i][1]);
				$("#video"+i).css("top",videoState[i][2]);
				var user = {};
				user.username = $("#user"+i).html();
				console.log(user);
				mediaStream.doRequest(user);
			}
		}
	}
	
	mediaStream.doRequest = function(data){
		currentUsername = data.username;
		var vid = mediaStream.findUser(currentUsername);
		var localvid = mediaStream.findUser(login.username);
		localVideoId = "video" + localvid;
		if(vid==-1){
			console.log("Not find the username..");
		}
		currentVideoId = "video" + vid;
		if(currentUsername == login.username && videoConnectionlist[localvid] == false){ //远端即为本地，本地媒体没打开
			console.log("way 1");
			console.log("videoId: " + currentVideoId);
			mediaStream.initialize(currentVideoId);
			$("#"+currentVideoId).fadeIn();
			videoConnectionlist[localvid] = true;
			videoState[localvid] = new Array(true, $("#"+currentVideoId).css("left"), $("#"+currentVideoId).css("top"));
		}
		else if(currentUsername == login.username && videoConnectionlist[localvid] == true){ //远端即为本地，本地媒体已打开
			console.log("way 2");
			$("#"+localVideoId).fadeIn();
		}
		else if(currentUsername != login.username && videoConnectionlist[localvid] == false){ //本地媒体没打开，与远端无连接
			console.log("way 3");
			mediaStream.initialize(localVideoId);
			maybeStart();
			$("#videoAlert").fadeIn();
			videoConnectionlist[localvid] = true;
			videoConnectionlist[vid] = true;
			videoState[vid] = new Array(true, $("#"+currentVideoId).css("left"), $("#"+currentVideoId).css("top"));
		}
		else if(currentUsername != login.username && videoConnectionlist[localvid] == true  && videoConnectionlist[vid] == true ){
			//本地媒体已打开，与远端有连接
			console.log("way 4");
			$("#"+currentVideoId).fadeIn();
			videoState[vid] = new Array(true, $("#"+currentVideoId).css("left"), $("#"+currentVideoId).css("top"));
		}
		else if(currentUsername != login.username && videoConnectionlist[localvid] == true  && videoConnectionlist[vid] == false ){
			//本地媒体已打开，与远端无连接
			console.log("way 5");
			$("#"+currentVideoId).fadeIn();
			currentPc = createPeerconnection();
			$("#videoAlert").fadeIn();
			videoState[lvid] = new Array(true, $("#"+currentVideoId).css("left"), $("#"+currentVideoId).css("top"));
		}
	}
	
	$("#videoAlertOk").click(function(){
		$("#videoAlert").fadeOut();
		doCall(currentPc, currentUsername);
		$("#"+currentVideoId).fadeIn();
	})
	
	mediaStream.sendUserList = function(data){
		var message = {};
		message.type = "getUserList";
		message.usage = "reply";
		message.userList = userlist;
		message.to = data.from;
		sendMessage(message);
	}
	
	mediaStream.getUserList = function(message){
		if(message.usage=="reply"){
			userlist = message.userList;
			currentUser = 0;
			while(userlist[currentUser]){
				$("#user"+currentUser).html(userlist[currentUser]);
				currentUser = currentUser + 1;
			}
		} else {
			var userlist_temp = message.userList;
			if(currentUser == 0){
				while(userlist_temp[currentUser]){
					$("#user"+currentUser).html(userlist_temp[currentUser]);
					userlist[currentUser] = userlist_temp[currentUser];
					currentUser = currentUser + 1;
				}
			} else {
				var i;
				var flag = new Array();
				for(var k=0;k<10;k++){
					flag[k] = 0;
				}
				for(i=0;i<10;i++){
					for(var j=0;j<10;j++){
						if(userlist_temp[i]==$("#user"+j).html()){
							flag[i] = 1;
						} 
					}
				}
				for(var t=0;t<10;t++){
					if(flag[t]==0 && userlist_temp[t]){
						if(userlistQueue.top!=userlistQueue.end){
							var id = userlistQueue[userlistQueue.top];
							$("#user"+id).html(userlist_temp[t]);
							userlist[id] = userlist_temp[t];
							userlistQueue.top++;
						} else {
							$("#user"+currentUser).html(userlist_temp[t]);
							userlist[currentUser] = userlist_temp[t];
							currentUser = currentUser + 1;
						}
					}
				}
			}
		}
	}
	
	mediaStream.hideVideo = function(username){
		var removeId = mediaStream.findUser(username);
		userlist[removeId] = null;
		$("#user"+removeId).html(null);
		$("#video"+removeId).fadeOut();
		if(removeId+1 == currentUser){
			currentUser = currentUser - 1;
		} else {
			userlistQueue[userlistQueue.end] = removeId;
			userlistQueue.end = userlistQueue.end + 1;
			console.log(userlistQueue);
			console.log(userlistQueue.top);
			console.log(userlistQueue.end);
		}
	}
})

var mediaStream = {};
var localVideo;
var remoteVideo = new Array();
var localStream;
var pc = new Array();
var currentPc;
var socket;
var started = false;
var sendto;
var needCreate = false;
    
mediaStream.initialize = function(videoId) {
	 console.log("Initializing...");
	 localVideo = document.getElementById(videoId);
	 getUserMedia();
}
	
function getUserMedia(){
	 try {
		  localVideo.style.opacity = 1;
		  navigator.webkitGetUserMedia( {
				audio:true, 
				video:true
		  }, onUserMediaSuccess,
		  onUserMediaError) ;
		  console.log("Requested access to local media with new syntax.") ;
	 } catch( e ) {
		  try {
				navigator.webkitGetUserMedia( "video,audio" , onUserMediaSuccess, 
					 onUserMediaError) ;
				console.log("Requested access to local media with old syntax.") ;
		  } catch( e ) {
				alert("webkitGetUserMedia() failed. Is the MediaStream flag enabled in chrome://flags?") ;
				console.log("webkitGetUserMedia failed with exception: " + e.message) ;
		  }
	 }
}
	
function onUserMediaSuccess(stream){
	 console.log("User has granted access to local media.");
	 var url = webkitURL.createObjectURL(stream);
	 localVideo.src = url;
	 localStream = stream;
}
	
function onUserMediaError(error){
	 console.log("Failed to get access to local media. Error code was " + error.code);
	 alert("Failed to get access to local media. Error code was " + error.code + ".");
}

// Caller creates Peerconnection.
function maybeStart(){
	 if( !started && localStream ) {
		  console.log("Connecting...");
		  currentPc = createPeerconnection();
		  console.log("Index of current pc is " + currentPc);
		  started = true;
		  //Caller initiates offer to peer.
	 }
	 else if(!localStream){
		  setTimeout(maybeStart,500);
	 }
}
	
function createPeerconnection(){
	 console.log("Create peerconnection.");
	 var i = pc.length;
	 remoteVideo[ i ] = document.getElementById( currentVideoId );
	 try {
		  pc[ i ] = new webkitPeerConnection00('ws://' + window.location.host + '/WebFc/WebFcSocketServlet',onIceCandidate);
		  console.log("Create webkitPeerConnection");
	 } catch( e ){
		  console.log("Failed to create PeerConnection, exception: " + e.message);
		  alert("Cannot create PeerConnection object; Is the 'PeerConnection' flag enabled in about:flags?");
		  return;
	 }
	 pc[ i ].onconnecting = onSessionConnecting;
	 pc[ i ].onopen = onSessionOpened;
	 pc[ i ].onaddstream = onRemoteStreamAdded;
	 pc[ i ].onremovestream = onRemoteStreamRemoved;
	 console.log("Add local stream.");
	 pc[ i ].addStream(localStream);
	 return i;
}
	
function doCall( i , username){
	 console.log("Send offer to peer");
	 var offer = pc[i].createOffer({
		  audio:true, 
		  video:true
	 });
	 pc[i].setLocalDescription(pc[i].SDP_OFFER, offer);
	 console.log(offer);
	 needCreate = true;
	 var message = {};
	 message.type = "offer";
	 message.sendTo = username;
	 message.sendFrom = login.username;
	 message.videoId = localVideoId;
	 sendto = message.sendTo;
	 message.sdp = offer.toSdp();
	 sendMessage(message);
	 pc[i].startIce();
}

function sendMessage(message) {
    var msgString = JSON.stringify(message);
    console.log('C->S: ' + msgString);
    connection.sendMessage(msgString);
}

	
function onIceCandidate(candidate, moreToFollow) {
	 console.log("get into onIceCandidate.");
	 if (candidate) {
		  var message = {};
		  message.type = "candidate";
		  message.sendTo = sendto;
		  message.sendFrom = login.username;
		  message.label = candidate.label;
		  message.candidate = candidate.toSdp();
		  sendMessage(message);
	 }
	 if (!moreToFollow) {
		  console.log("End of candidates.");
	 }
}
	
function onSessionConnecting(message) {
	 console.log("Session connecting.");
}
function onSessionOpened(message) {
	 console.log("Session opened.");
}

function onRemoteStreamAdded(event) {
	 console.log("Remote stream added.");
	 var url = webkitURL.createObjectURL(event.stream);
	 remoteVideo[currentPc].src = url;
	 waitForRemoteVideo(); 
}

function onRemoteStreamRemoved(event) {
	 console.log("Remote stream removed.");
}
	
function waitForRemoteVideo(){
	 if (remoteVideo[currentPc].currentTime > 0) {
		  transitionToActive();
	 } else {
		  setTimeout(waitForRemoteVideo, 100);
	 }
}
	
function transitionToActive(){
	 console.log("<input type=\"button\" id=\"hangup\" value=\"Hang up\" onclick=\"onHangup()\" />");
}
	
function onHangup() {
	 console.log("Hanging up.");
	 started = false;    // Stop processing any message
	 transitionToDone();
	 var len = pc.length;
	 for(var i=0; i < len;i++){
	 pc[i].close();
	 // will trigger BYE from server
	 pc[i] = null;
	 }
}
	
function transitionToDone(){
	 console.log("You have left the call.");
}
	
function do_Offer(socketData){
	 currentVideoId = socketData.videoId;
	 var remotevid = currentVideoId.substring(5);
	 console.log("remotevid: "+remotevid);
	 videoConnectionlist[remotevid] = true;
	 if (!started)
		  maybeStart();
	 console.log(needCreate);
	 if(needCreate)
		  currentPc = createPeerconnection();
	 var sdp = new SessionDescription(socketData.sdp);
	 pc[currentPc].setRemoteDescription(pc[currentPc].SDP_OFFER, sdp);
	 console.log(socketData.sendFrom);
	 doAnswer(socketData.sendFrom);
}
	
function do_Answer(socketData){
	 console.log(currentPc);
	 pc[currentPc].setRemoteDescription(pc[currentPc].SDP_ANSWER, new SessionDescription(socketData.sdp));
}
	
function do_Candidate(socketData){
	  console.log(currentPc);
	 var candidate = new IceCandidate(socketData.label, socketData.candidate);
	 pc[currentPc].processIceMessage(candidate);
}
	
function doAnswer(sendFrom) {
	  console.log(currentPc);
	 console.log("Send answer to peer");
	 needCreate = true;
	 var offer = pc[currentPc].remoteDescription;
	 var answer = pc[currentPc].createAnswer(offer.toSdp(), {
		  audio:true,
		  video:true
	 });
	 pc[currentPc].setLocalDescription(pc[currentPc].SDP_ANSWER, answer);
	 var message = {};
	 message.type = "answer";
	 message.sendTo = sendFrom;
	 message.sendFrom = login.username;
	 sendto = message.sendTo;
	 message.sdp = answer.toSdp();
	 sendMessage(message);
	 pc[currentPc].startIce();
}
	
function onRemoteHangup() {
	 console.log('Session terminated.');
	 started = false;    // Stop processing any message
	 var len = pc.length;
	 for(var i=0; i < len;i++){
	     pc[i].close();
	     pc[i] = null;
	 }
}

mediaStream.findUser = function(username){
	for(var i=0;i<10;i++){
		if(userlist[i] == username){
			return i;
		} 
	}
	return -1;
}

/*
mediaStream.type = "mediaStream";

mediaStream.stream = {};


mediaStream.gotStream = function(stream){
  console.log("Received local stream");
  var vid0 = document.getElementById("vid0");
  vid0.src = webkitURL.createObjectURL(stream);
  mediaStream.stream = stream;  
  console.log(JSON.stringify(mediaStream.stream));
}

mediaStream.startLocalStream = function() {
  console.log("Requesting local stream");
  navigator.webkitGetUserMedia({audio:true, video:true},
                               mediaStream.gotStream, function() {});
}

mediaStream.send = function(){
    console.log(JSON.stringify(mediaStream));
    connection.sendMessage(JSON.stringify(mediaStream));
}

mediaStream.getRemoteStream = function(stream){
    var vid1 = document.getElementById("vid1");
    console.log(stream);
    console.log(mediaStream.stream);
    vid1.src = webkitURL.createObjectURL(stream);
}
*/
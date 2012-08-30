/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

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
    
function initialize() {
	 console.log("Initializing...");
	 localVideo = document.getElementById("local");
	 getUserMedia();
	 maybeStart();
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
	 remoteVideo[ i ] = document.getElementById("remote" + i );
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
	
function doCall( i ){
	 console.log("Send offer to peer");
	 var offer = pc[i].createOffer({
		  audio:true, 
		  video:true
	 });
	 pc[i].setLocalDescription(pc[i].SDP_OFFER, offer);
	 console.log(offer);
	 var message = {};
	 message.type = "offer";
	 message.sendTo = "abc";
	 message.sendFrom = login.username;
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

mediaStream.getUserList = function(message){
	var userlist = new Array();
	userlist = message.userList;
	var i = 0;
	while(userlist[i]){
		console.log(userlist[i]);
		userListFunction.innerHTML = userListFunction.innerHTML + "&nbsp"+userlist[i]+"&nbsp<br/>";
		i = i+1;
	}
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
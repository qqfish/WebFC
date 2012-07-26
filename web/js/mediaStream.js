/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
$(function() {
	 $("#user").click(function(){
	    initialize();
	    maybeStart();
	    var message={};
	    message.type = "connect";
           sendMessage(message);
        }
   )
});

var localVideo;
var remoteVideo;
var localStream;
var pc;
var socket;
var started = false;
var mediaStream={};
    
function initialize() {
	 console.log("Initializing...");
	 localVideo = document.getElementById("local");
	 remoteVideo = document.getElementById("remote");
	 resetStatus();
	 getUserMedia();
}
    
function resetStatus() {
	 if(started){
		  setStatus("Waiting for someone to join");
	 }
	 else {
		  setStatus("Initializing...");
	 }
}

function setStatus(state) {
	 document.getElementById("footer").innerHTML = state;
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
		  setStatus("Connecting...");
		  console.log("Create peerconnection.");
		  createPeerconnection();
		  console.log("Add local stream.");
		  pc.addStream(localStream);
		  started = true;
		  //Caller initiates offer to peer.
	 }
}
	
function createPeerconnection(){
	 try {
		  pc = new webkitPeerConnection00('ws://' + window.location.host + '/WebFc/WebFcSocketServlet',onIceCandidate);
		  console.log("Create webkitPeerConnection");
	 } catch( e ){
		  console.log("Failed to create PeerConnection, exception: " + e.message);
		  alert("Cannot create PeerConnection object; Is the 'PeerConnection' flag enabled in about:flags?");
		  return;
	 }
	 pc.onconnecting = onSessionConnecting;
	 pc.onopen = onSessionOpened;
	 pc.onaddstream = onRemoteStreamAdded;
	 pc.onremovestream = onRemoteStreamRemoved;
}
	
function doCall(){
	 console.log("Send offer to peer");
	 remoteVideo.style.opacity = 1;
	 var offer = pc.createOffer({
		  audio:true, 
		  video:true
	 });
	 pc.setLocalDescription(pc.SDP_OFFER, offer);
	 console.log(offer);
	 var message = {};
	 message.type = "offer";
	 message.sdp = offer.toSdp();
	 sendMessage(message);
	 pc.startIce();
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
	 remoteVideo.src = url;
	 waitForRemoteVideo(); 
}

function onRemoteStreamRemoved(event) {
	 console.log("Remote stream removed.");
}
	
function waitForRemoteVideo(){
	 if (remoteVideo.currentTime > 0) {
		  transitionToActive();
	 } else {
		  setTimeout(waitForRemoteVideo, 100);
	 }
}
	
function transitionToActive(){
	 setStatus("<input type=\"button\" id=\"hangup\" value=\"Hang up\" onclick=\"onHangup()\" />");
}
	
function onHangup() {
	 console.log("Hanging up.");
	 localVideo.style.opacity = 0;
	 remoteVideo.style.opacity = 0;
	 started = false;    // Stop processing any message
	 transitionToDone();
	 pc.close();
	 // will trigger BYE from server
	 pc = null;
}
	
function transitionToDone(){
	 setStatus("You have left the call.");
}
	
/*	function getMessage(message){
		 console.log("get message");
		 processSignalingMessage(message);
	}
	
	function processSignalingMessage(message) {
		 var msg = message;
		 console.log(msg);
		  console.log("???");
		 
		 if (msg.type === 'offer') {
			  // Callee creates PeerConnection
			  if (!started)
					maybeStart();
			  pc.setRemoteDescription(pc.SDP_OFFER, new SessionDescription(msg.sdp));
			  doAnswer();
		 } else if (msg.type === 'answer' && started) {
			  pc.setRemoteDescription(pc.SDP_ANSWER, new SessionDescription(msg.sdp));
		 } else if (msg.type === 'candidate' && started) {
			  var candidate = new IceCandidate(msg.label, msg.candidate);
			  pc.processIceMessage(candidate);
		 } else if (msg.type === 'bye' && started) {
			  onRemoteHangup();
		 }
	}
	*/
function do_Offer(socketData){
	 if (!started)
		  maybeStart();
	 var sdp = new SessionDescription(socketData.sdp);
	 pc.setRemoteDescription(pc.SDP_OFFER, sdp);
	 doAnswer();
}
	
function do_Answer(socketData){
	 pc.setRemoteDescription(pc.SDP_ANSWER, new SessionDescription(socketData.sdp));
}
	
function do_Candidate(socketData){
	 var candidate = new IceCandidate(socketData.label, socketData.candidate);
	 pc.processIceMessage(candidate);
}
	
function doAnswer() {
	 console.log("Send answer to peer");
	 var offer = pc.remoteDescription;
	 var answer = pc.createAnswer(offer.toSdp(), {
		  audio:true,
		  video:true
	 });
	 pc.setLocalDescription(pc.SDP_ANSWER, answer);
	 var message = {};
	 message.type = "answer";
	 message.sdp = answer.toSdp();
	 sendMessage(message);
	 pc.startIce();
}
	
function onRemoteHangup() {
	 console.log('Session terminated.');
	 started = false;    // Stop processing any message
	 resetStatus();
	 pc.close();
	 pc = null;
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
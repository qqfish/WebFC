/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

    var localVideo;
    var remoteVideo;
    var localStream;
    var channel;
    var channelReady = false;
    var pc;
    var socket;
    var started = false;
    var mediaStream={};
    
    function initialize() {
        logg("Initializing...");
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
			  navigator.webkitGetUserMedia( {audio:true, video:true}, onUserMediaSuccess,
													 onUserMediaError) ;
		         logg("Requested access to local media with new syntax.") ;
		 } catch( e ) {
			  try {
					navigator.webkitGetUserMedia( "video,audio" , onUserMediaSuccess, 
													 onUserMediaError) ;
					logg("Requested access to local media with old syntax.") ;
			  } catch( e ) {
					alert("webkitGetUserMedia() failed. Is the MediaStream flag enabled in chrome://flags?") ;
					logg("webkitGetUserMedia failed with exception: " + e.message) ;
			  }
		 }
	}
	
	function onUserMediaSuccess(stream){
		 logg("User has granted access to local media.");
		 var url = webkitURL.createObjectURL(stream);
		 localVideo.src = url;
		 localStream = stream;
		 //caller creates Peerconnection.
		 maybeStart();
	}
	
	function onUserMediaError(error){
		 logg("Failed to get access to local media. Error code was " + error.code);
		 alert("Failed to get access to local media. Error code was " + error.code + ".");
	}
	
	function maybeStart(){
		 if( !started && localStream ) {
			  setStatus("Connecting...");
			  logg("Create peerconnection.");
			  createPeerconnection();
			  logg("Add local stream.");
			  pc.addStream(localStream);
			  started = true;
			  //Caller initiates offer to peer.
			  doCall();
		 }
	}
	
	function createPeerconnection(){
		 try {
			  pc = new webkitPeerConnection00("",onIceCandidate);
			  logg("Create webkitPeerConnection");
		 } catch( e ){
			  logg("Failed to create PeerConnection, exception: " + e.message);
			  alert("Cannot create PeerConnection object; Is the 'PeerConnection' flag enabled in about:flags?");
			  return;
		 }
		  pc.onconnecting = onSessionConnecting;
		  pc.onopen = onSessionOpened;
		  pc.onaddstream = onRemoteStreamAdded;
		  pc.onremovestream = onRemoteStreamRemoved;
	}
	
	function doCall(){
		 logg("Send offer to peer");
		 var offer = pc.createOffer({audio:true, video:true});
		 pc.setLocalDescription(pc.SDP_OFFER, offer);
		 var message = {};
		 message.type = "offer";
		 message.sdp = offer.toSdp();
		 connection.sendMessage(JSON.stringify(message));
		 pc.startIce();
	}
	
	function onIceCandidate(candidate, moreToFollow) {
		 logg("get into onIceCandidate.");
		 if (candidate) {
			  var message = {};
			  message.type = "candidate";
			  message.label = candidate.label;
			  message.candidate = candidate.toSdp();
			  connection.sendMessage(JSON.stringify(message));
		 }
		 if (!moreToFollow) {
			  logg("End of candidates.");
		 }
	}
	
	function onSessionConnecting(message) {
		 logg("Session connecting.");
	}
	function onSessionOpened(message) {
		 logg("Session opened.");
	}

	function onRemoteStreamAdded(event) {
		 logg("Remote stream added.");
		 var url = webkitURL.createObjectURL(event.stream);
		 remoteVideo.src = url;
		 waitForRemoteVideo(); 
	}

	function onRemoteStreamRemoved(event) {
		 logg("Remote stream removed.");
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
		 logg("Hanging up.");
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
		 logg("get message");
		 processSignalingMessage(message);
	}
	
	function processSignalingMessage(message) {
		 var msg = message;
		 logg(msg);
		  logg("???");
		 
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
		 logg("Send answer to peer");
		 var offer = pc.remoteDescription;
		 var answer = pc.createAnswer(offer.toSdp(), {audio:true,video:true});
		 pc.setLocalDescription(pc.SDP_ANSWER, answer);
		 var message = {};
		 message.type = "answer";
		 message.sdp = answer.toSdp();
		 connection.sendMessage(JSON.stringify(message));
		 pc.startIce();
	}
	
	function onRemoteHangup() {
		 logg('Session terminated.');
		 started = false;    // Stop processing any message
		 resetStatus();
		 pc.close();
		 pc = null;
	}


/*
mediaStream.type = "mediaStream";

mediaStream.stream = {};


mediaStream.gotStream = function(stream){
  logg("Received local stream");
  var vid0 = document.getElementById("vid0");
  vid0.src = webkitURL.createObjectURL(stream);
  mediaStream.stream = stream;  
  logg(JSON.stringify(mediaStream.stream));
}

mediaStream.startLocalStream = function() {
  logg("Requesting local stream");
  navigator.webkitGetUserMedia({audio:true, video:true},
                               mediaStream.gotStream, function() {});
}

mediaStream.send = function(){
    logg(JSON.stringify(mediaStream));
    connection.sendMessage(JSON.stringify(mediaStream));
}

mediaStream.getRemoteStream = function(stream){
    var vid1 = document.getElementById("vid1");
    logg(stream);
    logg(mediaStream.stream);
    vid1.src = webkitURL.createObjectURL(stream);
}
*/
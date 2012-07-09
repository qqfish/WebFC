/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var logg = function(s) {
    console.log(s);
};

var connection = {};

connection.socket = null;

connection.connect = (function(host) {
    if ('WebSocket' in window) {
	connection.socket = new WebSocket(host);
    } else if ('MozWebSocket' in window) {
	connection.socket = new MozWebSocket(host);
    } else {
	logg('Error: WebSocket is not supported by this browser.');
	return;
    }

    connection.socket.onopen = function () {
	logg('Info: WebSocket connection opened.');
	var test = {
	    "type" : "lalal",
	    "yes":"hi"
	}
	logg(test);
	connection.sendMessage(JSON.stringify(test));
    };

    connection.socket.onclose = function () {
	logg('Info: WebSocket closed.');
    };

    connection.socket.onmessage = function (message) {
	logg(message.data);
	var result = JSON.parse(message.data);
	logg(result)
	logg(message.data);
    };
});

connection.initialize = function() {
    if (window.location.protocol == 'http:') {
	connection.connect('ws://' + window.location.host + '/WebFc/WebFcSocketServlet');
    } else {
	connection.connect('wss://' + window.location.host + '/WebFc/WebFcSocketServlet');
    }
};

connection.sendMessage = function(message) {
    connection.socket.send(message);
};

connection.initialize();



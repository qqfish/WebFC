<<<<<<< HEAD
WebFC
=====

html5 interact communication tools

Json type for websocket:

ErrorMessage : errors from the server
	
	errorWord 

doodleTable : the doodle function from the user
		drawElement
		index

doodlePic : the pic of canvas from a user
		data
		to -- the user id of the pic sending to

requestPic : when a new user enter the room, the server send this message to a user to request the pci of canvas
		from -- the user id of the requesting from	
=======
WebFC
=====

html5 interact communication tools

Json type for websocket:

ErrorMessage : errors from the server
		errorWord 

AlertMessage : some alert
		alertWord

doodleTable : the doodle function from the user
		drawElement
		index

doodlePic : the pic of canvas from a user
		data
		to -- the user name of the pic sending to

requestPic : when a new user enter the room, the server send this message to a user to request the pci of canvas
		from -- the user name of the requesting from

SaveTableDoodle : save the current doodle of table
>>>>>>> upstream/master

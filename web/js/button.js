/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

$(document).ready(function() {	
	 // What should happen to all .button elements when the mouse is over the element?
      $(".button").mouseover( function() {
                  // Add .Hover
                  $(this).addClass("Hover");
				//console.log("over");
       })
 
       // What should happen to all .button elements when the mouse is outside of the element?
       $(".button").mouseout( function() {
                  // Remove .Hover and also remove .Pressed if it was present from a previous action.
                  $(this).removeClass("Hover").removeClass("Pressed");
				//console.log("out");
       })
 
      // What should happen to all .button elements when the mouse button is pressed down?
       $(".button").mousedown( function() {
                  // Add class .Pressed
                  $(this).addClass("Pressed").removeClass("Message");
				//console.log("pressed");
       })
 
      // And finally, what happens when the mouse is released?
      $(".button").mouseup(function()
       {
                  // Remove class .Pressed
                  $(this).removeClass("Pressed");
				//console.log("up");
       })
});


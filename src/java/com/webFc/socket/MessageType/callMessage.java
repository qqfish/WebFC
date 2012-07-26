/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
package com.webFc.socket.MessageType;

/**
 *
 * @author Administrator
 */
public class callMessage {
	 String sendTo;
	 String sendFrom;

	 public callMessage() {
	 }

	 public String getSendFrom() {
		  return sendFrom;
	 }

	 public void setSendFrom(String sendFrom) {
		  this.sendFrom = sendFrom;
	 }

	 public String getSendTo() {
		  return sendTo;
	 }

	 public void setSendTo(String sendTo) {
		  this.sendTo = sendTo;
	 }
	 
}

package com.webFc.socket;

/*
 * To change this template, choose Tools | Templates and open the template in
 * the editor.
 */
import javax.servlet.annotation.WebServlet;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;

/**
 *
 * @author fish
 */
@WebServlet(name = "WebFcSocketServlet", urlPatterns = {"/WebFcSocketServlet"})
public class WebFcSocketServlet extends WebSocketServlet {

    @Override
    protected StreamInbound createWebSocketInbound(String string) {
	return new FcMessageInbound();
    }
}

package com.webFc.socket;

/*
 * To change this template, choose Tools | Templates and open the template in
 * the editor.
 */
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.ByteBuffer;
import java.nio.CharBuffer;
import java.util.Set;
import java.util.concurrent.CopyOnWriteArraySet;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.catalina.websocket.MessageInbound;
import org.apache.catalina.websocket.StreamInbound;
import org.apache.catalina.websocket.WebSocketServlet;
import org.apache.catalina.websocket.WsOutbound;

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

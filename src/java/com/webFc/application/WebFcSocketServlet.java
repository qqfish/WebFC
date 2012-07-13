package com.webFc.application;

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

    protected static Set<FcMessageInbound> connections = new CopyOnWriteArraySet<FcMessageInbound>();

    ;

    @Override
    protected StreamInbound createWebSocketInbound(String string) {
	return new FcMessageInbound();
    }

    private final class FcMessageInbound extends MessageInbound {

	boolean first;

	private FcMessageInbound() {
	    super();
	}

	@Override
	protected void onOpen(WsOutbound outbound) {
	    System.out.println(this.toString() + " ,new connection created");
	    connections.add(this);
	}

	@Override
	protected void onClose(int status) {
	    System.out.println(this.toString() + "closed");
	    connections.remove(this);
	}

	@Override
	protected void onBinaryMessage(ByteBuffer bb) throws IOException {
	    throw new UnsupportedOperationException("Not supported yet.");
	}

	@Override
	protected void onTextMessage(CharBuffer cb) throws IOException {
	    String str = cb.toString();
	    if (str != null && !str.isEmpty()) {
		broadcast(str);
	    }
	}

	private void broadcast(String message) throws IOException {
	    for (FcMessageInbound connection : connections) {
		if (!connection.equals(this)) {
		    CharBuffer buffer = CharBuffer.wrap(message);
		    //System.out.println(connection.toString());
		    connection.getWsOutbound().writeTextMessage(buffer);
		}
	    }
	}
    }
}

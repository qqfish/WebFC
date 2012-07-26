package com.webFc.database;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

public class ReadSQLXml {

    private String host;
    private String username;
    private String password;
    
    public ReadSQLXml(){
	
    }

    public void getInfo() {
	DocumentBuilderFactory domfac = DocumentBuilderFactory.newInstance();
	try {
	    DocumentBuilder dombuilder = domfac.newDocumentBuilder();
	    System.out.println(System.getProperty("user.dir"));
	    InputStream is = new FileInputStream("/home/fish/work/java/WebFC/sql.xml");
	    Document doc = dombuilder.parse(is);
	    Element root = doc.getDocumentElement();
	    NodeList sql = root.getChildNodes();

	    if (sql != null) {
		for (int i = 0; i < sql.getLength(); i++) {
		    Node node = sql.item(i);
		    if (node.getNodeType() == Node.ELEMENT_NODE) {
			if (node.getNodeName().equals("host")) {
			    host = node.getFirstChild().getNodeValue();
			} else if (node.getNodeName().equals("username")) {
			    username = node.getFirstChild().getNodeValue();
			} else if (node.getNodeName().equals("password")) {
			    password = node.getFirstChild().getNodeValue();
			}
		    }
		}
	    }

	} catch (ParserConfigurationException e) {
	    e.printStackTrace();
	} catch (FileNotFoundException e) {
	    e.printStackTrace();
	} catch (SAXException e) {
	    e.printStackTrace();
	} catch (IOException e) {
	    e.printStackTrace();
	}
    }

    public String getHost() {
	return host;
    }

    public String getUsername() {
	return username;
    }

    public String getPassword() {
	return password;
    }
}
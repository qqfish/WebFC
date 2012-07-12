package org.apache.jsp.demo.chat;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class index_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final JspFactory _jspxFactory = JspFactory.getDefaultFactory();

  private static java.util.Vector _jspx_dependants;

  private org.glassfish.jsp.api.ResourceInjector _jspx_resourceInjector;

  public Object getDependants() {
    return _jspx_dependants;
  }

  public void _jspService(HttpServletRequest request, HttpServletResponse response)
        throws java.io.IOException, ServletException {

    PageContext pageContext = null;
    HttpSession session = null;
    ServletContext application = null;
    ServletConfig config = null;
    JspWriter out = null;
    Object page = this;
    JspWriter _jspx_out = null;
    PageContext _jspx_page_context = null;

    try {
      response.setContentType("text/html;charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;
      _jspx_resourceInjector = (org.glassfish.jsp.api.ResourceInjector) application.getAttribute("com.sun.appserv.jsp.resource.injector");

      out.write("\n");
      out.write("\n");
      out.write("\n");
      out.write("<!DOCTYPE html>\n");
      out.write("<!--\n");
      out.write("  Licensed to the Apache Software Foundation (ASF) under one or more\n");
      out.write("  contributor license agreements.  See the NOTICE file distributed with\n");
      out.write("  this work for additional information regarding copyright ownership.\n");
      out.write("  The ASF licenses this file to You under the Apache License, Version 2.0\n");
      out.write("  (the \"License\"); you may not use this file except in compliance with\n");
      out.write("  the License.  You may obtain a copy of the License at\n");
      out.write("\n");
      out.write("      http://www.apache.org/licenses/LICENSE-2.0\n");
      out.write("\n");
      out.write("  Unless required by applicable law or agreed to in writing, software\n");
      out.write("  distributed under the License is distributed on an \"AS IS\" BASIS,\n");
      out.write("  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\n");
      out.write("  See the License for the specific language governing permissions and\n");
      out.write("  limitations under the License.\n");
      out.write("-->\n");
      out.write("<!DOCTYPE html>\n");
      out.write("<html>\n");
      out.write("<head>\n");
      out.write("    <title>Chat-Room</title>\n");
      out.write("    <script type=\"text/javascript\" src=\"jquery.js\"></script>\n");
      out.write("    <link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" />\n");
      out.write("</head>\n");
      out.write("<body class=\"chatWindow\">\n");
      out.write("    <fieldset id=\"frame\" name=\"frame\">\n");
      out.write("        <div id=\"tab\">\n");
      out.write("            <table width=\"359\" height=\"201\" id=\"dialog\">\n");
      out.write("                <tbody style=\"overflow:auto\">\n");
      out.write("                    <tr class=\"dia1\">\n");
      out.write("                        <td></td>\n");
      out.write("                    </tr>\n");
      out.write("\t\t    <tr class=\"dia2\">\n");
      out.write("                        <td></td>\n");
      out.write("                    </tr>\n");
      out.write("\t\t    <tr class=\"dia1\">\n");
      out.write("                        <td></td>\n");
      out.write("                    </tr>\n");
      out.write("\t\t\t\t\t<tr class=\"dia2\">\n");
      out.write("                        <td></td>\n");
      out.write("                    </tr>\n");
      out.write("\t\t\t\t\t<tr class=\"dia1\">\n");
      out.write("                        <td></td>\n");
      out.write("                    </tr>\n");
      out.write("\t\t\t\t\t<tr class=\"dia2\">\n");
      out.write("                        <td></td>\n");
      out.write("                    </tr>\n");
      out.write("\t\t\t\t\t<tr class=\"dia1\">\n");
      out.write("                        <td></td>\n");
      out.write("                    </tr>\n");
      out.write("                </tbody>\n");
      out.write("            </table>\n");
      out.write("        </div >\n");
      out.write("\t\t<ul class=\"namelist\">\n");
      out.write("\t      <li><a name=\"name1\">name1</a></li>\n");
      out.write("            <li><a name=\"name2\">name2</a></li>\n");
      out.write("            <li><a name=\"name3\">name3</a></li>\n");
      out.write("            <li><a name=\"name4\">name4</a></li>\n");
      out.write("            <li><a name=\"name5\">name5</a></li>\n");
      out.write("            <li><a name=\"name6\">name6</a></li>\n");
      out.write("\t  </ul>\n");
      out.write("        <select id=\"colors\" name=\"colors\">\n");
      out.write("          <option>black</option>\n");
      out.write("            <option>red</option>\n");
      out.write("            <option>blue</option>\n");
      out.write("        </select>\n");
      out.write("        <input id=\"input\" placeholder=\"Input area\" name=\"input\" type=\"text\"></input>\n");
      out.write("        <input id=\"send\" name=\"send\" type=\"button\" value=\"send\"></input>\n");
      out.write("    </fieldset>\n");
      out.write("    <canvas id=\"chatButton\" ></canvas>\n");
      out.write("</body>\n");
      out.write("<script type=\"text/javascript\" src=\"main.js\"></script>\n");
      out.write("</html>\n");
    } catch (Throwable t) {
      if (!(t instanceof SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          out.clearBuffer();
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}

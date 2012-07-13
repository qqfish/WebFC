<%-- 
    Document   : index
    Created on : 2012-7-11, 13:04:02
    Author     : FENG
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<!--
  Licensed to the Apache Software Foundation (ASF) under one or more
  contributor license agreements.  See the NOTICE file distributed with
  this work for additional information regarding copyright ownership.
  The ASF licenses this file to You under the Apache License, Version 2.0
  (the "License"); you may not use this file except in compliance with
  the License.  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
-->
<!DOCTYPE html>
<html>
<head>
    <title>Chat-Room</title>
    <script type="text/javascript" src="jquery.js"></script>
    <link rel="stylesheet" type="text/css" href="chat.css" />
</head>
<body class="chatWindow">
    <fieldset id="frame" name="frame">
        <div id="tab">
            <table width="359" height="201" id="dialog">
                <tbody style="overflow:auto">
                    <tr class="dia1">
                        <td></td>
                    </tr>
		    <tr class="dia2">
                        <td></td>
                    </tr>
		    <tr class="dia1">
                        <td></td>
                    </tr>
					<tr class="dia2">
                        <td></td>
                    </tr>
					<tr class="dia1">
                        <td></td>
                    </tr>
					<tr class="dia2">
                        <td></td>
                    </tr>
					<tr class="dia1">
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </div >
		<ul class="namelist">
	      <li><a name="name1">name1</a></li>
            <li><a name="name2">name2</a></li>
            <li><a name="name3">name3</a></li>
            <li><a name="name4">name4</a></li>
            <li><a name="name5">name5</a></li>
            <li><a name="name6">name6</a></li>
	  </ul>
        <select id="colors" name="colors">
          <option>black</option>
            <option>red</option>
            <option>blue</option>
        </select>
        <input id="input" placeholder="Input area" name="input" type="text"></input>
        <input id="send" name="send" type="button" value="send"></input>
    </fieldset>
    <canvas id="chatButton" ></canvas>
</body>
<script type="text/javascript" src="chat.js"></script>
</html>

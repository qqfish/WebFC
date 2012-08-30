/*
名称：HTML5 Canvas 作图函数库
版本：2.0
作者：金海龙(天主教)
博客：http://bigengineer.blog.163.com/
Google搜索：软件工程师 金海龙
类型：Web应用/绘图/源代码
开发平台：WinXP+Google浏览器
功能：为个人开发者提供简单的作图函数，
凡是支持HTML5的浏览器，都能使用这些函数。
*/
function ABLen(A,B)
{
//功能：计算A、B两点之间的距离。
var i;
i=Math.pow((B[0]-A[0]),2)+Math.pow((B[1]-A[1]),2);
i=Math.floor(Math.sqrt(i));
return i;
}

function DrawP(Canvas,P)
{
//在点P处画一个点
with (Canvas)
{
beginPath();
moveTo(P[0],P[1]);
lineTo(P[0]+1,P[1]+1);
closePath();
stroke();
}
}

function DrawLine(Canvas,A,B)
{
//画一条线段,“A、B”是这条线段的端点
with (Canvas)
 {
 beginPath();
 moveTo(A[0],A[1]);
 lineTo(B[0],B[1]);
 closePath();
 stroke();
 }
}

function GetSmallest(A,B)
{
var i,co,i1,i2;
var R=new Array(2);
//返回P中X最小和Y最小的数，然后组成新的点返回
R[0]=A[0];
R[1]=A[1];

if (B[0]<R[0])
{
i1=B[0];
}
else
{
i1=R[0];
}

if (B[1]<R[1])
{
i2=B[1];
}
else
{
i2=R[1];
}

R[0]=i1;
R[1]=i2;

return(R);
}

function GetBiggest(A,B)
{
var i,co,i1,i2;
var R=new Array(2);
//返回P中X最小和Y最小的数，然后组成新的点返回
R[0]=A[0];
R[1]=A[1];

if (B[0]>R[0])
{
i1=B[0];
}
else
{
i1=R[0];
}

if (B[1]>R[1])
{
i2=B[1];
}
else
{
i2=R[1];
}

R[0]=i1;
R[1]=i2;

return(R);
}

function DrawRect(Canvas,A,C)
{
//画个矩形,“A、C”是对顶点
var p1,p2=new Array(2);
p1=GetSmallest(A,C);
p2=GetBiggest(A,C);
with (Canvas)
 {
 beginPath();
 rect(p1[0],p1[1],p2[0]-p1[0],p2[1]-p1[1]);
 closePath();
 stroke();
 }
}

function DrawTriangle(Canvas,A,B,C)
{
//画个三角形,“A、B、C”是顶点
with (Canvas)
 {
 moveTo(A[0],A[1]);
 lineTo(B[0],B[1]);
 lineTo(C[0],C[1]);
 lineTo(A[0],A[1]);
 }
}

function DrawAOB(Canvas,A,O,B)
{
//画个角,“O”是顶点,OA、OB是两条边
with (Canvas)
 {
 moveTo(A[0],A[1]);
 lineTo(O[0],O[1]);
 lineTo(B[0],B[1]);
 }
}

function DrawRoundRect(Canvas,P1,P2,Radius)
{
//画个圆角矩形
var A=new Array(Math.min(P1[0],P2[0]),Math.min(P1[1],P2[1]));
var C=new Array(Math.max(P1[0],P2[0]),Math.max(P1[1],P2[1]));
var B=new Array(A[0],C[1]);
var D=new Array(C[0],A[1]);
Canvas.beginPath();
var P=new Array(A[0],A[1]+Radius);
DrawArcTo(Canvas,P,B,C,Radius);
var P=new Array(B[0]+Radius,B[1]);
DrawArcTo(Canvas,P,C,D,Radius);
var P=new Array(C[0],C[1]-Radius);
DrawArcTo(Canvas,P,D,A,Radius);
var P=new Array(D[0]-Radius,D[1]);
DrawArcTo(Canvas,P,A,B,Radius);

Canvas.stroke();
/*
Canvas.beginPath();
DrawAOBArc(Canvas,C,D,A,Radius);
Canvas.stroke();
Canvas.beginPath();
DrawAOBArc(Canvas,D,A,B,Radius);
Canvas.stroke();
Canvas.endPath();
*/
}

function DrawAOBArc(Canvas,A,O,B,Radius)
{
//画圆角
/* example:
var A=new Array(50,50);
var O=new Array(50,150);
var B=new Array(100,150);

hb.translate(30, 0); 
hb.beginPath();
hb.strokestyle="#000000";
DrawAOBArc(hb,A,O,B,20);
hb.stroke(); 
*/
with (Canvas)
 {
moveTo(A[0],A[1]);
  arcTo(O[0],O[1],B[0],B[1],Radius);
lineTo(B[0],B[1]);
 }
}

function DrawQuadraticCurveTo(Canvas,A,O,B)
{
//画二次样条曲线路径,A:起点；B:终点；O:控制点
with (Canvas)
 {
moveTo(A[0],A[1]);
  bezierCurveTo(O[0],O[1],B[0],B[1]);
 }
}

function DrawbezierCurveTo(Canvas,A,O1,O2,B)
{
//画贝塞尔曲线路径,O1和O2是控制点
with (Canvas)
 {
moveTo(A[0],A[1]);
  bezierCurveTo(O1[0],O1[1],O2[0],O2[1],B[0],B[1]);
 }
}

function DrawArcTo(Canvas,A,O,B,Radius)
{
//画段弧线
with (Canvas)
 {
moveTo(A[0],A[1]);
  arcTo(O[0],O[1],B[0],B[1],Radius);
 }
}

function DrawArc(Canvas,O,Radius,startAngle, endAngle, anticlockwise)
{
//画段弧线,startAngle:起始角度； endAngle：终止角度
//Example: DrawArc(hb,B,50,0,-90,true);//逆时针画弧线
//Example: DrawArc(hb,B,50,0,-90,false);//顺时针画弧线
with (Canvas)
 {
  arc(O[0],O[1],Radius,startAngle*Math.PI/180, endAngle*Math.PI/180, anticlockwise);
 }
}

function DrawCircle(Canvas,O,Radius)
{
//画圆，例子：var B=new Array(150,150); DrawCircle(hb,B,50);
with (Canvas)
 {
	var x=O[0];
	var y=O[1];
    beginPath();
    arc(x, y, Radius, 0, Math.PI*2, true);
    closePath();
    stroke();
 }
}

function DrawEllipse(Canvas,O,OA,OB)
{
//画椭圆，例子：var B=new Array(150,150); DrawEllipse(hb,B,50,30);
with (Canvas)
 {
var x=O[0]+OA;
var y=O[1];
moveTo(x,y);
for (var i=0;i<=360;i++)
{
var ii=i*Math.PI/180;
var x=O[0]+OA*Math.cos(ii);
var y=O[1]-OB*Math.sin(ii);
lineTo(x,y);
}
 }
}

function DrawPolyline(Canvas,P)
{
//绘制不闭合的线，P的长度必须是偶数
/*
var P=new Array(12);
P[0]=10;
P[1]=30;
P[2]=10;
P[3]=80;
P[4]=40;
P[5]=110;
P[6]=80;
P[7]=80;
P[8]=80;
P[9]=30;
P[10]=55;
P[11]=10;
hb.beginPath();
DrawPolyline(hb,P);
hb.stroke(); 
hb.endPath();
*/
var co=P.length;
var i=0;
while (i<co)
{
Canvas.moveTo(P[i],P[i+1]);
Canvas.lineTo(P[i+2],P[i+3]);
i=i+2;
}
}

function DrawPolygon(Canvas,P)
{
//画闭合的多边形
/* example :
var P=new Array(12);
P[0]=10;
P[1]=30;
P[2]=10;
P[3]=80;
P[4]=40;
P[5]=110;
P[6]=80;
P[7]=80;
P[8]=80;
P[9]=30;
P[10]=55;
P[11]=10;
hb.beginPath();
DrawPolygon(hb,P);
hb.stroke(); 
hb.endPath();
*/
var co=P.length-1;
DrawPolyline(Canvas,P)
Canvas.moveTo(P[0],P[1]);
Canvas.lineTo(P[co-1],P[co]);
}












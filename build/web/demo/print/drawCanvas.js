/*
���ƣ�HTML5 Canvas ��ͼ������
�汾��2.0
���ߣ�����(������)
���ͣ�http://bigengineer.blog.163.com/
Google�������������ʦ ����
���ͣ�WebӦ��/��ͼ/Դ����
����ƽ̨��WinXP+Google�����
���ܣ�Ϊ���˿������ṩ�򵥵���ͼ������
����֧��HTML5�������������ʹ����Щ������
*/
function ABLen(A,B)
{
//���ܣ�����A��B����֮��ľ��롣
var i;
i=Math.pow((B[0]-A[0]),2)+Math.pow((B[1]-A[1]),2);
i=Math.floor(Math.sqrt(i));
return i;
}

function DrawP(Canvas,P)
{
//�ڵ�P����һ����
with (Canvas)
{
moveTo(P[0],P[1]);
lineTo(P[0]+1,P[1]+1);
}
}

function DrawLine(Canvas,A,B)
{
//��һ���߶�,��A��B���������߶εĶ˵�
with (Canvas)
 {
 moveTo(A[0],A[1]);
 lineTo(B[0],B[1]);
 }
}

function GetSmallest(A,B)
{
var i,co,i1,i2;
var R=new Array(2);
//����P��X��С��Y��С������Ȼ������µĵ㷵��
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
//����P��X��С��Y��С������Ȼ������µĵ㷵��
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
//��������,��A��C���ǶԶ���
var p1,p2=new Array(2);
p1=GetSmallest(A,C);
p2=GetBiggest(A,C);
with (Canvas)
 {
 rect(p1[0],p1[1],p2[0]-p1[0],p2[1]-p1[1]);
 }
}

function DrawTriangle(Canvas,A,B,C)
{
//����������,��A��B��C���Ƕ���
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
//������,��O���Ƕ���,OA��OB��������
with (Canvas)
 {
 moveTo(A[0],A[1]);
 lineTo(O[0],O[1]);
 lineTo(B[0],B[1]);
 }
}

function DrawRoundRect(Canvas,P1,P2,Radius)
{
//����Բ�Ǿ���
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
//��Բ��
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
//��������������·��,A:��㣻B:�յ㣻O:���Ƶ�
with (Canvas)
 {
moveTo(A[0],A[1]);
  bezierCurveTo(O[0],O[1],B[0],B[1]);
 }
}

function DrawbezierCurveTo(Canvas,A,O1,O2,B)
{
//������������·��,O1��O2�ǿ��Ƶ�
with (Canvas)
 {
moveTo(A[0],A[1]);
  bezierCurveTo(O1[0],O1[1],O2[0],O2[1],B[0],B[1]);
 }
}

function DrawArcTo(Canvas,A,O,B,Radius)
{
//���λ���
with (Canvas)
 {
moveTo(A[0],A[1]);
  arcTo(O[0],O[1],B[0],B[1],Radius);
 }
}

function DrawArc(Canvas,O,Radius,startAngle, endAngle, anticlockwise)
{
//���λ���,startAngle:��ʼ�Ƕȣ� endAngle����ֹ�Ƕ�
//Example: DrawArc(hb,B,50,0,-90,true);//��ʱ�뻭����
//Example: DrawArc(hb,B,50,0,-90,false);//˳ʱ�뻭����
with (Canvas)
 {
  arc(O[0],O[1],Radius,startAngle*Math.PI/180, endAngle*Math.PI/180, anticlockwise);
 }
}

function DrawCircle(Canvas,O,Radius)
{
//��Բ�����ӣ�var B=new Array(150,150); DrawCircle(hb,B,50);
with (Canvas)
 {
var x=O[0]+Radius;
var y=O[1];
moveTo(x,y);
for (var i=0;i<=360;i++)
{
var ii=i*Math.PI/180;
x=O[0]+Radius*Math.cos(ii);
y=O[1]-Radius*Math.sin(ii);
lineTo(x,y);
}//over for
 }//over with
}//finished!

function DrawEllipse(Canvas,O,OA,OB)
{
//����Բ�����ӣ�var B=new Array(150,150); DrawEllipse(hb,B,50,30);
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
//���Ʋ��պϵ��ߣ�P�ĳ��ȱ�����ż��
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
//���պϵĶ����
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












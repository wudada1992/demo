function Bullet(){
	this.ox;            //子弹发射时的初始x
	this.oy;            //子弹发射时的初始y
	this.x;             //当前坐标x
	this.y;             //当前坐标y
	this.w;              //图宽
	this.h;              //图高
	this.dx;            //x方向每一步移动距离，正负
	this.dy;            //y方向每一步移动距离，正负
	this.l;              //射程
	this.nl;             //当前子弹飞行的距离
	this.speed;           //子弹飞行速度
	this.angle;          //子弹朝向
	this.img=new Image();           //子弹图片
}
Bullet.prototype.init=function(e){
	//初始化信息
	this.ox=p.x;           //子弹初始位置是人的位置
	this.oy=p.y;           //子弹初始位置是人的位置
	this.x=this.ox;       
	this.y=this.oy;
	this.w=40;
	this.h=40;
	this.l=300;      //射程300
	this.nl=0;
	this.speed=20;
	this.img.src="../img/canvas/bullet.png";
	//需要计算的初始化信息
	var deltaX=e.offsetX-this.ox;       //子弹起点和鼠标之间x轴距离，正负
	var deltaY=e.offsetY-this.oy;        //子弹起点和鼠标之间Y轴距离，正负
	var l=Math.sqrt(Math.pow(Math.abs(deltaX),2)+Math.pow(Math.abs(deltaY),2));    //计算子弹起点和鼠标点击处斜距离，正值
	
	this.dx=this.speed*deltaX/l;       //x方向每一步移动距离,正负
	this.dy=this.speed*deltaY/l;       //y方向每一步移动距离，正负
	this.angle=Math.atan2(deltaY,deltaX);   //箭头朝向
}
Bullet.prototype.draw=function(){
	//移动子单位置
	this.x+=this.dx;   
	this.y+=this.dy;
	//判断超出射程
	this.nl=Math.sqrt(Math.pow(Math.abs(this.x-this.ox),2)+Math.pow(Math.abs(this.y-this.oy),2));     //当前子弹将要飞行距离，如果这个距离超过射程，销毁子弹
	if(this.nl>this.l){
		bulSet.delete(this);
		console.log(bulSet);
	}
	//canvas绘制
    ctx.save();
    ctx.translate(this.x,this.y);
    ctx.rotate(this.angle);
	ctx.drawImage(this.img,-this.w,-this.h*0.5,this.w,this.h);
	ctx.restore();   //使里面设置不影响外面
}

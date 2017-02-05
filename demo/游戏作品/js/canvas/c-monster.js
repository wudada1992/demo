//怪兽对象
function Monster(){
	this.alive=[];             //是否活着
	this.x=[];                //x坐标
	this.y=[];                  //y坐标
	this.w=[];                  //图宽
	this.h=[];                  //图高
	this.atr=[];                //攻击范围
	this.speed=[];              //速度(实际移动距离)
	this.angle=[];                //怪物朝向
	this.m1=new Image();       //第一种怪物的图片
	
}
Monster.prototype.num=0;
Monster.prototype.init=function(){
	for(var i=0;i<this.num;i++){    //初始化每一个怪物的信息
		this.alive[i]=true;  
		this.x[i]=0;
		this.y[i]=0;
		this.w[i]=50;
		this.h[i]=50;
		this.atr[i]=30;
		this.speed[i]=1;        
		this.angle[i]=0;       //旋转角度
		this.born(i);          //出生位置
	}
	this.m1.src="../img/canvas/m-green1.png";
}
Monster.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		var deltaY=p.y-this.y[i];           //y方向怪物和人的距离，正负值决定方向
	    var deltaX=p.x-this.x[i];          //x方向怪物和人的距离，正负值决定方向
		var l=Math.sqrt(Math.pow(Math.abs(deltaX),2)+Math.pow(Math.abs(deltaY),2));    //计算怪物和人的距离
		
		//怪物位置移动
		var dy=this.speed[i]*deltaY/l;      //计算出y方向每步移动距离
		var dx=this.speed[i]*deltaX/l;      //计算出x方向每步移动距离
		if(l<this.atr[i]){           //如果距离小于怪物攻击范围，怪不原地不动，并攻击
			
		}else{          //如果距离大于攻击范围，怪物移动
			this.y[i]+=dy;
			this.x[i]+=dx;
		}
		
		//怪物转向对准人物
	    this.angle[i]=Math.atan2(deltaY,deltaX)+Math.PI/2;  
	    
	    //canvas绘制
	    ctx.save();
	    ctx.translate(this.x[i],this.y[i]);
		ctx.rotate(this.angle[i]);
		ctx.drawImage(this.m1,-this.w[i]*0.5,-this.h[i]*0.5,this.w[i],this.h[i]);
		ctx.restore();   //使里面设置不影响外面
	}
}
Monster.prototype.born=function(i){
	this.x[i]=0;
	this.y[i]=0;
}
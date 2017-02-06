//怪兽对象
class Monster{
	constructor(){
		//可以定制的属性
		this.atr=30;                //攻击范围
		this.speed=1;              //移动速度(实际移动距离)
		this.img=new Image();       //怪物的图片
		this.img.src="../img/canvas/m-green1.png";
		this.born();
		
		//不需要定制的
		this.w=50;                  //图宽
		this.h=50;                  //图高
		this.angle=0;                //怪物朝向
	}
	draw(){
		var deltaY=p.y-this.y;           //y方向怪物和人的距离，正负值决定方向
	    var deltaX=p.x-this.x;          //x方向怪物和人的距离，正负值决定方向
		var l=Math.sqrt(Math.pow(Math.abs(deltaX),2)+Math.pow(Math.abs(deltaY),2));    //计算怪物和人的距离
		
		//怪物位置移动
		var dy=this.speed*deltaY/l;      //计算出y方向每步移动距离
		var dx=this.speed*deltaX/l;      //计算出x方向每步移动距离
		if(l<this.atr){           //如果距离小于怪物攻击范围，怪不原地不动，并攻击
			
		}else{          //如果距离大于攻击范围，怪物移动
			this.y+=dy;
			this.x+=dx;
		}
		
		//怪物转向对准人物
	    this.angle=Math.atan2(deltaY,deltaX)+Math.PI/2;  
	    
	    //canvas绘制
	    ctx.save();
	    ctx.translate(this.x,this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.img,-this.w*0.5,-this.h*0.5,this.w,this.h);
		ctx.restore();   //使里面设置不影响外面
	}
	death(){           //怪物死亡
		monSet.delete(this);
	}
	born(){
		var r1=Math.random();     //产生一个随机数，如果小于等于0.5，怪物从左右两侧生成，否则从上下生成
		var r2=Math.random();      //第二个随机数，用于辅助决定到底从哪一边生成怪物
		if(r1<=0.5){   //怪物从左右两侧生成
			if(r2<=0.5){    //左
				this.x=0;
			}else{       //右
				this.x=canWidth;
			}
			this.y=canHeight*Math.random();
		}else{        //怪物从上下两侧生成
			if(r2<=0.5){        //上
				this.y=0;
			}else{        //下
				this.y=canHeight;
			}
			this.x=canWidth*Math.random();
		}
	}
}
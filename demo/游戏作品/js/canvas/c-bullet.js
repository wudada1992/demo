class Bullet{
	constructor(e){
		//可以定制的属性
		this.w=50;              //图宽
		this.h=50;              //图高
		this.l=500;              //射程
		this.speed=20;           //子弹飞行速度
		this.img=new Image();           //子弹图片
		this.img.src="../img/canvas/bullet.png";
		this.damage=1;           //子弹攻击力
		//不需要定制
		this.ox=p.x;            //子弹发射时的初始x
		this.oy=p.y;            //子弹发射时的初始y
		this.x=this.ox;             //当前坐标x
		this.y=this.oy;             //当前坐标y
		this.nl=0;             //当前子弹飞行的距离
		let deltaX=e.offsetX-this.ox;       //子弹起点和鼠标之间x轴距离，正负
		let deltaY=e.offsetY-this.oy;        //子弹起点和鼠标之间Y轴距离，正负
		let l=Math.sqrt(Math.pow(Math.abs(deltaX),2)+Math.pow(Math.abs(deltaY),2));    //计算子弹起点和鼠标点击处斜距离，正值
		this.angle=Math.atan2(deltaY,deltaX);          //子弹朝向
		this.dx=this.speed*deltaX/l;            //x方向每一步移动距离，正负
		this.dy=this.speed*deltaY/l;            //y方向每一步移动距离，正负
	}
	draw(){
		//当前位置碰撞检测
		for(let value of monSet){   //遍历所有怪物
			let l=Math.sqrt(Math.pow(Math.abs(this.x-value.x),2)+Math.pow(Math.abs(this.y-value.y),2));   //子弹和怪物的距离
			if(l<value.w*0.5){          //如果子弹和怪物的距离小于怪物宽度的一半，射中
				value.hp-=this.damage;   //怪物的生命值减去子弹的攻击力
				if(value.hp<=0){            //如果怪物没血了
					value.death();          //怪物死亡
				}
				this.death();         //子弹死亡
				return;              //子弹死亡，不需要继续往下读了
			}
		}
		this.move();            //子弹将要移动到的位置
		//判断超出射程
		this.nl=Math.sqrt(Math.pow(Math.abs(this.x-this.ox),2)+Math.pow(Math.abs(this.y-this.oy),2));     //当前子弹将要飞行距离，如果这个距离超过射程，销毁子弹
		if(this.nl>this.l){
			this.death();
			return;
		}
		
		//canvas绘制
	    ctx.save();
	    ctx.translate(this.x,this.y);
	    ctx.rotate(this.angle);
		ctx.drawImage(this.img,-this.w,-this.h*0.5,this.w,this.h);
		ctx.restore();   //使里面设置不影响外面
	}
	//子弹出生
	born(){
		
	}
	//子弹死亡
	death(){
		bulSet.delete(this);
	}
	//子弹移动
	move(){
		this.x+=this.dx;   
		this.y+=this.dy;
	}
}


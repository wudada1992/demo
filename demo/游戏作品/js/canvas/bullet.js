class Bullet{
	constructor(e){
		//可以定制的属性
		this.w=50;              //图宽
		this.h=50;              //图高
		this.l=500;              //射程
		this.speed=20;           //子弹飞行速度
		this.img=new Image();           //子弹图片
		this.img.src="../img/canvas/bullet.png";
		this.cr=false;            //子弹是否暴击，如果直接设为true，则不再进行计算，必定暴击
		this.nb=true;            //子弹是否为击退弹，false代表不是
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
		this.init();          //添加需要计算的复杂属性
	}
	init(){
		this.crFn();            //判断子弹是否是暴击
	}
	draw(){
		//当前位置碰撞检测
		for(let value of monSet){   //遍历所有怪物
			let l=Math.sqrt(Math.pow(Math.abs(this.x-value.x),2)+Math.pow(Math.abs(this.y-value.y),2));   //子弹和怪物的距离
			if(l<value.b&&value.hp>0){          //射中，如果子弹和怪物的距离小于怪物的肥胖程度并且怪物还有血（没血时有一段时间在演示死亡动画，此时不应该可以射中），射中
				//显示血条
				value.hpNum=1;
				//掉血（受暴击影响）
				if(this.cr==true){        //如果当前子弹是暴击，攻击力双倍
					value.hp-=p.damage*2;
					value.pNum=1;            //在怪物身上标记显示pow图片
				}else{                    //如果没有暴击，攻击力正常
					value.hp-=p.damage;
				}
				//判断击退
				if(this.nb===true){       //如果是击退弹，改变怪物状态为击退状态
					value.status="knockback";
				}
				//判断怪物血量
				if(value.hp<=0){            //如果怪物没血了
					value.death();          //怪物死亡(写在击退状态之后，一旦死亡则死亡状态覆盖掉击退状态)
				}
				//射中后子弹直接死亡
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
		//canvas绘制子弹
	    this.drawFn();
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
	//判断子弹是否暴击，根据人物的暴击几率
	crFn(){
		 if(this.cr==false){     //如果没有被直接设为true，则进行判断
		 	let n=Math.random();
		 	if(n<p.cri){    //如果随机到的数小于人物暴击率[0-1],暴击
		 		this.cr=true;
		 	}
		 }
	}
	drawFn(){
		ctx.save();
	    ctx.translate(this.x,this.y);
	    ctx.rotate(this.angle);
		ctx.drawImage(this.img,-this.w,-this.h*0.5,this.w,this.h);
		ctx.restore();   //使里面设置不影响外面
	}
}


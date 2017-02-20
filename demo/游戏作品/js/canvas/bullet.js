class Bullet{
	constructor(e,obj,d){    //e是鼠标信息；obj是子弹信息对象 ；如果传入了d，则子弹是散弹的偏转弹，this.angle根据d的值会有相应偏转
		//可以定制的属性
		this.w=40;              //图宽
		this.h=40;              //图高
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
		this.deltaX=e.offsetX-this.ox;       //子弹起点和鼠标之间x轴距离，正负
		this.deltaY=e.offsetY-this.oy;        //子弹起点和鼠标之间Y轴距离，正负
		let l=Math.sqrt(Math.pow(Math.abs(this.deltaX),2)+Math.pow(Math.abs(this.deltaY),2)); //计算子弹起点和鼠标点击处斜距离，正值
		this.angle=Math.atan2(this.deltaY,this.deltaX);        //子弹朝向
		this.d=d;                               //传入的偏转量，默认undefined
		this.dx=this.speed*this.deltaX/l;            //x方向每一步移动距离，正负
		this.dy=this.speed*this.deltaY/l;            //y方向每一步移动距离，正负
		this.init(e);          //添加需要计算的复杂属性
	}
	init(e){
		this.crFn();            //判断子弹是否是暴击
		this.vastFn(e);         //判断是否是散弹的偏转弹
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
		if(this.nl>p.atr){
			this.death();
			return;
		}
		//canvas绘制子弹
	    this.drawFn();
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
	//判断子弹是否暴击，根据人物的暴击几率,init初始化用到
	crFn(){
		if(this.cr==false){     //如果没有被直接设为true，则进行判断
		 	let n=Math.random();
		 	if(n<p.cri){    //如果随机到的数小于人物暴击率[0-1],暴击
		 		this.cr=true;
		 	}
		}	 
	}
	//判断是否是散弹的偏转弹，init初始化用到
	vastFn(e){
		if(this.d){          //如果传入了d，为偏转弹，重定义e.offsetX、Y，然后根据值给各个相关属性赋值
			//计算虚拟鼠标坐标
			let x=e.offsetX-this.ox;     //子弹起点和鼠标之间x轴距离，正负
			let y=e.offsetY-this.oy;     //子弹起点和鼠标之间y轴距离，正负
			let l=Math.sqrt(Math.pow(Math.abs(x),2)+Math.pow(Math.abs(y),2));    //计算子弹起点和鼠标点击处斜距离，正值
			let angle=Math.atan2(y,x);        //正常角
			let angle1=angle+this.d;         //偏移后的角
			let x1=l*Math.cos(angle1);        //偏移后子弹起点和虚拟鼠标之间x轴距离，正负
			let y1=l*Math.sin(angle1);        //偏移后子弹起点和虚拟鼠标之间y轴距离，正负
			let X=this.ox+x1;              //虚拟鼠标x坐标
			let Y=this.oy+y1;              //虚拟鼠标y坐标
			//用虚拟点的各项属性覆盖正常点的各项属性
			this.dx=this.speed*x1/l;
			this.dy=this.speed*y1/l;
			this.angle=angle1;
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


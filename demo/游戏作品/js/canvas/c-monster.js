//怪兽对象
class Monster{
	constructor(){
		//可以定制的属性
		this.name="fox";            //怪物名字
		this.atr=30;                //攻击范围
		this.speed=3;              //移动速度(实际移动距离)
		this.hp=1;                  //生命值
		this.w=150;                  //图宽
		this.h=150;                  //图高
		this.b=20;                   //怪物的肥胖程度，单位px，决定命中角度大小
		this.imgsRunAll=10;         //怪物跑动图片有几张
		this.imgsHitAll=0;          //怪物攻击图片有几张
		this.imgsInjuredAll=0;        //怪物受伤有几张图片
		this.imgsDeathAll=0;          //怪物死亡图片有几张
		//不需要定制的
		this.x;                     //当前x坐标
		this.y;                     //当前y坐标
		this.angle=0;                //怪物朝向
		this.status="run";          //怪物状态
		this.img;                   //怪物将要显示的下一张图片,存的是图片不是src
		this.imgsRun=[];          //怪物跑动图片,存的是图片
		this.runNow=0;        //记录跑动当前在第几张图片
		this.imgsHit=[];         //怪物攻击图片,存的是图片
		this.hitNow=0;        //记录攻击当前在第几张图片
		this.imgsDeath=[];         //怪物死亡图片,存的是图片
		this.deathNow=0;        //记录死亡当前在第几张图片
		this.imgsInjured=[];      //怪物受伤图片,存的是图片
		this.injuredNow=0;        //记录受伤当前在第几张图片
		this.init()      //初始化（需要计算后添加的自身属性）
	}
	init(){
		this.born();                 //为当前实例添加位置坐标xy，并初始化在出生点
		this.creatImgs();                 //添加当前实例的所有图片地址，到自己身上
	}
	draw(){
		let deltaY=p.y-this.y;           //y方向怪物和人的距离，正负值决定方向
	    let deltaX=p.x-this.x;          //x方向怪物和人的距离，正负值决定方向
		let l=Math.sqrt(Math.pow(Math.abs(deltaX),2)+Math.pow(Math.abs(deltaY),2));    //计算怪物和人的距离
		
		//怪物位置移动
		let dy=this.speed*deltaY/l;      //计算出y方向每步移动距离
		let dx=this.speed*deltaX/l;      //计算出x方向每步移动距离
		if(l<this.atr){           //如果距离小于怪物攻击范围，怪不原地不动，并攻击
			
		}else{          //如果距离大于攻击范围，怪物移动
			this.y+=dy;
			this.x+=dx;
		}
		
		//计算怪物与人的角度
	    this.angle=Math.atan2(deltaY,deltaX)+Math.PI/2;  
	    this.nextImg();
	    //canvas绘制
	    ctx.save();
	    ctx.translate(this.x,this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.img,-this.w*0.5,-this.h*0.5,this.w,this.h);
		ctx.restore();   //使里面设置不影响外面
		
	}
	born(){
		let r1=Math.random();     //产生一个随机数，如果小于等于0.5，怪物从左右两侧生成，否则从上下生成
		let r2=Math.random();      //第二个随机数，用于辅助决定到底从哪一边生成怪物
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
	death(){           //怪物死亡
		monSet.delete(this);
	}
	creatImgs(){          //添加当前怪物的所有图片
		
		//添加跑动状态的图片
		for (let i = 0; i <this.imgsRunAll; i++) {
			let img=new Image();
			img.src='../img/canvas/monster/'+this.name+'/run/'+i+'.png';
			this.imgsRun.push(img);
		}
		//添加攻击状态的图片
		for (let i = 0; i <this.imgsHitAll; i++) {
			let img=new Image();
			img.src='../img/canvas/monster/'+this.name+'/hit/'+i+'.png';
			this.imgsHit.push(img);
		}
		//添加受伤状态的图片
		for (let i = 0; i <this.imgsInjuredAll; i++) {
			let img=new Image();
			img.src='../img/canvas/monster/'+this.name+'/injured/'+i+'.png';
			this.imgsInjured.push(img);
		}
		//添加死亡状态的图片
		for (let i = 0; i <this.imgsDeathAll; i++) {
			let img=new Image();
			img.src='../img/canvas/monster/'+this.name+'/death/'+i+'.png';
			this.imgsDeath.push(img);
		}
	}
	nextImg(){          //决定下一张图片是什么
		if(this.status=="run"){          //如果当前是跑动状态
			this.img=this.imgsRun[this.runNow];
			this.runNow=(this.runNow+1)%this.imgsRunAll;   //取模循环跑动
		}
	}
}
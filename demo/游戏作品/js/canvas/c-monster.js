//怪兽对象
class Monster{
	constructor(){
		//可以定制的属性
		this.name="pig";            //怪物名字
		this.status="run";          //怪物状态
		this.face="r";              //怪物朝向
		this.runImgNum=8;        //怪物跑动序列帧每个方向有几张图
		this.imgNum=8;            //当前状态下序列帧有几张图
		this.imgNumNow=0;      //记录当前状态下图片播放到第几张了，切换状态时记得清零这个数，以便切回来时从头播放动画。
		this.imgSet=new Set;      //存储当前图片们
		this.img=new Image();       //下一帧怪物应当展示的图片
		
		
		this.atr=30;                //攻击范围
		this.speed=3;              //移动速度(实际移动距离)
		this.born();                 //执行方法，为当前实例添加位置坐标xy，并初始化在出生点。
		this.hp=2;                  //生命值
		//不需要定制的
		this.w=50;                  //图宽
		this.h=50;                  //图高
		this.angle=0;                //怪物朝向
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
	    //决定img
	    this.imgs();              //执行方法，决定this.imgSet里面的图片路径
	    this.img.src=[...this.imgSet][this.imgNumNow];   //给图片赋路径
	    this.imgNumNow++;
	    this.imgNumNow%=this.imgNum;
	    
	    //canvas绘制
	    ctx.save();
	    ctx.translate(this.x,this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.img,-this.w*0.5,-this.h*0.5);
		ctx.restore();   //使里面设置不影响外面
		
	}
	death(){           //怪物死亡
		monSet.delete(this);
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
	imgs(){          //决定什么怪物、什么状态下、哪个方向的序列帧图
		this.imgSet.clear();    //每次决定前先清空
		//判断八方向
		let n=this.angle;
		if(n>-0.375&&n<=0.375){     //右
			this.face="r";
		}
		if(n>0.375&&n<=1.125){     //右下
			this.face="rb";
		}
		if(n>1.125&&n<=1.875){     //下
			this.face="b";
		}
		if(n>1.875&&n<=2.625){     //左下
			this.face="lb";
		}
		if(n>2.625&&n<=3||n>=-3&&n<=-2.625){     //左
			this.face="l";
		}
		if(n>-2.625&&n<=-1.875){     //左上
			this.face="lt";
		}
		if(n>-1.875&&n<=-1.125){     //上
			this.face="t";
		}
		if(n>-1.125&&n<=-0.375){     //右上
			this.face="rt";
		}
		//生成新的imgSet
			//根据当前状态决定图片张数
		if(this.status=="run"){    //跑动状态
			this.imgNum=this.runImgNum;
		}
		for(let i=0;i<this.imgNum;i++){    //向imgSet里添加图面路径
			let str='../img/canvas/monster/'+this.name+'/'+this.status+'/'+this.face+'/'+i+'.png';
			this.imgSet.add(str);
		}
	}
}
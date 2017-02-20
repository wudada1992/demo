//人物对象
class Player{
	constructor(){
		//可以定制的
		this.name="archer";      //名字弓箭手
		this.maxHp=100;          //人物血量上限
		this.shot=0;                 //每次攻击发射几颗子弹
		this.damage=1;           //子弹攻击力
		this.atr=500;             //攻击范围
		this.cri=0.5;             //暴击率
		this.rate=0.1;     //射击速度,单位是秒
		this.speed=2;     //移动速度（实际移动距离）
		this.imgsStandAll=50;      //一共有几张站立图片
		this.imgsRunAll=32;        //一共有几张奔跑图片
		this.imgsAtkAll=44;          //一共有几张人物站立时攻击图片
		this.img=new Image;
//Object.assign()用来覆盖对象,es7.   es6直接用 class a extends b 来继承class
		//不需要定制的
		this.status;          //人物状态
		this.scratchNum=0;   //显示抓痕计数，为0时不显示抓痕，不为0时为循环显示抓痕状态。（动物攻击时将此数设为1），循环到设定之后然后自动归零
		this.hp=this.maxHp; //人物当前hp
		this.w=150;       //图宽
		this.h=150;       //图高
		this.x=canWidth*0.5;       //x坐标
		this.y=canHeight*0.5;       //y坐标
		this.canFire=true;   //是否可以射击   ，布尔值，开关作用
		this.angle=0;      //旋转角度
		this.scratchImg=new Image();    //抓痕图片
		this.hpImg=new Image();
		this.imgsStand=[];            //人物站立图片
		this.standNow=0;              //当前播放到站立图片的第几张
		this.imgsRun=[];            //人物奔跑图片
		this.runNow=0;              //当前播放到奔跑图片的第几张
		this.imgsAtk=[];            //人物站立时攻击图片
		this.atkNow=0;              //当前播放到站立时攻击图片的第几张
		this.atk=0;                  //一旦此值不为0，代表正在演示站立时攻击动画，动画演示完成自动转换到跑动状态
		this.init();
	}
	init(){
		//添加图片到身上
		this.creatImgs();
	}
	draw(){
		//计算移动距离（通过监听keySet），判断站、走状态
		this.move();
		//角度跟随鼠标
		let deltaY=my-this.y;
	    let deltaX=mx-this.x;
	    this.angle=Math.atan2(deltaY,deltaX)+Math.PI/2;  
	    //根据状态决定this.img
	    this.imgFn();
	    //绘制
		ctx.save();     //使里面设置不影响外面
		ctx.translate(this.x,this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.img,-this.w*0.5,-this.h*0.5,this.w,this.h);
		ctx.restore();   //使里面设置不影响外面
		//判断是否显示抓痕
		this.showScratch();
		//判断是否显示血条
		this.showHp();
	}
	move(){
		if(keySet.size){   //如果按键数组里面有内容，奔跑状态
			this.status="run";
			if(keySet.has("l")){    //左
				if(keySet.size==1){   //只按下一个方向键
					this.x-=this.speed;
				}else{      ////按下两个方向键
					this.x-=this.speed/2*Math.sqrt(2);    //保证斜着距离为speed
				}
				if(this.x<0){       //如果靠近左边界，不要超出边界
					this.x=0;
				}
			}
			if(keySet.has("r")){    //右
				if(keySet.size==1){   
					this.x+=this.speed;
				}else{      //斜着走
					this.x+=this.speed/2*Math.sqrt(2);    
				}
				if(this.x>canWidth){
					this.x=canWidth;
				}
			}
			if(keySet.has("t")){    //上
				if(keySet.size==1){   
					this.y-=this.speed;
				}else{      //斜着走
					this.y-=this.speed/2*Math.sqrt(2);    
				}
				if(this.y<0){
					this.y=0;
				}
			}
			if(keySet.has("b")){    //下
				if(keySet.size==1){   
					this.y+=this.speed;
				}else{      //斜着走
					this.y+=this.speed/2*Math.sqrt(2);    
				}
				if(this.y>canHeight){
					this.y=canHeight;
				}
			}
		}else{          //站立状态        
			this.status="stand";
		}
		
	}
	reFire(){                  //根据射速重新变为可以射击状态
		setTimeout(()=>{              //es6写法，箭头函数，为了this不指向window
//	        console.log(this);        //这里的this指向p实例
			this.canFire=true;
		},this.rate*1000)
	}
	showScratch(){       //判断是否显示抓痕
		if(this.scratchNum!==0){    //如果不为0，显示抓痕（动物攻击时会将此值设为1）
			//绘制抓痕
			ctx.save();
		    ctx.translate(this.x,this.y);
			ctx.drawImage(this.scratchImg,      0    ,0       ,214  ,  100  , -25   ,-12     ,50  ,25);   
			              //图片                           开始裁切x位      开始裁切y位   裁切宽      裁切高     x轴偏移量   y轴偏移量        图片宽    图片高
			ctx.restore(); 
			//绘制全局红色背景
            ctx.save();
            ctx.beginPath(); 
            ctx.fillStyle="rgba(255,0,0,0.4)";/*设置填充颜色*/ 
            ctx.fillRect(0,0,canWidth,canHeight);/*绘制一个矩形，前两个参数决定开始位置，后两个分别是矩形的宽和高*/ 
            ctx.restore();
            //循环计数判断
			this.scratchNum++;
			if(this.scratchNum>30){   //攻击完成，图片自动消失
				this.scratchNum=0;
			}
		}
	}
	showHp(){             //显示hp
	    if(this.hp<0){
			this.hp=0;
		}
		ctx.save();
		ctx.translate(this.x,this.y);
		ctx.drawImage(this.hpImg  ,0    ,0       ,55  ,8    , -50     ,-50    ,100    ,6);   //灰色底图
			           //图片        开始裁切x位   开始裁切y位   裁切宽      裁切高     x轴偏移量   y轴偏移量     图片宽    图片高
		ctx.drawImage(this.hpImg  ,55  ,0        ,54  ,8    , -50     ,-50    ,this.hp/this.maxHp*100,6);   //绿色血条              
		ctx.restore();   	
	}
	imgFn(){              //根据状态决定下一张img
		if(this.status==="stand"){   //站立
			this.img=this.imgsStand[this.standNow];
			this.standNow++;
			this.standNow%=this.imgsStandAll;
		}
		if(this.status==="run"){   //奔跑
			this.img=this.imgsRun[this.runNow];
			this.runNow++;
			this.runNow%=this.imgsRunAll;
		}
	}
	creatImgs(){
		//添加站立状态的图片
		for (let i = 0; i <this.imgsStandAll; i++) {
			let img=new Image();
			img.src='../img/canvas/hero/'+this.name+'/stand/'+i+'.png';
			this.imgsStand.push(img);
		}
		//添加奔跑状态的图片
		for (let i = 0; i <this.imgsRunAll; i++) {
			let img=new Image();
			img.src='../img/canvas/hero/'+this.name+'/run/'+i+'.png';
			this.imgsRun.push(img);
		}
		//添加站立时攻击的图片
		for (let i = 0; i <this.imgsAtkS; i++) {
			let img=new Image();
			img.src='../img/canvas/hero/'+this.name+'/atks/'+i+'.png';
			this.imgsAtkS.push(img);
		}
		//抓痕
		this.scratchImg.src="../img/canvas/skill/scratch.png";
		//hp图片
		this.hpImg.src="../img/canvas/hero/hp.png";
	}
}

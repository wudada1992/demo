//人物对象
class Player{
	constructor(obj){          
//		obj={
//			atk:0,
//			speed:1
//		}
		//可以定制的
		this.damage=5+obj.atk*obj.atk+obj.atkB*2;           //人物攻击力
		this.speed=1+obj.speed*obj.speed*0.2;     //移动速度（实际移动距离）
		this.maxHp=200+obj.hp*obj.hp*50;          //人物血量上限
		this.atr=500+obj.atr*obj.atr*50;             //攻击范围
		this.coe=obj.atkB===0?1:(2-obj.atkB*0.3);   //受伤系数
		this.cri=obj.cri*obj.cri*0.1;             //暴击率
		this.nb=0+obj.nb*2;            //子弹击退等级
		this.rate=1-obj.rate*0.1;     //射击速度,单位是秒
		this.thump=obj.thump;         //百步穿杨
		this.shot=0+obj.vast*2+obj.num*2;   //每次攻击发射几颗子弹，由vast+num共同决定
		this.hurt=2+obj.hurt*2;        //暴击伤害
//Object.assign()用来覆盖对象,es7.   es6直接用 class a extends b 来继承class
		//不需要定制的
		this.name="archer";      //名字弓箭手
		this.img=[];             //存放即将要绘制的图片
		this.status="";          //人物站立还是奔跑状态stand、run
		this.status1="";         //人物是否攻击状态atk
		this.scratchNum=0;   //显示抓痕计数，为0时不显示抓痕，不为0时为循环显示抓痕状态。（动物攻击时将此数设为1），循环到设定之后然后自动归零
		this.hp=this.maxHp; //人物当前hp
		this.w=250;       //图宽
		this.h=250;       //图高
		this.x=document.getElementById("canvas").width*0.5;       //x坐标
		this.y=document.getElementById("canvas").height*0.5;       //y坐标
		this.canFire=true;   //是否可以射击   ，布尔值，开关作用
		this.angle=0;      //旋转角度
		this.scratchImg=new Image();    //抓痕图片
		this.hpImg=new Image();
		//站立全身图片
		this.imgsStand=[];            //人物站立图片
		this.imgsStandAll=50;      //一共有几张站立图片
		this.standNow=0;              //当前播放到站立图片的第几张
		//奔跑的脚图片
		this.imgsRunFoot=[];            //人物奔跑的脚图片
		this.imgsRunFootAll=33;        //一共有几张奔跑的脚图片
		this.runFootNow=0;              //当前播放到奔跑的脚图片的第几张
		//奔跑的头
		this.imgsRunHead=[];            //人物奔跑的头图片
		this.imgsRunHeadAll=33;        //一共有几张奔跑的头图片
		this.runHeadNow=0;              //当前播放到奔跑的头图片的第几张
		//攻击的图片（仅上半身）
		this.imgsAtk=[];            //人物攻击图片（上半身）
		this.imgsAtkAll=39;          //一共有几张人物攻击图片
		this.atkNow=0;              //当前播放到攻击图片的第几张
		//站立的图片（只有一张）
		this.imgStandFoot=new Image();
		
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
		let deltaY=c.my-this.y;
	    let deltaX=c.mx-this.x;
	    this.angle=Math.atan2(deltaY,deltaX)+Math.PI/2;  
	    //根据状态决定this.img里存放的图片
	    this.imgFn();
	    //绘制
		c.ctx.save();     //使里面设置不影响外面
		c.ctx.translate(this.x,this.y);
		c.ctx.rotate(this.angle);
		for(let i=0;i<this.img.length;i++){    //遍历this.img,绘制里面所有的图片
			c.ctx.drawImage(this.img[i],-this.w*0.5,-this.h*0.5,this.w,this.h);
		}
		c.ctx.restore();   //使里面设置不影响外面
		//判断是否显示抓痕
		this.showScratch();
		//判断是否显示血条
		this.showHp();
	}
	move(){
		if(c.keySet.size){   //如果按键数组里面有内容，奔跑状态
			this.status="run";
			if(c.keySet.has("l")){    //左
				if(c.keySet.size==1){   //只按下一个方向键
					this.x-=this.speed;
				}else{      ////按下两个方向键
					this.x-=this.speed/2*Math.sqrt(2);    //保证斜着距离为speed
				}
				if(this.x<0){       //如果靠近左边界，不要超出边界
					this.x=0;
				}
			}
			if(c.keySet.has("r")){    //右
				if(c.keySet.size==1){   
					this.x+=this.speed;
				}else{      //斜着走
					this.x+=this.speed/2*Math.sqrt(2);    
				}
				if(this.x>c.canWidth){
					this.x=c.canWidth;
				}
			}
			if(c.keySet.has("t")){    //上
				if(c.keySet.size==1){   
					this.y-=this.speed;
				}else{      //斜着走
					this.y-=this.speed/2*Math.sqrt(2);    
				}
				if(this.y<0){
					this.y=0;
				}
			}
			if(c.keySet.has("b")){    //下
				if(c.keySet.size==1){   
					this.y+=this.speed;
				}else{      //斜着走
					this.y+=this.speed/2*Math.sqrt(2);    
				}
				if(this.y>c.canHeight){
					this.y=c.canHeight;
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
			c.ctx.save();
		    c.ctx.translate(this.x,this.y);
			c.ctx.drawImage(this.scratchImg,      0    ,0       ,214  ,  100  , -25   ,-12     ,50  ,25);   
			              //图片                           开始裁切x位      开始裁切y位   裁切宽      裁切高     x轴偏移量   y轴偏移量        图片宽    图片高
			c.ctx.restore(); 
			//绘制全局红色背景
            c.ctx.save();
            c.ctx.beginPath(); 
            c.ctx.fillStyle="rgba(255,0,0,0.4)";/*设置填充颜色*/ 
            c.ctx.fillRect(0,0,c.canWidth,c.canHeight);/*绘制一个矩形，前两个参数决定开始位置，后两个分别是矩形的宽和高*/ 
            c.ctx.restore();
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
		c.ctx.save();
		c.ctx.translate(this.x,this.y);
		c.ctx.drawImage(this.hpImg  ,0    ,0       ,55  ,8    , -50     ,-50    ,100    ,6);   //灰色底图
			           //图片        开始裁切x位   开始裁切y位   裁切宽      裁切高     x轴偏移量   y轴偏移量     图片宽    图片高
		c.ctx.drawImage(this.hpImg  ,55  ,0        ,54  ,8    , -50     ,-50    ,this.hp/this.maxHp*100,6);   //绿色血条              
		c.ctx.restore();   	
	}
	imgFn(){              //根据状态决定下一张img
		if(this.status==="stand"){   //站立
			if(this.status1==="atk"){     //站立攻击
				this.img=[this.imgStandFoot,this.imgsAtk[this.atkNow]];  //添加站立脚（一张图），攻击上半身
				this.atkNow++;
				if(this.atkNow===this.imgsAtkAll){   //攻击动作演示完毕，取消this.status1的攻击状态。（计数归零在每次点击的时候做，就不在这里做了）
					this.status1="";
				}
			}else{                  //站立不攻击
				this.img=[this.imgsStand[this.standNow]];
				this.standNow++;
				this.standNow%=this.imgsStandAll;
			}
		}else if(this.status==="run"){   //奔跑
			if(this.status1==="atk"){     //奔跑攻击
				this.img=[this.imgsRunFoot[this.runFootNow],this.imgsAtk[this.atkNow]];   //添加奔跑脚、攻击上半身
				//奔跑脚计数
				this.runFootNow++;
				this.runFootNow%=this.imgsRunFootAll;
				//攻击上半身计数
				this.atkNow++;
				if(this.atkNow===this.imgsAtkAll){   //攻击动作演示完毕，取消this.status1的攻击状态。（计数归零在每次点击的时候做，就不在这里做了）
					this.status1="";
				}
			}else{                  //奔跑不攻击
				this.img=[this.imgsRunFoot[this.runFootNow],this.imgsRunHead[this.runHeadNow]];   //添加奔跑脚、奔跑头
				//奔跑脚计数
				this.runFootNow++;
				this.runFootNow%=this.imgsRunFootAll;
				//奔跑头计数
				this.runHeadNow++;
				this.runHeadNow%=this.imgsRunHeadAll;
			}
		}
	}
	creatImgs(){
		//添加站立状态的图片
		for (let i = 0; i <this.imgsStandAll; i++) {
			let img=new Image();
			img.src='../img/canvas/hero/'+this.name+'/stand/'+i+'.png';
			this.imgsStand.push(img);
		}
		//添加奔跑的脚图片
		for (let i = 0; i <this.imgsRunFootAll; i++) {
			let img=new Image();
			img.src='../img/canvas/hero/'+this.name+'/runFoot/'+i+'.png';
			this.imgsRunFoot.push(img);
		}
		//添加奔跑头的图片
		for (let i = 0; i <this.imgsRunHeadAll; i++) {
			let img=new Image();
			img.src='../img/canvas/hero/'+this.name+'/runHead/'+i+'.png';
			this.imgsRunHead.push(img);
		}
		//添加攻击的图片
		for (let i = 0; i <this.imgsAtkAll; i++) {
			let img=new Image();
			img.src='../img/canvas/hero/'+this.name+'/atk/'+i+'.png';
			this.imgsAtk.push(img);
		}
		//站立的脚，一张图
		this.imgStandFoot.src="../img/canvas/hero/"+this.name+'/standFoot/0.png';
		//抓痕
		this.scratchImg.src="../img/canvas/skill/scratch.png";
		//hp图片
		this.hpImg.src="../img/canvas/hero/hp.png";
	}
}

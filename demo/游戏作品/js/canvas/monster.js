//怪兽对象
class Monster{
	constructor(){
		//可以定制的属性
		this.name="fox";            //怪物名字
		this.maxHp=10;              //最大生命值，不变化，用作血条百分比判断，变化的是this.hp当前生命值
		this.atk=10;                   //攻击力
		this.rate=1;                   //攻击速度，单位秒
		this.atr=70;                //攻击范围
		this.speed=1.5;              //移动速度(实际移动距离)
		this.w=150;                  //图宽
		this.h=150;                  //图高
		this.b=15;                   //怪物的肥胖程度，单位px，决定命中角度大小
		this.imgsRunAll=10;         //怪物跑动图片有几张
		this.imgsHitAll=21;          //怪物攻击图片有几张
		this.imgsKnockbackAll=32;        //怪物受伤有几张图片
		this.imgsDeathAll=32;          //怪物死亡图片有几张
		//不需要定制的
		this.canAtk=true;                //是否可以攻击（因攻击速度限制），true代表可以攻击
		this.hp=this.maxHp;                  //当前生命值
		this.pNum=0;   //标记显示pow图片，0代表不显示，1-14代表显示且循环中。作用类似开关，一旦将值设置成1， 
					//则循环绘制自动开始，一旦将此值设置为0或到时自动归0，循环绘制结束。   this.powFn
		this.hpNum=0;        //标记显示血条，不等于0时自动循环1-40，循环结束自动清零。    this.showHp
		this.x=0;                     //当前x坐标
		this.y=0;                     //当前y坐标
		this.angle=0;                //当前怪物朝向
		this.status="run";          //当前怪物状态
		this.img;                   //怪物将要显示的下一张图片,存的是图片不是src， 等待creatImage()添加
		this.powImg=new Image();                //pow图片  等待creatImage()添加
		this.hpImg=new Image();                //血条图片  等待creatImage()添加
		this.imgsRun=[];          //怪物跑动图片,存的是图片
		this.runNow=0;        //记录跑动当前在第几张图片
		this.imgsHit=[];         //怪物攻击图片,存的是图片
		this.hitNow=0;        //记录攻击当前在第几张图片
		this.imgsDeath=[];         //怪物死亡图片,存的是图片
		this.deathNow=0;        //记录死亡当前在第几张图片
		this.imgsKnockback=[];      //怪物击退图片,存的是图片
		this.knockbackNow=0;        //记录击退当前在第几张图片
		this.deltaY;      //当前y方向怪物和人的距离，正负值决定方向
		this.deltaX;       //当前x方向怪物和人的距离，正负值决定方向
		this.l;           //当前怪物和人的直线距离
		this.init()      //初始化（添加只需要添加一次的、需要计算后添加的自身属性）
	}
	init(){         //添加只需要添加一次的、需要计算后添加的自身属性，需要实时修正添加的属性在每一帧都执行一遍的draw里面的this.computeFn添加
		this.born();                 //为当前实例添加位置坐标xy，并初始化在出生点
		this.creatImgs();                 //添加和怪物有关的所有图片到自己身上
	}
	draw(){                      //每一帧重绘时的引擎函数
		if(this.status==="run"){         //奔跑状态
			this.computeFn();          //实时计算当前怪物的各种信息，记录在自己身上
			if(this.l<this.atr){ //如果距离小于怪物攻击范围，怪原地不动，变成攻击状态并攻击,攻击过程不会因距离大于攻击范围而中断，但是会被击退打断，
								 //切换成击退状态。攻击动画演示完毕后才会造成实际伤害，并自动切换回run状态。如果攻击过程中死了，则正常死亡。
								 //这一切归功于进入攻击状态不会每一帧重复触发，它会被击退和死亡状态覆盖掉。
				if(this.canAtk){    //如果可以攻击
					this.status="hit";   //状态不会立即生效，本次还是按照run绘制，下一次开始进入attack流程,这样两次攻击之间至少存在一次run,便于调整怪物朝向
					this.canAtk=false;    //变成不可攻击状态
					this.reAtk();         //开定时器，一段时间之后自动变为可攻击状态
				}
			}else{          //如果距离大于攻击范围，怪物移动
				this.y+=this.dy;
				this.x+=this.dx;
			}
			//决定下一张图片是什么
		    this.img=this.imgsRun[this.runNow];
			this.runNow=(this.runNow+1)%this.imgsRunAll;   //取模循环跑动
		}
		if(this.status==="death"){         //死亡状态，只演示动画，不可射中
			//决定下一张图片是什么
		    this.img=this.imgsDeath[this.deathNow];
			this.deathNow++;
			//如果所有死亡图片都播放完了，清除实例
			if(this.deathNow===this.imgsDeathAll){    
				monSet.delete(this);
			}      
		}
		if(this.status==="knockback"){     //击退状态，位置后移，演示动画，可以被再次射中，但是游戏机制设置（右键cd）一定不会被再次击退
			//决定下一张图片是什么
		    this.img=this.imgsKnockback[this.knockbackNow];
			this.knockbackNow++;
			//位置根据刚被击中时的角度向相反方向移动(如此算法会导致怪物的speed越快，被击退的越远，倒也符合常理)
			this.y-=this.dy;
			this.x-=this.dx;
			//如果所有击退图片都播放完了，this.knockbackNow计数清零，状态变为run。如果击退过程中被打死，应正常死亡
			if(this.knockbackNow===this.imgsKnockbackAll){    
				this.knockbackNow=0;
				this.status="run";
			}
		}
		if(this.status==="hit"){     //攻击状态
			//决定下一张图片是什么
		    this.img=this.imgsHit[this.hitNow];
			this.hitNow++;
			//如果所有击退图片都播放完了，this.hitNow计数清零，状态变为run。如果击退过程中被打死，应正常死亡
			if(this.hitNow===this.imgsHitAll){   
				//人物掉血
				p.hp-=this.atk;
//				console.log(p.hp);    //掉血成功
				p.scratchNum=1;      //人物身上出现抓痕
				//判断人物血量，被攻击时再判断即可，不需要每一帧都判断，所以放在这里进行判断
				if(p.hp<=0){     //人物没血死亡
//					p.death();    //game over
//					return;       //游戏结束，没必要继续了
				}
				this.hitNow=0;
				this.status="run";
			}
		}
		this.drawFn();   
		this.powFn();     //判断是否绘制pow图，如果是则绘制。内置定时this.pNum自动归0结束循环绘制。放在绘制怪物后面，pow可以盖在怪物上面
		this.showHp();    //判断是否生成血条，原理和showFn一样。this.hpNum计数
	}
	born(){                     //生成初始位置
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
		this.status="death";
	}
	creatImgs(){          //添加和怪物有关的所有图片
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
		//添加击退状态的图片
		for (let i = 0; i <this.imgsKnockbackAll; i++) {
			let img=new Image();
			img.src='../img/canvas/monster/'+this.name+'/knockback/'+i+'.png';
			this.imgsKnockback.push(img);
		}
		//添加死亡状态的图片
		for (let i = 0; i <this.imgsDeathAll; i++) {
			let img=new Image();
			img.src='../img/canvas/monster/'+this.name+'/death/'+i+'.png';
			this.imgsDeath.push(img);
		}
		//添加pow图
		this.powImg.src="../img/canvas/pow.png";
		//添加血条图
		this.hpImg.src="../img/canvas/hp.png";
	}
	computeFn(){           //计算当前怪物的各种信息，记录在自己身上，每一帧都需要重新计算
		//各种距离
		this.deltaY=p.y-this.y;           //y方向怪物和人的距离，正负值决定方向
	    this.deltaX=p.x-this.x;          //x方向怪物和人的距离，正负值决定方向
		this.l=Math.sqrt(Math.pow(Math.abs(this.deltaX),2)+Math.pow(Math.abs(this.deltaY),2));    //计算怪物和人的直线距离
		//怪物每一步移动距离
		this.dy=this.speed*this.deltaY/this.l;      //计算出y方向每步移动距离
		this.dx=this.speed*this.deltaX/this.l;      //计算出x方向每步移动距离
		//计算怪物与人的角度
	    this.angle=Math.atan2(this.deltaY,this.deltaX)+Math.PI/2;  
	}
	powFn(){            //根据this.pNum判断是否需要生成pow，如果需要则生成pow并计数开始，到时自动结束绘制。
		if(this.pNum!==0){       //如果被标记，则绘制pow，且pow大小根据this.pNum
			let w=this.pNum*2.5+20;
	    	ctx.save();
		    ctx.translate(this.x,this.y);
			ctx.drawImage(this.powImg,-w/2,-w/2,w,w);     
			ctx.restore();   
			this.pNum++;             //这里必须用
			if(this.pNum>=14){        //如果p加到了14，p归零，取消标记
				this.pNum=0;
			}
		}
	}
	drawFn(){             //根据计算好的图片和角度，绘制怪物
		ctx.save();
	    ctx.translate(this.x,this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.img,-this.w*0.5,-this.h*0.5,this.w,this.h);
		ctx.restore();   //使里面设置不影响外面
	}
	showHp(){            //被击中后在一段时间内显示当前hp,一段时间后自动消失。根据this.h，如果不等于0则自动循环，结束清零
		if(this.hpNum!==0){    //如果被标记了
			if(this.hp<0){
				this.hp=0;
			}
			ctx.save();
		    ctx.translate(this.x,this.y);
			ctx.drawImage(this.hpImg  ,0    ,0       ,150  ,8    , -50     ,-50    ,100    ,6);   //灰色底图
			              //图片        开始裁切x位   开始裁切y位   裁切宽      裁切高     x轴偏移量   y轴偏移量     图片宽    图片高
			ctx.drawImage(this.hpImg  ,150  ,0       ,150  ,8    , -50     ,-50    ,this.hp/this.maxHp*100,6);   //黄色血条              
			ctx.restore();   
			this.hpNum++;
			if(this.hpNum>=40){        //如果p加到了40，p归零，取消标记
				this.hpNum=0;
			}
		}
	}
	reAtk(){            //开定时器一段时间之后自动变为可以攻击，时间间隔根据怪物攻击速度
		setTimeout(()=>{              //es6写法，箭头函数，为了this不指向window
			this.canAtk=true;
		},this.rate*1000)
	}
}
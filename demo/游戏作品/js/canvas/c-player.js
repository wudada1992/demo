//人物对象
class Player{
	constructor(){
		//可以定制的
		this.rate=1;     //射击速度,单位是秒
		this.speed=2;     //移动速度（实际移动距离）
		this.head=new Image;
		this.head.src="../img/canvas/p-head.png";   //初始图片路径
		this.foot=new Image;
//		Object.assign()用来覆盖对象
		//不需要定制的
		this.w=100;       //图宽
		this.h=100;       //图高
		this.x=canWidth*0.5;       //x坐标
		this.y=canHeight*0.5;       //y坐标
		this.canFire=true;   //是否可以射击   ，布尔值，开关作用
		this.angle=0;      //旋转角度
	}
	draw(){
		//移动（通过监听keySet）
		if(keySet.size){
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
		}
		//角度跟随鼠标
		var deltaY=my-this.y;
	    var deltaX=mx-this.x;
	    this.angle=Math.atan2(deltaY,deltaX);   
	    
	    //绘制
		ctx.save();     //使里面设置不影响外面
		ctx.translate(this.x,this.y);
		ctx.rotate(this.angle);
		ctx.drawImage(this.head,-this.w*0.35,-this.h*0.5,this.w,this.h);
		ctx.restore();   //使里面设置不影响外面
	}
	reFire(){                  //根据射速重新变为可以射击状态
		setTimeout(()=>{              //es6写法，箭头函数，为了this不指向window
//	        console.log(this);        //这里的this指向p实例
			this.canFire=true;
		},this.rate*1000)
	}
}

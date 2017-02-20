//画布对象
class Canvas{      //人物、子弹集合、怪物集合都挂在画布对象身上
	constructor(){
		this.can=document.getElementById("canvas");   //canvas画布元素
		this.ctx=this.can.getContext("2d");      //2d场景
		this.canWidth=this.can.width;           //画布宽
    	this.canHeight=this.can.height;         //画布高
    	this.p=new Player();                //生成人物实例，初始化，人物对象挂在画布对象身上
    	this.keySet=new Set();    //方向set
    	this.bulSet=new Set();     //子弹set
    	this.monSet=new Set();      //怪兽set
    	this.mx;                   //鼠标相对于画布左距离，由鼠标移动事件实时计算
    	this.my;                    //鼠标相对于画布上距离，由鼠标移动事件实时计算
		this.init();
	}
	init(){               //new实例的时候必然要执行一次的东西，且只执行一次
		this.addEvent();   //给canvas元素添加事件
	}
	addEvent(){
		let _this=this;
		//画布添加鼠标移动事件
		this.can.addEventListener("mousemove",function(e){
			_this.mx=e.offsetX;
			_this.my=e.offsetY;
		},false)
		//画布鼠标点击事件
		this.can.addEventListener("mousedown",function(e){
			//判断射击间隔
			if(_this.p.canFire){     //如果人物是可以射击状态，射击
				////生成子弹实例，放入子弹set，子弹数量根据p.shot(散弹等级).所以这个函数要在p实例出来之后
				_this.shot(e,_this.p.shot);     //p.shot数值无上限。。
				_this.p.canFire=false;    //射击后状态为不可射击状态，
				_this.p.reFire();         //等待根据p的射速重置可射击状态
			}
		},false)
		//添加键盘事件
		document.addEventListener("keydown",function(e){
			if(e.keyCode==65){    //a    左
				_this.keySet.add("l");
			}
			if(e.keyCode==83){    //s     下
				_this.keySet.add("b");
			}
			if(e.keyCode==68){     //d    右
				_this.keySet.add("r");
			}
			if(e.keyCode==87){     //w    上
				_this.keySet.add("t");
			}
		},false)
		document.addEventListener("keyup",function(e){
			if(e.keyCode==65){    //a    左
				_this.keySet.delete("l");
			}
			if(e.keyCode==83){    //s     下
				_this.keySet.delete("b");
			}
			if(e.keyCode==68){     //d    右
				_this.keySet.delete("r");
			}
			if(e.keyCode==87){     //w    上
				_this.keySet.delete("t");
			}
		},false)
	}
	shot(e,shot){             //生成子弹实例，放入子弹set，参数shot是p.shot，散弹等级。根据天赋加点而来
		for(let i=0;i<shot+1;i++){    //0只生成一个子弹，1生成3个，2生成5个，3生成7个..
			if(i==0){      //第一次只生成一个子弹，之后的每次都生成一对子弹。 
				let b=new Bullet(e,{});
				this.bulSet.add(b);
			}else{       //非第一颗子弹，根据i生成一对子弹
				let b=new Bullet(e,{},0.05*i);
				let b1=new Bullet(e,{},-0.05*i);
				this.bulSet.add(b);
				this.bulSet.add(b1);
			}
		}
	}
	gameloop(){           //循环
		window.requestAnimFrame(canvas.gameloop.bind(canvas));   //另一种定时器,好处1：切换页面动画会暂停。2、浏览器专门为动画提供的API，会自动优化。3、H5 API
		this.ctx.clearRect(0,0,this.canWidth,this.canHeight);     //清除画布
		//绘制子弹们,先绘制子弹再绘制人，子弹就盖在人下面了
		for(let value of this.bulSet){
			value.draw();
		}
		//绘制人
		this.p.draw();           
		//绘制怪兽们
		for(let value of this.monSet){
			value.draw();
		}
	}
	creatMonster(){          //产生怪兽
		let _this=this;
		var timer=setInterval(function(){
			var n=Math.ceil(2*Math.random());
			for (var i = 0; i <n; i++) {
				var m=new Monster();
				_this.monSet.add(m);
			}
		},2000)
		
	}
	
	
	
	
	
	
	
	
}

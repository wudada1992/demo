let can,    //canvas画布
	ctx,     //画布场景
	canWidth,   //画布宽度
	canHeight,
	mx,     //鼠标相对于画布左距离
	my,
	p,     //玩家
	keySet,     //方向按键set   es6写法
	bulSet,       //子弹set
	monSet,       //怪兽set
	powImg       //暴击图片
window.onload=function(){
	init();     //初始化
	creatMonster();  //产生怪兽
	gameloop();    //循环绘制
}
//----------------封装函数-----------------------
//初始化
function init(){
	//初始画布
	can=document.getElementById('canvas');
	ctx=can.getContext("2d");
	
	canWidth=can.width;
    canHeight=can.height;
	//初始化人物
	p=new Player();
	//初始化set
	keySet=new Set();    //方向set
	bulSet=new Set();     //子弹set
	monSet=new Set();      //怪兽set
	//画布添加鼠标移动事件
	can.addEventListener("mousemove",function(e){
		mx=e.offsetX;
		my=e.offsetY;
	},false)
	//画布鼠标点击事件
	can.addEventListener("mousedown",function(e){
		mx=e.offsetX;
		my=e.offsetY;
		//判断射击间隔
		if(p.canFire){     //如果人物是可以射击状态，射击
			////生成子弹实例，放入子弹set，子弹数量根据p.shot.所以这个函数要在p实例出来之后
			shot(e,p.shot);     //p.shot数值无上限。。
			p.canFire=false;    //射击后状态为不可射击状态，
			p.reFire();         //等待根据p的射速重置可射击状态
		}
	},false)
	//添加键盘事件
	document.addEventListener("keydown",function(e){
		if(e.keyCode==65){    //a    左
			keySet.add("l");
		}
		if(e.keyCode==83){    //s     下
			keySet.add("b");
		}
		if(e.keyCode==68){     //d    右
			keySet.add("r");
		}
		if(e.keyCode==87){     //w    上
			keySet.add("t");
		}
	},false)
	document.addEventListener("keyup",function(e){
		if(e.keyCode==65){    //a    左
			keySet.delete("l");
		}
		if(e.keyCode==83){    //s     下
			keySet.delete("b");
		}
		if(e.keyCode==68){     //d    右
			keySet.delete("r");
		}
		if(e.keyCode==87){     //w    上
			keySet.delete("t");
		}
	},false)
}
//循环
function gameloop(){
	window.requestAnimFrame(gameloop);   //另一种定时器
	ctx.clearRect(0,0,canWidth,canHeight);     //清除画布
	//绘制人
	p.draw();           
	//绘制怪兽们
	for(let value of monSet){
		value.draw();
	}
	//绘制子弹们
	for(let value of bulSet){
		value.draw();
	}
	
}
//产生怪兽
function creatMonster(){
	var timer=setInterval(function(){
		var n=Math.ceil(3*Math.random());
		for (var i = 0; i <n; i++) {
			var m=new Monster();
			monSet.add(m);
		}
	},2000)
	
}
//生成子弹实例，放入子弹set，子弹数量根据p.shot.所以这个函数要在p实例出来之后
function shot(e,shot){   //shot是p.shot，散弹等级。根据天赋加点而来
	for(let i=0;i<shot+1;i++){    //0只生成一个子弹，1生成3个，2生成5个，3生成7个..
		if(i==0){      //第一次只生成一个子弹，之后的每次都生成一对子弹。 
			let b=new Bullet(e,{});
			bulSet.add(b);
		}else{       //非第一颗子弹，根据i生成一对子弹
			let b=new Bullet(e,{},0.05*i);
			let b1=new Bullet(e,{},-0.05*i);
			bulSet.add(b);
			bulSet.add(b1);
		}
	}
}





//绘制全局红色背景
//ctx.save();
//ctx.beginPath(); 
//ctx.fillStyle="rgba(255,0,0,0.3)";/*设置填充颜色*/ 
//ctx.fillRect(0,0,canWidth,canHeight);/*绘制一个矩形，前两个参数决定开始位置，后两个分别是矩形的宽和高*/ 
//ctx.restore();
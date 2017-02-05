
var can;    //canvas画布
var ctx;     //画布场景

var canWidth;   //画布宽度
var canHeight;

var mx;     //鼠标相对于画布左距离
var my;

var p ;     //玩家
var m;      //怪兽们
var keySet;     //方向按键set   es6写法
var bulSet       //子弹set
window.onload=function(){
	init();
	gameloop();
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
	p.init();
	//初始化怪兽们
	m=new Monster();
	m.init();
	//初始化set
	keySet=new Set();
	bulSet=new Set();
	//画布添加鼠标移动事件
	can.addEventListener("mousemove",function(e){
		mx=e.offsetX;
		my=e.offsetY;
	},false)
	//画布鼠标点击事件
	can.addEventListener("mousedown",function(e){
		mx=e.offsetX;
		my=e.offsetY;
		var b=new Bullet();
		b.init(e);
		bulSet.add(b);
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
	p.draw();           //绘制人
	m.draw();           //绘制怪兽们
	//绘制子弹们
	var bularr=[...bulSet];
	for(var i=0;i<bularr.length;i++){
		bularr[i].draw();
	}
}
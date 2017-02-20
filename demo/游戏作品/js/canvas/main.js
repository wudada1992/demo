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
	talent();   //天赋树
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
	//绘制子弹们,先绘制子弹再绘制人，子弹就盖在人下面了
	for(let value of bulSet){
		value.draw();
	}
	//绘制人
	p.draw();           
	//绘制怪兽们
	for(let value of monSet){
		value.draw();
	}
}
//产生怪兽
function creatMonster(){
//	var timer=setInterval(function(){
//		var n=Math.ceil(1*Math.random());
//		for (var i = 0; i <n; i++) {
//			var m=new Monster();
//			monSet.add(m);
//		}
//	},2000)
	
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
//天赋树初始化
function talent(){
	let content=document.getElementById("content");     //天赋树内容区
	let eleInfo=document.createElement("div");   //技能描述元素，需要挂在这里方便被两个函数调用
	eleInfo.className="text";
	//生成天赋树
	let str="";           //空字符串
	for(value in data.talent ){
		str+=`<div class="t" id="${value}" style="left:${data.talent[value].left}px;top:${data.talent[value].top}px;background-position:${data.talent[value].l1}px ${data.talent[value].t1}px;">
						<div class="info">
							0/${data.talent[value].n}
						</div>
					</div>`
	}
	content.innerHTML+=str;
	//封装函数,为了下面的事件用
	function showText(a){      //传入技能代号,字符串,根据当前数据生成.text元素,挂在全局变量上,放入页面
		let obj=data.talent[a];
		let str="";      //超级字符串,可以直接用于content的innerHtml+=
		//生成字符串
			//判断前置技能是否都至少点了一点
		if(obj.pre){       //如果存在前置技能
			let b=true;    //true代表所有前置技能都满足
			for(let i=0;i<obj.pre.length;i++){  //遍历pre
				if(data.talent[obj.pre[i]].now===0){ //如果这个前置技能没有加点
					b=false;
				}
			}
			if(b===true){     //如果遍历完之后依然是true,证明所有前置技能都满足
				str+=`<header>
						${obj.name}
					</header>
					<div class="num">
						等级：${obj.now}/${obj.n}
					</div>`
			}else{        //有前置技能不满足
				str+=`<header data-pre="0"; style="color:rgba(100,100,220,1);">
						${obj.name}
					</header>`
				for(let i=0;i<obj.pre.length;i++){  //遍历pre
					if(data.talent[obj.pre[i]].now===0){ //如果这个前置技能没有加点
						str+=`<div class="num" style="color:red;">
								请先学习 ：${data.talent[obj.pre[i]].name}
							</div>`
					}
				}
			}
		}else{     //不存在前置技能
			str+=`<header>
						${obj.name}
					</header>
					<div class="num">
						等级：${obj.now}/${obj.n}
					</div>`
		}
			//技能描述
		if(obj.now===0){     //0只显示下一级描述
			str+=`<div class="describe">
					下一级:${obj.dis[0]}
				</div>`
		}else if(obj.now===obj.n){   //最大值只显示当前描述  
			str+=`<div class="describe">
					${obj.dis[obj.n-1]}
				</div>`
		}else{          //显示当前描述+下一级描述
			str+=`<div class="describe">
					${obj.dis[obj.now-1]}
				</div>
				<div class="describe">
					下一级:${obj.dis[obj.now]}
				</div>`
		} 
		//修改全局的eleInfo
		eleInfo.innerHTML=str;
		//元素放入页面
		content.appendChild(eleInfo);
	}
	function move(e){ //e是鼠标事件信息,鼠标在技能图标上移动时,eleInfo跟着移动
		eleInfo.style.left=e.clientX-content.getBoundingClientRect().left+15+"px";
		eleInfo.style.top=e.clientY-content.getBoundingClientRect().top+15+"px";
	}
	function remove(){  //删除技能描述元素
		content.removeChild(eleInfo);
	}
	function defeat(){
		console.log("播放失败音乐");
	}
	//添加事件
	content.addEventListener("mouseover",function(e){   //事件委托,鼠标移入
		let t=e.target;
		if(t.className==="t"){    //移入技能图标
			showText(t.id);    //生成技能描述
		}
	})
	content.addEventListener("mouseout",function(e){   //事件委托,鼠标移出
		let t=e.target;
		if(t.className==="t"){    //移出技能图标
			remove();
		}
	})
	content.addEventListener("mousemove",function(e){   //事件委托,鼠标抚摸
		let t=e.target;
		if(t.className==="t"){    //抚摸技能图标
			move(e);
		}
	})
	content.addEventListener("click",function(e){        //事件委托，左键
		let t=e.target;             //事件源
		if(t.className==="t"&&e.which===1){         //左击技能图标
			let name=t.id;             //id名字
			let n=data.talent[name].n;   //点击的技能有几个等级
			if(eleInfo.getElementsByTagName("header")[0].dataset.pre||data.talent[name].now==n){   //如果移入时就被标记了,证明有前置技能不满足,此时点击失败.如果已经到最大值了,依然失败
				defeat();
				return;   //不能被点击
			}
			let info=t.getElementsByClassName("info")[0];  //事件源下的info
			data.talent[name].now++;   //修改数据0-3
			if(data.talent[name].now===1){    //如果是从0点到1,图标变彩色
				t.style.backgroundPositionX=data.talent[name].l2+"px";
				t.style.backgroundPositionY=data.talent[name].t2+"px";
			}
			if(data.talent[name].now==n){    //变黄
				info.style.color="yellow";
				info.style.borderColor="yellow";
			}
			//数字改变
			info.innerHTML=data.talent[name].now+'/'+n;
			//删除上一个技能描述
			remove();
			//生成技能描述
			showText(name);   
		}
		
	}) 
	content.addEventListener("contextmenu",function(e){   //事件委托,右键
		let t=e.target;             //事件源
		if(t.className==="t"&&e.which===3){         //右击技能图标
			let name=t.id;                          //此技能名字
			let obj=data.talent[name];             //此技能对象
			if(obj.now==0){        //如果已经是0,点击失败音乐
				defeat();
				e.preventDefault(name);
				return;
			}
			if(obj.now==1){      //如果此时是1,如果后置技能存在且已经学习,不准变为0
				if(data.talent[obj.next]&&data.talent[obj.next].now!==0){   //如果后置技能已经学习
					defeat();
					e.preventDefault(name);
					return;
				}
			}
			let n=obj.n;   //点击的技能有几个等级
			let info=t.getElementsByClassName("info")[0];  //事件源下的info
			obj.now--;   //修改数据0-3
			if(obj.now==0){    //防止小于0,图标变黑白
				t.style.backgroundPositionX=obj.l1+"px";
				t.style.backgroundPositionY=obj.t1+"px";
			}
			//颜色变绿
			info.style.color="green";
			info.style.borderColor="green";
			//数字改变
			info.innerHTML=obj.now+'/'+n;
			//删除上一个技能描述
			remove();
			//显示技能描述
			showText(name); 
		}
		e.preventDefault(name);
	})
}

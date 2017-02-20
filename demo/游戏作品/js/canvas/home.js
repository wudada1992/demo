//主页对象
class HomePage{
	constructor(){
		this.main=document.getElementById("main");   //主页
		this.init();
	}
	init(){
		this.creatLogo();       //生成logo,只生成一次
		this.creatList();       //生成菜单，并添加事件,只生成一次
	}
	creatLogo(){        //主页里生成logo，并添加事件
		let log=document.createElement("div");
		log.id="logo";
		log.innerHTML+=`<h1>
							部落3
						</h1>
						<span>
							Begin your adventure
						</span>`
		main.appendChild(log);
	}
	creatList(){        //主页里生成list
		//生成logo
		let ul=document.createElement("ul");
		ul.id="list";
		ul.innerHTML+=`<li class="lis play">开始游戏</li>
					<li class="lis">剧情模式</li>
					<li class="lis">图鉴</li>
					<li class="lis">制作</li>
					<li class="lis">退出游戏</li>`
		main.appendChild(ul);
		//添加事件
			//点击开始游戏
		ul.getElementsByClassName("play")[0].addEventListener("click",()=>{
			this.leaveList();     //菜单移出
			this.main.style.zIndex=1;   //归正主页层级
			document.getElementById("canvas").style.zIndex=2; //提高canvas元素的层级，漏出canvas背景但不绘制
			document.getElementById("talent_wrap").style.zIndex=3; //提高天赋页层级
		})
	}
	pushLogo(){      //logo动画进入主页
		TweenMax.staggerFrom("#logo", 2, {y:-200, delay:1.5, ease:Elastic.easeOut}, 0);
	                    //选择的元素  持续时间        css参数                                                     延迟                                     函数                  距前一项时间间隔
	}
	pushList(){     //list菜单进入主页
		TweenMax.staggerFrom(".lis", 2, {x:200,scale:0.5, opacity:0, delay:0.5, ease:Elastic.easeOut}, 0.2);
	                    //选择的元素  持续时间        css参数                                                     延迟                                     函数                  距前一项时间间隔
	}
	leaveList(){     //菜单离开
		TweenMax.staggerTo(".lis", 2, {x:250,scale:0.5,opacity:0, delay:0, ease:Elastic.easeOut}, 0.1);
	                    //选择的元素  持续时间        css参数                                                     延迟                                     函数                  距前一项时间间隔
	}
}

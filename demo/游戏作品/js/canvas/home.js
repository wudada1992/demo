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
			this.leaveLogo();      //logo移出
			setTimeout(()=>{      //等待菜单移出动画演示完毕
				t.enter();            //天赋树进入
			},900)
		})
	}
	pushLogo(){      //logo动画进入主页
		TweenMax.from("#logo", 2, {y:-200, delay:1.5, ease:Elastic.easeOut});
	                    //选择的元素  持续时间        css参数                      延迟                                     函数                  距前一项时间间隔
	}
	leaveLogo(){      //logo动画离开主页
		TweenMax.to("#logo", 2, {y:-200, delay:0.5, ease:Elastic.easeOut});
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

//生成天赋树并添加事件的函数，因为只会运行一次（即使再来一局），所以就不写成一个对象了。
//天赋树不像首页播放视频比较大，天赋树不使用的时候拉倒一边隐藏起来就行，需要的时候再拉出来。
function talent(){
	let content=document.getElementById("content");     //天赋树内容区
	let eleInfo=document.createElement("div");   //技能描述元素，需要挂在这里方便被两个函数调用
	let spAll=10;       //先这样写着，后期如果需要修改可用点数，可能需要将talent也写成对象，或者把这两个属性拿到大全局
	let sp=0;
	eleInfo.className="text";
	//生成天赋树
	    //基本内容
	let str=`<div id="lf1"></div>
					<div id="lf2"></div>
					<div id="mi1"></div>
					<div id="mi2"></div>
					<div id="mi3"></div>
					<div id="mi4"></div>
					<div id="mi5"></div>
					<div id="mi6"></div>
					<div id="rt1"></div>
					<div id="rt2"></div>
					<div class="sp"></div>
					<div id="go">Go!</div>`;
		//技能图标			
	for(value in data.talent ){
		str+=`<div class="t" id="${value}" style="left:${data.talent[value].left}px;top:${data.talent[value].top}px;background-position:${data.talent[value].l1}px ${data.talent[value].t1}px;">
						<div class="info">
							0/${data.talent[value].n}
						</div>
					</div>`
	}
	    //放入页面
	content.innerHTML+=str;
	//初始化剩余点数
	spFn();
	//封装函数,为了下面的事件用
	function spFn(){            //计算当前剩余点数并显示
		let eleSp=content.getElementsByClassName("sp")[0];  //剩余点数元素
		eleSp.innerHTML="剩余点数 ："+(spAll-sp);
	}
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
	
}
function count(){
	let obj={};    //用于返回的对象，存放计算后的值
	for(value in data.talent){    //遍历天赋数据对象
		if(data.talent.hasOwnProperty(value)){   //如果for in遍历到的属性是在talent对象身上而非其原型链上，才计算。
			obj[value]=data.talent[value].now;   //atk:1;
		}
	}
	return obj
}
//面向对象方法封装的弹窗
//弹框，使用的时候只需要new dialog（{定制题目和内容、确定函数}），就可以在页面生成一个弹框，需要有拖拽能力，需要先引入drag.js
function Dialog(options){
	if( options && options.constructor !== Object ){   //这里必须要传入一个对象，存在就既不是undefined也不是null
		//容错机制，如果传入的不是对象，则认为传入一个空对象，内容皆为缺省值
		options={};
	}
	//克隆传入对象，设置缺省值
	this.defaults = {           //开发者传入信息在实例身上保存一份
		title:"这是一个弹框",
		content:"这是内容",
		left:null,        //定制弹框位置
		top:null,
		okFn:function(){}
	}
	for( var attr in options ){    //遍历传入对象的每一项，替换（添加）到克隆的新对象中，如果传入对象中没有的，则使用缺省值
		if( options.hasOwnProperty(attr) ){      //防止for in沿着原型链找
			this.defaults[attr] = options[attr];
		}
	}

	this.init();    //初始化生成弹框
}

Dialog.prototype = {
	constructor:Dialog,
	init(){     //生成弹框时，diaDiv、mask、h3都直接挂在实力身上，方便new Drag()时能找到这三个元素
		//弹框的结构放在body中
		this.diaDiv = this.createHtml();
		document.body.appendChild(this.diaDiv);
		this.diaDiv.style.zIndex = 100;
		//遮罩放在body
		this.mask = this.createMask();
		document.body.appendChild(this.mask);
		this.mask.style.zIndex = 99;    //遮罩层要低于弹框
		//定位,只要执行此函数，弹框默认居中显示
		this.setPosition();  
		//让弹框有拖拽的能力
		this.h3 = this.diaDiv.querySelector("h3");     //实力身上挂上h3方便其他地方使用
		new Drag({
			targetEle:this.h3,
			moveEle:this.diaDiv
		});
		//添加通用事件
		this.addEvent();    //次函数一执行，就给实例身上的diaDiv添加各种通用的事件,非公用的事件（content区事件）小组件无力添加，需要另外添加
	},
	setPosition(){     //预设接口，继承的时候可以改写，默认居中
		//判断能不能转成数字
		/*
			1. 没有传入left 和 top值 默认的为居中显示
			2. 传入了left 没有传入top，left为传入的值，top居中显示
			3. 没传left，传入了top,left居中，top按照传入的显示
			4. 同时传了left，和top，就在按照传入的left和top显示
		*/

		var isLeft = this.defaults.left !== null && !isNaN(Number(this.defaults.left));   //null可以转成0，要先排除null，undefined转成NaN
		var isTop = this.defaults.top !== null && !isNaN(Number(this.defaults.top));

		var top = (document.documentElement.clientHeight - this.diaDiv.offsetHeight)/2;     //默认上下居中
		var left = (document.documentElement.clientWidth - this.diaDiv.offsetWidth)/2;      //默认左右居中

		if(isLeft){   //如果传入了左值
			this.diaDiv.style.left = this.defaults.left + "px";
		}else{     //如果无左，默认居中
			this.diaDiv.style.left = left+ "px";
		}
		if(isTop){   //如果传入了上值
			this.diaDiv.style.top = this.defaults.top + "px";
		}else{     //如果无上值，默认居中
			this.diaDiv.style.top = top+ "px";
		}
	},
	//弹框的结构
	createHtml(){     //吐出一个弹框div元素
		var diaDiv = document.createElement("div");
		diaDiv.className = "full-pop";

		var diaHtml = `<h3>
			<p class="title">${this.defaults.title}</p>
			<a href="javascript:void(0);" class="close" title="关闭">×</a>
			</h3>
			<div class="content">
				${this.defaults.content}
			</div>
			<div class="pop-btns">
				<span class="error"></span>
				<a href="javascript:void(0)" class="confirm">确定</a>
				<a href="javascript:void(0)" class="cancel">取消</a>
			</div>`;

		diaDiv.innerHTML = diaHtml;

		return diaDiv;
	},
	createMask(){    //吐出一个遮罩div元素
		var mask = document.createElement("div");
		mask.style.cssText = "width:100%;height:100%;background:#000;opacity: .5;position:fixed;left:0;top:0;z-index:99;";
		return mask;
	},
	addEvent(){        
		window.addEventListener("resize",this.setPosition.bind(this),false);    //给window添加自适应居中事件,一旦窗口大小改变,不论拖拽到那里,都执行重置位置
		var _this=this;
		//关闭,点击关闭从页面中删掉fullDiv
		var close = this.diaDiv.getElementsByClassName("close")[0];
		close.onclick = function (){    
			document.body.removeChild(_this.diaDiv);   //挂在实例身上的弹框元素
			document.body.removeChild(_this.mask);
		};
		//确定,先执行okFn里面的代码,然后根据okFn运行结果的返回值(布尔)决定是否清掉弹框
		var ok = this.diaDiv.getElementsByClassName("confirm")[0];
		ok.onclick = function (){
			var bl = _this.defaults.okFn();    //看  okFn执行之后的返回值
			/*
				true 不允许删除
				false 允许删除
			*/
			if( !bl ){    //如果返回值标记可以关闭弹框
				document.body.removeChild(_this.diaDiv);
				document.body.removeChild(_this.mask);
			}
		};
		//取消,点击取消从页面中删掉fullDiv
		var cancel = this.diaDiv.getElementsByClassName("cancel")[0];
		cancel.onclick = function (){
			document.body.removeChild(_this.diaDiv);
			document.body.removeChild(_this.mask);          
		};
	}
}
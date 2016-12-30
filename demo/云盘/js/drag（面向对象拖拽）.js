//面向对象拖拽，使用时只需要new Drag（{拖拽元素、移动元素}），就可以让这些元素具有拖拽功能。
function Drag(options){
	//必填并且必须是一个对象
	if( options && options.constructor !== Object ){   //存在就既不是undefined也不是null

		//抛出错误
		throw new Error("传入的参数错误，必须是对象");
		return;
	}

	//不能直操作传进来的对象options，   克隆并预设值
	this.defaults = {      //原型 init（）里需要用到，所以挂在实力身上
		targetEle:null,
		moveEle:null
	}

	for( var attr in options ){          //问这种附地址的，修改的还是原来的元素。有意义吗？----元素是原来的元素，但是对象options不能修改
		if(options.hasOwnProperty(attr)){
			this.defaults[attr] = options[attr];
		}
	}

	//拖拽的目标
	//this.element是移动的目标，如果传入了移动元素，就移动移动元素，如果没有传入移动元素，移动的元素就是点击元素
	if( this.defaults.moveEle ){
		this.element = this.defaults.moveEle;
	}else{
		this.element = this.defaults.targetEle;
	}

	
	this.init();
}

Drag.prototype = {
	constructor: Drag,
	init(){
		//要把一个函数的this改变为指定的值，并且不调用函数
		this.defaults.targetEle.onmousedown = this.downFn.bind(this);
	},
	downFn(ev){
		//this => 实例
		this.disX = ev.clientX - this.element.offsetLeft;
		this.disY = ev.clientY - this.element.offsetTop;

		document.onmousemove = this.moveFn.bind(this);
		document.onmouseup = this.upFn;

		ev.preventDefault();
	},
	limit(){     //默认不能拖出可视区
		if( this.x < 0 ){
			this.x = 0;
		}
		if( this.x > document.documentElement.clientWidth - this.element.offsetWidth ){
			this.x = document.documentElement.clientWidth - this.element.offsetWidth;
		}
		if( this.y < 0 ){
			this.y = 0;
		}
		if( this.y > document.documentElement.clientHeight - this.element.offsetHeight ){
			this.y = document.documentElement.clientHeight - this.element.offsetHeight;
		}
	},
	moveFn(ev){

		//限制的两个运算后的值

		this.x = ev.clientX - this.disX;
		this.y = ev.clientY - this.disY;

		this.limit();    //限制拖拽范围

		this.element.style.left = this.x + "px";
		this.element.style.top = this.y + "px";
	},
	upFn(){
		document.onmousemove = null;
		document.onmouseup = null;
	}
}
//画布对象
class Canvas { //人物、子弹集合、怪物集合都挂在画布对象身上
	constructor() {
		this.can = document.getElementById("canvas"); //canvas画布元素
		this.ctx = this.can.getContext("2d"); //2d场景
		this.canWidth = this.can.width; //画布宽
		this.canHeight = this.can.height; //画布高
		this.p; //生成人物实例，初始化，人物对象挂在画布对象身上
		this.keySet = new Set(); //方向set
		this.bulSet = new Set(); //子弹set，装的是每一个实例
		this.monSet = new Set(); //怪兽set，装的是每一个实例
		this.mx; //鼠标相对于画布左距离，由鼠标移动事件实时计算
		this.my; //鼠标相对于画布上距离，由鼠标移动事件实时计算
		this.loop=0;         //减慢循环的数字
		this.init();
	}
	init() { //new实例的时候必然要执行一次的东西，且只执行一次
		this.addEvent(); //给canvas元素添加事件
	}
	creatP(obj) { //生成人物
		this.p = new Player(obj);
	}
	addEvent() {
		//画布添加鼠标移动事件
		this.can.addEventListener("mousemove", (e) => {
			this.mx = e.offsetX;
			this.my = e.offsetY;
		}, false)
		//画布鼠标点击事件
		this.can.addEventListener("click", (e) => {
			//判断射击间隔
			if(this.p.canFire) { //如果人物是可以射击状态，射击(射击函数shot自带延迟射击，用于等待演示动画)
				//生成子弹实例，放入子弹set，子弹数量根据p.shot(散弹等级).所以这个函数要在p实例出来之后
				this.shot(e, this.p.shot); //p.shot数值无上限。。
				this.p.canFire = false; //射击后状态为不可射击状态，
				this.p.reFire(); //等待根据p的射速重置可射击状态
				this.p.status1 = "atk"; //人物状态变为射击状态，待动画演示完毕自动取消状态，并发射子弹
				this.p.atkNow = 0; //每次点击之前计数清0
			}
		}, false)
		//添加键盘事件
		document.addEventListener("keydown", (e) => {
			if(e.keyCode == 65) { //a    左
				this.keySet.add("l");
			}
			if(e.keyCode == 83) { //s     下
				this.keySet.add("b");
			}
			if(e.keyCode == 68) { //d    右
				this.keySet.add("r");
			}
			if(e.keyCode == 87) { //w    上
				this.keySet.add("t");
			}
		}, false)
		document.addEventListener("keyup", (e) => {
			if(e.keyCode == 65) { //a    左
				this.keySet.delete("l");
			}
			if(e.keyCode == 83) { //s     下
				this.keySet.delete("b");
			}
			if(e.keyCode == 68) { //d    右
				this.keySet.delete("r");
			}
			if(e.keyCode == 87) { //w    上
				this.keySet.delete("t");
			}
		}, false)
	}
	shot(e, shot) { //生成子弹实例，放入子弹set，参数shot是p.shot，散弹等级。根据天赋加点而来.延迟射击，等待演示动画
		setTimeout(function() {
			for(let i = 0; i < shot + 1; i++) { //0只生成一个子弹，1生成3个，2生成5个，3生成7个..
				if(i == 0) { //第一次只生成一个子弹，之后的每次都生成一对子弹。 
					let b = new Bullet(e, {});
					c.bulSet.add(b);
				} else { //非第一颗子弹，根据i生成一对子弹
					let b = new Bullet(e, {}, 0.05 * i);
					let b1 = new Bullet(e, {}, -0.05 * i);
					c.bulSet.add(b);
					c.bulSet.add(b1);
				}
			}
		}, 400)
	}
	gameloop() { //循环
		window.requestAnimFrame(c.gameloop.bind(c)); //另一种定时器,好处1：切换页面动画会暂停。2、浏览器专门为动画提供的API，会自动优化。3、H5 API
		this.loop++;
		this.ctx.clearRect(0, 0, this.canWidth, this.canHeight); //清除画布
		//绘制子弹们,先绘制子弹再绘制人，子弹就盖在人下面了
		for(let value of this.bulSet) {
			value.draw();
		}
		//绘制人
		this.p.draw();
		//绘制怪兽们
		for(let value of this.monSet) {
			value.draw();
		}
	}
	creatMonster() { //产生怪兽
		//先产生一只狐狸
		let m = new Monster(data.monster.fox);
		this.monSet.add(m);
//		//定时产生狐狸
		setInterval(() => {
			let n = Math.ceil(2 * Math.random()); //随机1-2个
			for(let i = 0; i < n; i++) {
				let m = new Monster(data.monster.fox);
				this.monSet.add(m);
			}
		}, 4000) //4\8\12\16\20\24\28\32\36\40
//		//10秒后定时产生豹子
		setTimeout(() => {
			setInterval(() => {
				let n = Math.ceil(1 * Math.random());
				for(let i = 0; i < n; i++) {
					let m = new Monster(data.monster.leopard);
					this.monSet.add(m);
				}
			}, 7000)
		}, 10000)
//		//20秒后定时产生野猪
		setTimeout(() => {
			setInterval(() => {
				let n = Math.ceil(1 * Math.random());
				for(let i = 0; i < n; i++) {
					let m = new Monster(data.monster.pig);
					this.monSet.add(m);
				}
			}, 9000)
		}, 20000) 
//		//30秒后产生鳄鱼
		setTimeout(() => {
			setInterval(() => {
				let n = Math.ceil(1 * Math.random());
				for(let i = 0; i < n; i++) {
					let m = new Monster(data.monster.alligator);
					this.monSet.add(m);
				}
			}, 13000)
		}, 30000)
		//60秒后狐狸boss出现+10个小狐狸
		setTimeout(()=>{
			let m = new Monster(data.monster.foxBoss);
			this.monSet.add(m);
			for(let i = 0; i < 10; i++) {
				let m = new Monster(data.monster.fox);
				this.monSet.add(m);
			}
		},60000)
		//120秒后豹子boss出现+10个小豹子
		setTimeout(()=>{
			let m = new Monster(data.monster.leopardBoss);
			this.monSet.add(m);
			for(let i = 0; i < 10; i++) {
				let m = new Monster(data.monster.leopard);
				this.monSet.add(m);
			}
		},90000)
		//180秒后野猪boss出现+10个小野猪
		setTimeout(()=>{
			let m = new Monster(data.monster.pigBoss);
			this.monSet.add(m);
			for(let i = 0; i < 10; i++) {
				let m = new Monster(data.monster.pig);
				this.monSet.add(m);
			}
		},120000)
		//240秒后鳄鱼boss出现+10个小鳄鱼
		setTimeout(()=>{
			let m = new Monster(data.monster.alligatorBoss);
			this.monSet.add(m);
			for(let i = 0; i < 10; i++) {
				let m = new Monster(data.monster.alligator);
				this.monSet.add(m);
			}
		},150000)
	}
}
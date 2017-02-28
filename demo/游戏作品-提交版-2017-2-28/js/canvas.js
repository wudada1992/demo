//画布对象
class Canvas {
	constructor() {
		this.can = document.getElementById("canvas");
		this.ctx = this.can.getContext("2d");
		this.canWidth = this.can.width;
		this.canHeight = this.can.height;
		this.p;
		this.keySet = new Set();
		this.bulSet = new Set();
		this.monSet = new Set();
		this.mx;
		this.my;
		this.loop;
		this.timer_interval_fox;
		this.timer_interval_leopard;
		this.timer_interval_pig;
		this.timer_interval_alligator;
		this.timer_timeout_leopard;
		this.timer_timeout_pig;
		this.timer_timeout_alligator;
		this.timer_timeout_foxBoss;
		this.timer_timeout_leopardBoss;
		this.timer_timeout_pigBoss;
		this.timer_timeout_alligatorBoss;
		this.g;
		this.startTime;
		this.sNumber = 0;
		this.sScore = 0;
		this.init();
	}
	init() {
		this.addEvent();
	}
	addEvent() {
		this.can.addEventListener("mousemove", (e) => {
			this.mx = e.offsetX;
			this.my = e.offsetY;
		}, false)
		this.can.addEventListener("click", (e) => {
			if(this.p.canFire) {
				this.shot(e, this.p.shot);
				this.p.canFire = false;
				this.p.reFire();
				this.p.status1 = "atk";
				this.p.atkNow = 0;
			}
		}, false)
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
	shot(e, shot) {
		setTimeout(function() {
			for(let i = 0; i < shot + 1; i++) {
				if(i === 0) {
					let b = new Bullet(e, {});
					c.bulSet.add(b);
				} else {
					let b = new Bullet(e, {}, 0.05 * i);
					let b1 = new Bullet(e, {}, -0.05 * i);
					c.bulSet.add(b);
					c.bulSet.add(b1);
				}
			}
		}, 400)
	}
	newPlay() {
		this.startTime = new Date();
		this.sNumber = 0;
		this.sScore = 0;
		this.creatP(t.count());
		this.gameloop();
		this.creatMonster();
	}
	gameOver() {
		au1.src = "";
		au.volume = 0.3;
		au.src = "../audio/gameover.mp3";
		this.g = new GameOver();
		clearInterval(this.timer_interval_fox);
		clearInterval(this.timer_interval_leopard);
		clearInterval(this.timer_interval_pig);
		clearInterval(this.timer_interval_alligator);
		clearTimeout(this.timer_timeout_leopard);
		clearTimeout(this.timer_timeout_pig);
		clearTimeout(this.timer_timeout_alligator);
		clearTimeout(this.timer_timeout_foxBoss);
		clearTimeout(this.timer_timeout_leopardBoss);
		clearTimeout(this.timer_timeout_pigBoss);
		clearTimeout(this.timer_timeout_alligatorBoss);
		this.monSet.clear();
		this.bulSet.clear();
		this.keySet.clear();
		cancelAnimationFrame(this.loop);
		this.ctx.clearRect(0, 0, this.canWidth, this.canHeight); //清除画布
	}
	creatP(obj) {
		this.p = new Player(obj);
	}
	gameloop() {
		this.loop = requestAnimFrame(c.gameloop.bind(c));
		this.ctx.clearRect(0, 0, this.canWidth, this.canHeight);
		for(let value of this.bulSet) {
			value.draw();
		}
		if(this.p) {
			this.p.draw();
		}
		for(let value of this.monSet) {
			value.draw();
		}
	}
	creatMonster() {
		setTimeout(() => {
			au1.src = "../audio/atk-bg.mp3";
		}, 3000);
		this.timer_interval_fox = setInterval(() => {
			let n = Math.ceil(2 * Math.random());
			for(let i = 0; i < n; i++) {
				let m = new Monster(data.monster.fox);
				this.monSet.add(m);
			}
		}, 3000) //4\8\12\16\20\24\28\32\36\40
		this.timer_timeout_leopard = setTimeout(() => {
			this.timer_interval_leopard = setInterval(() => {
				let m = new Monster(data.monster.leopard);
				this.monSet.add(m);
			}, 7000)
		}, 10000)
		this.timer_timeout_pig = setTimeout(() => {
			this.timer_interval_pig = setInterval(() => {
				let m = new Monster(data.monster.pig);
				this.monSet.add(m);
			}, 9000)
		}, 20000)
		this.timer_timeout_alligator = setTimeout(() => {
			this.timer_interval_alligator = setInterval(() => {
				let m = new Monster(data.monster.alligator);
				this.monSet.add(m);
			}, 13000)
		}, 30000)
		this.timer_timeout_foxBoss = setTimeout(() => {
			let m = new Monster(data.monster.foxBoss);
			this.monSet.add(m);
			for(let i = 0; i < 5; i++) {
				let m = new Monster(data.monster.fox);
				this.monSet.add(m);
			}
		}, 60000)
		this.timer_timeout_leopardBoss = setTimeout(() => {
			let m = new Monster(data.monster.leopardBoss);
			this.monSet.add(m);
			for(let i = 0; i < 5; i++) {
				let m = new Monster(data.monster.leopard);
				this.monSet.add(m);
			}
		}, 90000)
		this.timer_timeout_pigBoss = setTimeout(() => {
			let m = new Monster(data.monster.pigBoss);
			this.monSet.add(m);
			for(let i = 0; i < 5; i++) {
				let m = new Monster(data.monster.pig);
				this.monSet.add(m);
			}
		}, 120000)
		this.timer_timeout_alligatorBoss = setTimeout(() => {
			let m = new Monster(data.monster.alligatorBoss);
			this.monSet.add(m);
			for(let i = 0; i < 5; i++) {
				let m = new Monster(data.monster.alligator);
				this.monSet.add(m);
			}
		}, 150000)
	}
}
//人物对象
class Player {
	constructor(obj) {
		this.damage = 5 + obj.atk * obj.atk + obj.atkB * 2;
		this.speed = 2 + obj.speed * obj.speed * 0.2;
		this.maxHp = 200 + obj.hp * obj.hp * 50;
		this.atr = 500 + obj.atr * obj.atr * 50;
		this.coe = obj.atkB === 0 ? 1 : (2 - obj.atkB * 0.3);
		this.cri = obj.cri * obj.cri * 0.1;
		this.nb = 0 + obj.nb * 2;
		this.rate = 1 - obj.rate * 0.1;
		this.thump = obj.thump;
		this.shot = 0 + obj.vast + obj.num;
		this.hurt = 2 + obj.hurt * 2;
		this.name = "archer";
		this.img = [];
		this.status = "";
		this.status1 = "";
		this.scratchNum = 0;
		this.hp = this.maxHp;
		this.w = 250;
		this.h = 250;
		this.x = document.getElementById("canvas").width * 0.5;
		this.y = document.getElementById("canvas").height * 0.5;
		this.canFire = true;
		this.angle = 0;
		this.scratchImg = new Image();
		this.hpImg = new Image();
		this.imgsStand = [];
		this.imgsStandAll = 50;
		this.standNow = 0;
		this.imgsRunFoot = [];
		this.imgsRunFootAll = 33;
		this.runFootNow = 0;
		this.imgsRunHead = [];
		this.imgsRunHeadAll = 33;
		this.runHeadNow = 0;
		this.imgsAtk = [];
		this.imgsAtkAll = 39;
		this.atkNow = 0;
		this.imgStandFoot = new Image();
		this.atk = 0;
		this.init();
	}
	init() {
		this.creatImgs();
	}
	draw() {
		this.move();
		let deltaY = c.my - this.y;
		let deltaX = c.mx - this.x;
		this.angle = Math.atan2(deltaY, deltaX) + Math.PI / 2;
		this.imgFn();
		c.ctx.save();
		c.ctx.translate(this.x, this.y);
		c.ctx.rotate(this.angle);
		for(let i = 0; i < this.img.length; i++) {
			c.ctx.drawImage(this.img[i], -this.w * 0.5, -this.h * 0.5, this.w, this.h);
		}
		c.ctx.restore();
		this.showHp();
		if(this.hp <= 0) {
			c.gameOver();
			return;
		}
		this.showScratch();
	}
	move() {
		if(c.keySet.size) {
			this.status = "run";
			if(c.keySet.has("l")) {
				if(c.keySet.size == 1) {
					this.x -= this.speed;
				} else {
					this.x -= this.speed / 2 * Math.sqrt(2);
				}
				if(this.x < 0) {
					this.x = 0;
				}
			}
			if(c.keySet.has("r")) {
				if(c.keySet.size == 1) {
					this.x += this.speed;
				} else {
					this.x += this.speed / 2 * Math.sqrt(2);
				}
				if(this.x > c.canWidth) {
					this.x = c.canWidth;
				}
			}
			if(c.keySet.has("t")) {
				if(c.keySet.size == 1) {
					this.y -= this.speed;
				} else {
					this.y -= this.speed / 2 * Math.sqrt(2);
				}
				if(this.y < 0) {
					this.y = 0;
				}
			}
			if(c.keySet.has("b")) {
				if(c.keySet.size == 1) {
					this.y += this.speed;
				} else {
					this.y += this.speed / 2 * Math.sqrt(2);
				}
				if(this.y > c.canHeight) {
					this.y = c.canHeight;
				}
			}
		} else {
			this.status = "stand";
		}

	}
	reFire() {
		setTimeout(() => {
			this.canFire = true;
		}, this.rate * 1000)
	}
	showScratch() {
		if(this.scratchNum !== 0) {
			if(this.scratchNum === 1) {
				au.volume = 1;
				au.src = "../audio/hurt.mp3";
			}
			c.ctx.save();
			c.ctx.translate(this.x, this.y);
			c.ctx.drawImage(this.scratchImg, 0, 0, 214, 100, -25, -12, 50, 25);
			c.ctx.restore();
			this.scratchNum++;
			if(this.scratchNum > 30) {
				this.scratchNum = 0;
			}
		}
	}
	showHp() {
		if(this.hp < 0) {
			this.hp = 0;
		}
		c.ctx.save();
		c.ctx.translate(this.x, this.y);
		c.ctx.drawImage(this.hpImg, 0, 0, 55, 8, -50, -50, 100, 6);
		c.ctx.drawImage(this.hpImg, 55, 0, 54, 8, -50, -50, this.hp / this.maxHp * 100, 6);
		c.ctx.restore();
	}
	imgFn() {
		if(this.status === "stand") {
			if(this.status1 === "atk") {
				this.img = [this.imgStandFoot, this.imgsAtk[this.atkNow]];
				this.atkNow++;
				if(this.atkNow === 10) {
					au.volume = 1;
					au.src = "../audio/p-atk.mp3";
				}
				if(this.atkNow === this.imgsAtkAll) {
					this.status1 = "";
				}
			} else {
				this.img = [this.imgsStand[this.standNow]];
				this.standNow++;
				this.standNow %= this.imgsStandAll;
			}
		} else if(this.status === "run") {
			if(this.status1 === "atk") {
				this.img = [this.imgsRunFoot[this.runFootNow], this.imgsAtk[this.atkNow]];
				this.runFootNow++;
				this.runFootNow %= this.imgsRunFootAll;
				this.atkNow++;
				if(this.atkNow === 10) {
					au.volume = 1;
					au.src = "../audio/p-atk.mp3";
				}
				if(this.atkNow === this.imgsAtkAll) {
					this.status1 = "";
				}
			} else {
				this.img = [this.imgsRunFoot[this.runFootNow], this.imgsRunHead[this.runHeadNow]];
				this.runFootNow++;
				this.runFootNow %= this.imgsRunFootAll;
				this.runHeadNow++;
				this.runHeadNow %= this.imgsRunHeadAll;
			}
		}
	}
	creatImgs() {
		for(let i = 0; i < this.imgsStandAll; i++) {
			let img = new Image();
			img.src = '../img/canvas/hero/' + this.name + '/stand/' + i + '.png';
			this.imgsStand.push(img);
		}
		for(let i = 0; i < this.imgsRunFootAll; i++) {
			let img = new Image();
			img.src = '../img/canvas/hero/' + this.name + '/runFoot/' + i + '.png';
			this.imgsRunFoot.push(img);
		}
		for(let i = 0; i < this.imgsRunHeadAll; i++) {
			let img = new Image();
			img.src = '../img/canvas/hero/' + this.name + '/runHead/' + i + '.png';
			this.imgsRunHead.push(img);
		}
		for(let i = 0; i < this.imgsAtkAll; i++) {
			let img = new Image();
			img.src = '../img/canvas/hero/' + this.name + '/atk/' + i + '.png';
			this.imgsAtk.push(img);
		}
		this.imgStandFoot.src = "../img/canvas/hero/" + this.name + '/standFoot/0.png';
		this.scratchImg.src = "../img/canvas/ico/scratch.png";
		this.hpImg.src = "../img/canvas/hero/hp.png";
	}
}
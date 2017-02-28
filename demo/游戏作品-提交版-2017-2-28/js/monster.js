//怪兽对象
class Monster {
	constructor(obj) {
		this.obj = obj;
		this.name = obj.name;
		this.maxHp = obj.maxHp;
		this.atk = obj.atk;
		this.rate = obj.rate;
		this.atr = obj.atr;
		this.speed = obj.speed;
		this.w = obj.w;
		this.h = obj.h;
		this.b = obj.b;
		this.imgsRunAll = obj.imgsRunAll;
		this.imgsHitAll = obj.imgsHitAll;
		this.imgsKnockbackAll = obj.imgsKnockbackAll;
		this.imgsDeathAll = obj.imgsDeathAll;
		this.score = obj.score;
		this.canAtk = true;
		this.hp = this.maxHp;
		this.pNum = 0;

		this.pNum2 = 0;
		this.hpNum = 0;
		this.x = 0;
		this.y = 0;
		this.angle = 0;
		this.status = "run";
		this.img;
		this.powImg = new Image();
		this.hpImg = new Image();
		this.imgsRun = [];
		this.runNow = 0;
		this.imgsHit = [];
		this.hitNow = 0;
		this.imgsDeath = [];
		this.deathNow = 0;
		this.imgsKnockback = [];
		this.knockbackNow = 0;
		this.deltaY;
		this.deltaX;
		this.l;
		this.init()
	}
	init() {
		this.born();
		this.creatImgs();
	}
	draw() {
		if(this.status === "run") {
			this.computeFn();
			if(this.l < this.atr) {
				if(this.canAtk) {
					this.status = "hit";
					this.canAtk = false;
					this.reAtk();
				}
			} else {
				this.y += this.dy;
				this.x += this.dx;
			}
			this.img = this.imgsRun[this.runNow];
			this.runNow = (this.runNow + 1) % this.imgsRunAll;
		}
		if(this.status === "death") {
			this.img = this.imgsDeath[this.deathNow];
			this.deathNow++;
			if(this.deathNow === this.imgsDeathAll) {
				c.monSet.delete(this);
				c.sNumber++;
				c.sScore += this.score;
			}
		}
		if(this.status === "knockback") {
			this.img = this.imgsKnockback[this.knockbackNow];
			this.knockbackNow++;
			this.y -= this.dy * c.p.nb;
			this.x -= this.dx * c.p.nb;
			if(this.knockbackNow === this.imgsKnockbackAll) {
				this.knockbackNow = 0;
				this.status = "run";
			}
		}
		if(this.status === "hit") {
			this.img = this.imgsHit[this.hitNow];
			this.hitNow++;
			if(this.hitNow === this.imgsHitAll) {
				c.p.hp -= this.atk * c.p.coe;
				c.p.scratchNum = 1;
				this.hitNow = 0;
				this.status = "run";
			}
		}
		this.drawFn();
		this.powFn();
		this.showHp();
	}
	born() {
		let r1 = Math.random();
		let r2 = Math.random();
		if(r1 <= 0.5) {
			if(r2 <= 0.5) {
				this.x = 0;
			} else {
				this.x = c.canWidth;
			}
			this.y = c.canHeight * Math.random();
		} else {
			if(r2 <= 0.5) {
				this.y = 0;
			} else {
				this.y = c.canHeight;
			}
			this.x = c.canWidth * Math.random();
		}
	}
	death() {
		this.status = "death";
		if(this.name === "fox") {
			au.volume = 0.3;
			au.src = "../audio/fox-death.mp3";
		} else if(this.name === "leopard") {
			au.volume = 0.3;
			au.src = "../audio/leopard-death.mp3";
		} else if(this.name === "pig") {
			au.volume = 0.5;
			au.src = "../audio/pig-death.mp3";
		} else if(this.name === "alligator") {
			au.volume = 0.8;
			au.src = "../audio/alligator-death.mp3";
			if(this.obj.name2 === "last") {
				alert("我的大鳄鱼竟然都被你给砸死了%>_<%");
				alert("厉害了word哥or姐！")
				alert("作者惭愧的表示：后面的游戏内容我压根就没写    (*@ο@*)");
				alert("小样，你该不会是改我js代码了吧  o(￣ヘ￣o#)");
				alert("真的没改？好吧");
				alert("恭喜你！通关暗号：10086。凭暗号联系作者可以得到一份神秘大礼！！！");
				alert("QQ：544429676      微信：wudongda1992");
				alert("再会！");
				c.gameOver();
			}
		}
	}
	creatImgs() {
		for(let i = 0; i < this.imgsRunAll; i++) {
			let img = new Image();
			img.src = '../img/canvas/monster/' + this.name + '/run/' + i + '.png';
			this.imgsRun.push(img);
		}
		for(let i = 0; i < this.imgsHitAll; i++) {
			let img = new Image();
			img.src = '../img/canvas/monster/' + this.name + '/hit/' + i + '.png';
			this.imgsHit.push(img);
		}
		for(let i = 0; i < this.imgsKnockbackAll; i++) {
			let img = new Image();
			img.src = '../img/canvas/monster/' + this.name + '/knockback/' + i + '.png';
			this.imgsKnockback.push(img);
		}
		for(let i = 0; i < this.imgsDeathAll; i++) {
			let img = new Image();
			img.src = '../img/canvas/monster/' + this.name + '/death/' + i + '.png';
			this.imgsDeath.push(img);
		}
		this.powImg.src = "../img/canvas/ico/pow.png";
		this.hpImg.src = "../img/canvas/monster/hp.png";
	}
	computeFn() {
		this.deltaY = c.p.y - this.y;
		this.deltaX = c.p.x - this.x;
		this.l = Math.sqrt(Math.pow(Math.abs(this.deltaX), 2) + Math.pow(Math.abs(this.deltaY), 2));
		this.dy = this.speed * this.deltaY / this.l;
		this.dx = this.speed * this.deltaX / this.l;
		this.angle = Math.atan2(this.deltaY, this.deltaX) + Math.PI / 2;
	}
	powFn() {
		if(this.pNum !== 0) {
			if(this.pNum === 1) {
				this.pNum2 = 0;
			}
			let w = this.pNum * 2.5 + 20;
			c.ctx.save();
			c.ctx.translate(this.x, this.y);
			c.ctx.drawImage(this.powImg, -w / 2, -w / 2, w, w);
			c.ctx.restore();
			this.pNum++;
			if(this.pNum >= 14) {
				this.pNum--;
				this.pNum2++;
				if(this.pNum2 === 30) {
					this.pNum = 0;
				}
			}
		}
	}
	drawFn() {
		c.ctx.save();
		c.ctx.translate(this.x, this.y);
		c.ctx.rotate(this.angle);
		c.ctx.drawImage(this.img, -this.w * 0.5, -this.h * 0.5, this.w, this.h);
		c.ctx.restore();
	}
	showHp() {
		if(this.hpNum !== 0) {
			if(this.hp < 0) {
				this.hp = 0;
			}
			c.ctx.save();
			c.ctx.translate(this.x, this.y);
			c.ctx.drawImage(this.hpImg, 0, 0, 150, 8, -50, -50, 100, 6);
			c.ctx.drawImage(this.hpImg, 150, 0, 150, 8, -50, -50, this.hp / this.maxHp * 100, 6);
			c.ctx.restore();
			this.hpNum++;
			if(this.hpNum >= 40) {
				this.hpNum = 0;
			}
		}
	}
	reAtk() {
		setTimeout(() => {
			this.canAtk = true;
		}, this.rate * 1000)
	}
}
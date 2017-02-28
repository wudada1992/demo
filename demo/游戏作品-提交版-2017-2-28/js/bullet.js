class Bullet {
	constructor(e, obj, d) {
		this.w = 40;
		this.h = 40;
		this.speed = 20;
		this.img = new Image();
		this.img.src = "../img/canvas/ico/bullet.png";
		this.cr = false;
		this.ox = c.p.x;
		this.oy = c.p.y;
		this.x = this.ox;
		this.y = this.oy;
		this.nl = 0;
		this.deltaX = (e.offsetX || e.layerX) - this.ox;
		this.deltaY = (e.offsetY || e.layerY) - this.oy;
		let l = Math.sqrt(Math.pow(Math.abs(this.deltaX), 2) + Math.pow(Math.abs(this.deltaY), 2));
		this.angle = Math.atan2(this.deltaY, this.deltaX);
		this.d = d;
		this.dx = this.speed * this.deltaX / l;
		this.dy = this.speed * this.deltaY / l;
		this.init(e);
		this.ms = new Set;
	}
	init(e) {
		this.crFn();
		this.vastFn(e);
	}
	draw() {
		for(let value of c.monSet) {
			if(this.ms.has(value)) {
				continue;
			}
			let l = Math.sqrt(Math.pow(Math.abs(this.x - value.x), 2) + Math.pow(Math.abs(this.y - value.y), 2));
			if(l < (value.b + c.p.thump * 50) && value.hp > 0) {
				value.hpNum = 1;
				if(this.cr == true) {
					value.hp -= c.p.damage * c.p.hurt;
					value.pNum = 1;
				} else {
					value.hp -= c.p.damage;
				}
				this.ms.add(value);
				if(c.p.nb !== 0) {
					value.status = "knockback";
				}
				if(value.hp <= 0) {
					this.ms.delete(value);
					value.death();
				}
				if(c.p.thump === 0) {
					this.death();
					return;
				}
			}
		}
		this.move();
		this.nl = Math.sqrt(Math.pow(Math.abs(this.x - this.ox), 2) + Math.pow(Math.abs(this.y - this.oy), 2));
		if(this.nl > c.p.atr) {
			this.death();
			return;
		}
		this.drawFn();
	}
	death() {
		c.bulSet.delete(this);
	}
	move() {
		this.x += this.dx;
		this.y += this.dy;
	}
	crFn() {
		if(this.cr == false) {
			let n = Math.random();
			if(n < c.p.cri) {
				this.cr = true;
			}
		}
	}
	vastFn(e) {
		if(this.d) {
			let x = (e.offsetX || e.layerX) - this.ox;
			let y = (e.offsetY || e.layerY) - this.oy;
			let l = Math.sqrt(Math.pow(Math.abs(x), 2) + Math.pow(Math.abs(y), 2));
			let angle = Math.atan2(y, x);
			let angle1 = angle + this.d;
			let x1 = l * Math.cos(angle1);
			let y1 = l * Math.sin(angle1);
			let X = this.ox + x1;
			let Y = this.oy + y1;
			this.dx = this.speed * x1 / l;
			this.dy = this.speed * y1 / l;
			this.angle = angle1;
		}
	}
	drawFn() {
		c.ctx.save();
		c.ctx.translate(this.x, this.y);
		c.ctx.rotate(this.angle);
		c.ctx.drawImage(this.img, -this.w, -this.h * 0.5, this.w, this.h);
		c.ctx.restore();
	}
}
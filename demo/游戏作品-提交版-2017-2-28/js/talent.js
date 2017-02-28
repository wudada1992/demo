class Talent {
	constructor() {
		this.wrap = document.getElementById("talent_wrap");
		this.content = document.getElementById("content");
		this.eleInfo = document.createElement("div");
		this.eleInfo.className = "text";
		this.spAll = 12;
		this.sp = 0;
		this.init();
	}
	init() {
		this.born();
		this.addEvent();
	}
	born() {
		let str = `<div id="lf1"></div>
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
					<div class="go">进入</div>`;
		for(let value in data.talent) {
			str += `<div class="t" id="${value}" style="left:${data.talent[value].left+75}px;top:${data.talent[value].top+130}px;background-position:${data.talent[value].l1}px ${data.talent[value].t1}px;">
						<div class="info">
							0/${data.talent[value].n}
						</div>
					</div>`
		}
		this.content.innerHTML += str;
		this.spFn();
	}
	addEvent() {
		this.content.addEventListener("mouseover", (e) => {
			let t = e.target;
			if(t.className === "t") {
				this.showText(t.id);
				TweenMax.to(e.target, 0.1, { scale: 1.2, delay: 0, ease: Linear.easeOut });
			}
		})
		this.content.addEventListener("mouseout", (e) => {
			let t = e.target;
			if(t.className === "t") {
				this.remove();
				TweenMax.to(e.target, 0.1, { scale: 1, delay: 0, ease: Linear.easeOut });
			}
		})
		this.content.addEventListener("mousemove", (e) => {
			let t = e.target;
			if(t.className === "t") {
				this.eleInfo.style.left = e.clientX - this.content.getBoundingClientRect().left + 15 + "px";
				this.eleInfo.style.top = e.clientY - this.content.getBoundingClientRect().top + 15 + "px";
			}
		})
		this.content.addEventListener("click", (e) => {
			let t = e.target;
			if(t.className === "t" && e.which === 1) {
				let name = t.id;
				let obj = data.talent[name];
				if(this.eleInfo.getElementsByTagName("header")[0].dataset.pre || obj.now == obj.n) {
					this.defeat();
					return;
				}
				this.sp++;
				if(this.sp > this.spAll) {
					this.sp = this.spAll;
					this.defeat();
					return;
				}
				au.volume = 0.8; //改变音量
				au.src = "../audio/click.mp3";
				let info = t.getElementsByClassName("info")[0];
				obj.now++;
				if(obj.now === 1) {
					t.style.backgroundPosition = obj.l2 + 'px ' + obj.t2 + 'px';
				}
				if(obj.now == obj.n) {
					info.style.color = "yellow";
					info.style.borderColor = "yellow";
				}
				this.spFn();
				info.innerHTML = obj.now + '/' + obj.n;
				this.remove();
				this.showText(name);
			} else if(t.className === "go" && e.which === 1) {
				au.volume = 0.8;
				au.src = "../audio/click.mp3";
				setTimeout(() => {
					c.newPlay();
					this.out();
				}, 100);
			}
		})
		this.content.addEventListener("contextmenu", (e) => {
			let t = e.target;
			if(t.className === "t" && e.which === 3) {
				let name = t.id;
				let obj = data.talent[name];
				if(obj.now == 0) {
					this.defeat();
					e.preventDefault(name);
					return;
				}
				if(obj.now == 1) {
					if(data.talent[obj.next] && data.talent[obj.next].now !== 0) {
						this.defeat();
						e.preventDefault();
						return;
					}
				}
				au.volume = 0.8;
				au.src = "../audio/click.mp3";
				let info = t.getElementsByClassName("info")[0];
				obj.now--;
				if(obj.now == 0) {
					t.style.backgroundPositionX = obj.l1 + "px";
					t.style.backgroundPositionY = obj.t1 + "px";
				}
				this.sp--;
				this.spFn();
				info.style.color = "green";
				info.style.borderColor = "green";
				info.innerHTML = obj.now + '/' + obj.n;
				this.remove();
				this.showText(name);
			}
			e.preventDefault();
		})
	}
	spFn() {
		let eleSp = this.content.getElementsByClassName("sp")[0];
		eleSp.innerHTML = "剩余点数 ：" + (this.spAll - this.sp);
	}
	showText(a) {
		let obj = data.talent[a];
		let str = "";
		if(obj.pre) {
			let b = true;
			for(let i = 0; i < obj.pre.length; i++) {
				if(data.talent[obj.pre[i]].now === 0) {
					b = false;
				}
			}
			if(b === true) {
				str += `<header>
						${obj.name}
					</header>
					<div class="num">
						等级：${obj.now}/${obj.n}
					</div>`
			} else {
				str += `<header data-pre="0"; style="color:rgba(100,100,220,1);">
						${obj.name}
					</header>`
				for(let i = 0; i < obj.pre.length; i++) {
					if(data.talent[obj.pre[i]].now === 0) {
						str += `<div class="num" style="color:red;">
								请先学习 ：${data.talent[obj.pre[i]].name}
							</div>`
					}
				}
			}
		} else {
			str += `<header>
						${obj.name}
					</header>
					<div class="num">
						等级：${obj.now}/${obj.n}
					</div>`
		}
		if(obj.now === 0) {
			str += `<div class="describe">
					下一级:${obj.dis[0]}
				</div>`
		} else if(obj.now === obj.n) {
			str += `<div class="describe">
					${obj.dis[obj.n-1]}
				</div>`
		} else {
			str += `<div class="describe">
					${obj.dis[obj.now-1]}
				</div>
				<div class="describe">
					下一级:${obj.dis[obj.now]}
				</div>`
		}
		this.eleInfo.innerHTML = str;
		this.content.appendChild(this.eleInfo);
	}
	remove() {
		this.content.removeChild(this.eleInfo);
	}
	defeat() {
		au.volume = 1;
		au.src = "../audio/metal.mp3";
	}
	count() {
		let obj = {};
		for(let value in data.talent) {
			if(data.talent.hasOwnProperty(value)) {
				obj[value] = data.talent[value].now;
			}
		}
		return obj;
	}
	enter() {
		home.main.style.zIndex = 1;
		c.can.style.zIndex = 2;
		t.wrap.style.zIndex = 3;
		TweenMax.to("#content", 1, { y: 800, delay: 0.2, ease: Bounce.easeOut });
	}
	out() {
		TweenMax.to("#content", 0.6, { y: -800, delay: 0, ease: Linear.easeOut });
		setTimeout(() => {
			home.main.style.zIndex = 1;
			c.can.style.zIndex = 3;
			t.wrap.style.zIndex = 2;
		}, 1000)
	}
}
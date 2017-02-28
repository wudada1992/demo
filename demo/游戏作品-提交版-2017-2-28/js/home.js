//主页对象
class HomePage {
	constructor() {
		this.main = document.getElementById("main");
		this.init();
	}
	init() {
		this.creatLogo();
		this.creatList();
	}
	creatLogo() {
		let log = document.createElement("div");
		log.id = "logo";
		log.innerHTML += `<h1>
							部落3
						</h1>
						<span>
							Begin your adventure
						</span>`
		main.appendChild(log);
	}
	creatList() {
		let ul = document.createElement("ul");
		ul.id = "list";
		ul.innerHTML += `<li class="lis play">开始游戏</li>
					<li class="lis">剧情模式</li>
					<li class="lis">图鉴</li>
					<li class="lis">制作</li>
					<li class="lis">退出游戏</li>`
		main.appendChild(ul);
		ul.getElementsByClassName("play")[0].addEventListener("click", () => {
			au.volume = 0.8;
			au.src = "../audio/click.mp3";
			setTimeout(() => {
				document.getElementById("list").onmouseover = null;
				document.getElementById("list").onmouseout = null;
				this.leaveList();
				this.leaveLogo();
				setTimeout(() => {
					t.enter();
				}, 900)
			}, 200);
		})
		document.getElementById("list").onmouseover = function(e) {
			let t = e.target;
			if(t.classList.contains("lis")) {
				au.volume = 0.3;
				au.src = "../audio/tab.mp3";
				TweenMax.to(t, 0.1, { x: -20, delay: 0, ease: Linear.easeOut });
			}
		}
		document.getElementById("list").onmouseout = function(e) {
			let t = e.target;
			if(t.classList.contains("lis")) {
				TweenMax.to(t, 0.1, { x: 0, delay: 0, ease: Linear.easeOut });
			}
		}
	}
	pushLogo() {
		TweenMax.from("#logo", 2, { y: -200, delay: 1.5, ease: Elastic.easeOut });
	}
	leaveLogo() {
		TweenMax.to("#logo", 2, { y: -200, delay: 0.5, ease: Elastic.easeOut });
	}
	pushList() {
		TweenMax.staggerFrom(".lis", 2, { x: 200, scale: 0.5, opacity: 0, delay: 0.5, ease: Elastic.easeOut }, 0.2);
	}
	leaveList() {
		TweenMax.staggerTo(".lis", 2, { x: 250, scale: 0.5, opacity: 0, delay: 0, ease: Elastic.easeOut }, 0.1);
	}
}
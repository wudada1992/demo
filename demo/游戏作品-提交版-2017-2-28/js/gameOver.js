class GameOver {
	constructor() {
		this.wrap = document.getElementById("wrap");
		this.gameOver;
		this.sTime;
		this.init();
	}
	init() {
		this.count();
		this.born();
		this.addEvent();
	}
	count() {
		let nowTime = new Date();
		this.sTime = Math.floor((nowTime - c.startTime) / 1000);
	}
	born() {
		let str = `<div id="score">
					<header>Game Over!</header>
					<div class="sc">坚持时间：<span id="sTime">${this.sTime}    秒</span></div>
					<div class="sc">击杀怪物：<span id="sNumber">${c.sNumber}</span></div>
					<div class="sc">最终得分：<span id="sScore">${c.sScore}</span></div>
					<div id="replay">再来一局</div>
				</div>`;
		this.gameOver = document.createElement("div");
		this.gameOver.id = "gameOver";
		this.gameOver.innerHTML = str;
		this.wrap.appendChild(this.gameOver);
		TweenMax.staggerTo(".sc", 2, { x: 200, scale: 1, opacity: 1, delay: 0.2, ease: Elastic.easeOut }, 0.1);
	}
	addEvent() {
		document.getElementById("replay").addEventListener("click", () => {
			au.volume = 0.8;
			au.src = "../audio/click.mp3";
			this.wrap.removeChild(this.gameOver);
			t.enter();
		})
	}
}
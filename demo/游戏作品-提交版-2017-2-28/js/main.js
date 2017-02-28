//主函数
let au = document.getElementById("audio");
let au1 = document.getElementById("audio1");
au1.src = "../audio/home-bg.mp3";
let home = new HomePage();
let c;
let t;
home.pushLogo();
home.pushList();
setTimeout(function() {
	t = new Talent();
	c = new Canvas();
}, 500);
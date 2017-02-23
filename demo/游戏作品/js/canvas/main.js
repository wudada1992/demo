//主函数
let home = new HomePage(); //生成主页对象
let c; //canvas实例
let t; //天赋树实例
home.pushLogo(); //logo动画进入
home.pushList(); //菜单动画进入
//稍微推迟一下天赋树和canvas的加载，给video的加载留出更多空间
setTimeout(function() {
	t = new Talent(); //初始化天赋树
	c = new Canvas(); //生成canvas对象并初始化,此时并未生成人物实例p，canvas元素以can形式挂在canvas对象上
}, 500);
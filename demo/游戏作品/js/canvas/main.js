//主页、天赋页、canvas三页切换逻辑
//一上来的时候只有一个video、空天赋树、空画布，new主页才生成logo、list；talent（）天赋树才有内容；new canvas才放入人

	let homePage=new HomePage();   //生成主页对象
	homePage.pushLogo();           //logo动画进入
	homePage.pushList();           //菜单动画进入
	//稍微推迟一下天赋树和canvas的加载，给video的加载留出更多空间
	setTimeout(function(){
	    talent();   //初始化天赋树
	    let canvas=new Canvas();       //生成canvas对象并初始化，canvas元素以can形式挂在canvas对象上
	},500);
//	
//	canvas.gameloop();            //开始循环
//	canvas.creatMonster();         //生成怪物


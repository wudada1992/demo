(function(){
	//----------------------------自适应-------------------------------
	var logo_bg=document.getElementById("logo_bg");
	var head=document.getElementById("head");
	var bar=document.getElementById("bar");
	var wrap_main=document.getElementById("wrap_main");
	var bread=document.getElementById("bread");
	var files=document.getElementById("files");
	var tip=document.getElementById("fullTip");
	//响应式  当页面大小改变时执行此函数
	function resize(){
		var wrapH=window.innerHeight-head.offsetHeight-bar.offsetHeight;   //响应式大区高度
		wrap_main.style.height=wrapH+"px";
		var filesH=wrapH-bread.offsetHeight-40;     //文件区高度
		var filesW=files.clientWidth;               //文件区宽度
		files.style.height=filesH+"px";
		if(document.getElementsByClassName("file_bg")[0]){  //如果背景图存在,位置响应式
			var file_bg=document.getElementsByClassName("file_bg")[0];
			var file_bgT=(filesH-file_bg.offsetHeight)/2;     //背景区top
			var file_bgL=(filesW-file_bg.offsetWidth)/2      //背景区left
			file_bg.style.top=file_bgT<20?20+"px":file_bgT+"px";    //最小top为20px
			file_bg.style.left=file_bgL+"px";    //最小left为20px  
		}
	}
	//初始化响应式区
	resize();  
	//页面大小变化时自适应
	window.onresize=function(){   
		resize();
	}
	//-------------------------渲染各个区域--------------------------
	
	//1、准备数据、元素
	var rename=document.getElementById("rename");
	var datas=data.files;   //①获取数据，②生成页面里面在操纵数据，③以下是初始化生成页面并④操作页面，在操作页面的时候又要生成（重绘）页面。
	var tree=document.getElementById("tree");
	var file_items=files.getElementsByClassName("file_item");
	var treeSpans = tree.getElementsByTagName("span");//找到所有的树span,动态方法
	var lastId = 0;  //记录上一个点击过的树菜单
	var nowId=0;    //记录当前三大区当前id
	function drow(datas,id){                       //根据id重绘三大区,id是当前id
		bread.innerHTML = createNavHtml(datas,id);//面包屑随之改变
		files.innerHTML = createFilesHtml(datas,id);//文件区随之改变
		positionSpanById(treeSpans,lastId).style.background = '';   //树区颜色随之改变(不改变开闭合状态)
		positionSpanById(treeSpans,id).style.background = '#e1e8ed';
		lastId=id;
	}
	function positionSpanById(arr,id){        //根据id找到类数组或数组arr里的span元素，返回这个元素
		for( var i = 0; i < arr.length; i++ ){
			var fileId = arr[i].dataset.id;
			if( fileId == id ){
				return arr[i];
			}
		}
	}
	//2、初始化渲染树独有内容
	tree.innerHTML=createTreeHtml(datas,-1,1);     //画树
	//3、初始化渲染三区
	drow(datas,0);
	//-------------------------添加各个区的交互----------------------------- 
	//1. 树的事件(事件委托法)
	function openUl(tree_span){         //打开这个tree_span的子级ul
		var ico1=tree_span.getElementsByClassName("ico1")[0];
//		console.log(ico1.bb);       //如果找不到属性（undefined）不会报错，不会影响代码继续执行 ,所以下面的ico1如果找不到dataset.onoff也不会报错（没有子级的span的ico1没有dataset-onoff）
		if(ico1.dataset.onoff=="false"){    //如果开关是关闭，打开它的ul  
			tree_span.nextElementSibling.style.display="block";
			ico1.dataset.onoff="true";
			ico1.style.background="url(img/ico.png) -350px -17px";
			ifTree_onoffById(datas,tree_span.dataset.id,"true");   //修改数据为true
		}else if(ico1.dataset.onoff=="true"){          //如果开关是打开的，关闭ul
			tree_span.nextElementSibling.style.display="none";
			ico1.dataset.onoff="false";
			ico1.style.background="url(img/ico.png) -365px -17px";
			ifTree_onoffById(datas,tree_span.dataset.id,"false");   //修改数据为false
		}
	}
	tree.onclick=function(e){
		var target=e.target;
		if(target.className=="tree_span"){  //如果源头是树span
			drow(datas,target.dataset.id);
			nowId=target.dataset.id;
		}
		if(target.className=="ico2"){  //如果源头是ico2
			drow(datas,target.parentNode.dataset.id);
			nowId=target.parentNode.dataset.id;
		}
		if(target.className=="ico1"){
			openUl(target.parentNode);
		}
	}
	tree.ondblclick=function(e){
		var target=e.target;
		if(target.className=="ico2"){   //如果双击了ico2
			openUl(target.parentNode);
		}
		if(target.className=="tree_span"){    //如果双击了树span
			openUl(target);
		}
	}
	//2.面包屑的事件（事件委托法）
	var breadSpans=bread.getElementsByTagName("span");   //面包里的span
	bread.onclick = function (e){
		var target = e.target;  //找到事件源
		var allcheck=document.getElementById("allChech");   //勾选
		if( target.nodeName.toLowerCase() === "span" ){  //本来必须大写。如果事件源是一个span的话
			drow(datas,target.dataset.id);      //根据事件源身上的id重绘三区
			nowId=target.dataset.id;
		}
		if(target.id=="allCheck"){         //如果点击的是全选按钮
			if(file_items.length!=0){     //如果页面有item
				if(target.dataset.onoff=="false"){      //如果未全选，勾选并全钩选上
					allCheck.style.background="#55addc url(img/ico.png) -384px -24px";
					allCheck.style.border="1px solid #55addc";
					allCheck.dataset.onoff="true";     //打开开关
					for (var i = 0; i < file_items.length; i++) {    //全勾选
						select_item(file_items[i],1);
					}
				}else{           //如果已经全选，全清除
					allCheck.style.background="";         //清除
					allCheck.style.border="1px solid #d0d9de";
					allCheck.dataset.onoff="false";     //打开开关
					for (var i = 0; i < file_items.length; i++) {    //全清除
						select_item(file_items[i],0);
					}
				}
			}
		}
	}
	
	//3、文件区的事件（事件委托）
	function ifEveryChecked(){     //判断是否所有的file_itme都被选中，如果是allCheck选中，否则不选中
		var checks=files.getElementsByClassName("check");
		var arrChecks=Array.from(checks);
		var allCheck=document.getElementById("allCheck");
		if(arrChecks.length==0){         //如果页面没有item，跳出
			return;
		}
		if(arrChecks.every(function(value){     
			return value.dataset.onoff=="true";
		})){                    //如果全是点击状态
			allCheck.style.background="#55addc url(img/ico.png) -384px -24px";
			allCheck.style.border="1px solid #55addc";
			allCheck.dataset.onoff=true;
		}else{
			allCheck.style.background="";
			allCheck.dataset.onoff=false;
		}
	}
	//鼠标拖拽事件
	var lastX;
	var lastY;
	var div;         //每次拖拽重新赋值这个div为新生成的div
	var filesL=files.offsetLeft;     //files的 最左面
	var filesT=files.offsetTop;      //files的最上面
	var filesR=files.offsetLeft+files.offsetWidth;      //files的最右面
	var filesB=files.offsetTop+files.offsetHeight;      //files的最右面
	//鼠标按下
	//1、如果按在check区域，只勾选；
	//2、如果按在非check的item内部区域：
	//  ①如果item是选中的，拖动
	//	②如果item不是选中的，开始圈选
	//3、如果直接按在files区域，开始圈选
	
	files.onmousedown=function(e){   
		if(e.which!=1){     //鼠标左中右都是onclick，这里判断必须是左键的点击
			return;
		}
		if(rename.isRename==true){    //如果正在重命名状态，跳出   
			return;
		}
		logo_bg.focus();   //为了清空新建文件夹状态
		var target=e.target;
		if(target.className=="check"){   //如果点击的是框选按钮
			if(target.dataset.onoff=="false"){   //如果没选中，给他父级加.hover,他opacity=1
				select_item(target.parentNode,1);
			}else{          //如果是选中的，取消选中状态
				select_item(target.parentNode,0);
			}
			ifEveryChecked();
		}else{     //只要不是点在check区域
			var arrItems=Array.from(files.getElementsByClassName("file_item"));//获取当前所有item，放入一个数组
			lastX=e.clientX;
			lastY=e.clientY;
			if(parent(target,".file_item")&&parent(target,".file_item").classList.contains("hover")){  //如果是点在了item上，并且此item已经选中，执行拖动(注意此时会完成一个完整的按下-抬起从而触发onclick事件，后期需要处理)
				var num=0;
				var selectArr = whoSelect();   //所有选中的item，数组
				var isHitElement = null;  //被碰撞的元素 
				var sketchDiv=null;     //数字剪影
				var imposterDiv=null;    //用来碰撞检测的伪装者
				var pengzhuangItem=[];   //一个数组用来存放所有没有选中的item（用来检测碰撞的item）
				for (var i = 0; i < arrItems.length; i++) {       //遍历item，找到所欲待碰撞检测的item放入数组pengzhuangItem
					if(!arrItems[i].classList.contains("hover")){   //如果这个item没有hover class，放入pengzhuangItem
						pengzhuangItem.push(arrItems[i]);
					}
				}
				document.onmousemove=function(e){
					//如果x、y都小于15并且是第一次在此区域，直接return
					if(num==0&&Math.abs(e.clientX-lastX)<15&&Math.abs(e.clientY-lastY)<15){   //必须x或y移动超过15px才出现伪装者，这样在item身上点击进入子级的功能不受伪装者出现的影响,并且不是第一次进入此区域
						return;
					}
					num++;
					if(!sketchDiv){     //如果剪影不存在（第一次进入），生成剪影和伪装者
						//生成并放入剪影
						sketchDiv=document.createElement("div");
						sketchDiv.className="sketchDiv";
						sketchDiv.innerHTML=selectArr.length;
						document.body.appendChild(sketchDiv);
						//生成并放入伪装者
						imposterDiv = document.createElement("div");   
				        imposterDiv.style.cssText = `   width: 10px;
				        								height: 10px;
				        								position: absolute;
				        								left:0;
				        								top:0;
				        							`;
				       	document.body.appendChild(imposterDiv);
					}
					//每次鼠标移动的时候改变两者位置跟随鼠标
					sketchDiv.style.left = e.clientX+15 + "px";
			        sketchDiv.style.top = e.clientY+15 + "px";
			        imposterDiv.style.left = e.clientX-5 + "px";
			        imposterDiv.style.top = e.clientY-5 + "px";
			        //每次移动都要碰撞检测
			        isHitElement=null;    //每次移动都要清空碰撞到的元素,下面for循环执行完毕如果碰撞到了会修改这个值
				    pengzhuangItem.forEach(function(value){    //遍历待碰撞检测item
					    if(pengzhuang(imposterDiv,value)){    //如果和这个item碰上了,isHitElement变为这个item,否则保持为null
				       		isHitElement=value;
					    }
				    })
			        
				}
				document.onmouseup=function(){
					document.body.removeChild(sketchDiv);    //清除剪影
					document.body.removeChild(imposterDiv);   //清除伪装者
					if(isHitElement){   //如果抬起的地方碰撞到待碰撞检测item了,修改数据,重新渲染页面
						var fileId=isHitElement.dataset.id;
						moveItem(selectArr,fileId);
					}
					document.onmousemove=null;
					document.onmouseup=null;
				}
				
				
				
			}else{   //如果点在了item区域但是它没有选中，或者直接点在了files区域，执行圈选
				div=document.createElement("div");
				div.id="drag";
				document.body.appendChild(div);
				var num=0;
				document.onmousemove=function(e){
					var newX=e.clientX<filesL?filesL:e.clientX;    //   如果小于files的最左面是，则等于最左面
					newX=e.clientX>filesR?filesR:newX;    //如果大于最右面，等于最右面
					var newY=e.clientY<filesT?filesT:e.clientY;   //如果小于files的top则等于top
					newY=e.clientY>filesB?filesB:newY;   //如果大于files的最下面则等于最下面
					if(Math.abs(newX-lastX)<15&&Math.abs(newY-lastY)<15&&num==0){     //如果x、y轴的距离分别都小于50，并且num=0（初次点击生效，防止点击拖拽经过原点时代码不执行方块卡住），不继续执行
						return;
					}
					num++;      //一旦div成功出现过一次并且没有抬起鼠标，改变num不等于0，下次移动就不进行上面的判断了，防止拖框卡住。直到鼠标抬起然后下次符合条件的鼠标按下重置num=0
					div.style.width=Math.abs(newX-lastX)+"px";
					div.style.height=Math.abs(newY-lastY)+"px";
					div.style.left=Math.min(newX,lastX)+"px";
					div.style.top=Math.min(newY,lastY)+"px";
					//遍历item，每一个都做碰撞检测，如果碰撞则勾选，否则不勾选
					arrItems.forEach(function(value){
						pengzhuang(div,value)
						if( pengzhuang(div,value)){//碰上了
							select_item(value,1);
						}else{    //没碰上
							select_item(value,0);
						}
					})
					ifEveryChecked();
					return false;       //阻止默认拖拽事件
				}
				document.onmouseup=function(){
					document.onmousemove=null;
					document.body.removeChild(div);
					document.onmouseup=null;    //清掉自己
				}
			}
		}
		return false;     //阻止默认行为
	}
	files.onclick=function(e){
		var target=e.target;
		if(target.className=="check"){     //如果点击了check，跳出
			return;
		}
		if(parent(target,".file_item")){    //如果点在item内部
			var target=parent(target,".file_item");    //将target变为item
			drow(datas,target.dataset.id);   //找到item父级身上的id，根据id重绘三区
			nowId=target.dataset.id;
			var parentUl=parent(positionSpanById(treeSpans,target.dataset.id),"ul");   //id的父级ul
			parentUl.style.display="block";  //打开父级ul
			parentUl.previousElementSibling.firstChild.dataset.onoff=true;   //点击id的父级id span上的小图标打开
			parentUl.previousElementSibling.firstChild.style.background="url(img/ico.png) -350px -17px";
			var pId=parentUl.previousElementSibling.dataset.id;    //点击id的父级id，在数据中记录打开
			ifTree_onoffById(datas,handle.getSelfById(datas,target.dataset.id).pid,"true");   //修改数据为true
		}
	}
	//4、bar工具条区的点击事件
	function dropTip(class1,txt){      //上弹框   class是想要什么样式(字符串)，txt是文本内容（字符串）  
		tip.style.transition=0+"s";       //立刻拉到最上面
		tip.style.top=-40+"px";
		setTimeout(function(){           //此处重点！涉及到js多线程，如果不用settimeout包起来，四条属性相当于一次性加上去了，后面的就会覆盖前面的（而不是依次加上去的效果），这是单线程；而包起来之后就开了多线程，包住的内容会等待主线程执行完之后再执行，这样就相当于分两次加上去的，会依次显示效果
			tip.className=class1;                //改样式
			tip.style.transition=0.3+"s";          //慢慢拉下来
			tip.style.top=0+"px"; 
		},0)
		tip.getElementsByTagName("span")[0].innerHTML=txt;
		clearTimeout(tip.timer);        //清除上一次的定时器
		tip.timer=setTimeout(function(){
			tip.style.top=-40+"px";
		},2000)
	}
		//新建文件夹
	var creatnew=document.getElementById("creatnew");
	creatnew.onclick=function(){ 
		var newItem=document.createElement("div");
		newItem.className="file_item";
		newItem.innerHTML=`<a href="javascript:;" class="check"></a>
							<i class="ico" style="background:url(img/ico.png) -73px -135px;"></i>
							<input type="text" class="name_inp" />`;
		files.insertBefore(newItem,files.firstElementChild);    //如果没有第二个参数(null),insertBefore自动变成appendChild
		var inp=newItem.getElementsByClassName("name_inp")[0];
		inp.focus();   //自动获得焦点
		inp.onmousedown=function(e){      //阻止冒泡   ,防止用户点击inp区域时进入下一级
			e.cancelBubble=true;
		}
		inp.onclick=function(e){
			e.cancelBubble=true;
		}
		document.onkeydown=function(e){    //回车时移动焦点到body身上,触发inp失去焦点事件
			if(e.keyCode==13){
				logo_bg.focus();    
			}
		}
		inp.onblur=function(){         //失去焦点时触发,我的写法只给假体的inp加onblur,所以其他对真体的onblur操作不会触发这个
			var txt=inp.value;
			txt=txt.trim();
			var names=files.getElementsByClassName("name");
			var bl=false;                 //布尔值 记录是否重复命名   没有重复命名为false
			for (var i = 0; i < names.length; i++) {    //遍历当前页面所有的名字,如果没有重命名,bl为false
				if(names[i].innerHTML==txt){
					bl=true;
				}
			}
			if(txt==""){     //如果没有起名字,新建文件夹失败,清除newItem,弹框新建失败
				files.removeChild(newItem);
				dropTip("wrong","新建文件夹失败");
			}else if(bl){          //如果重复命名,新建失败,清除newItem
				files.removeChild(newItem);
				dropTip("wrong","名字不能重复");
			}else{       //新建文件夹成功,改变数据,记录当前id,前期操作已经在数据中记录当前树开闭合状态,只需根据id重绘三区.
				dropTip("ok","新建文件夹成功");
				var newId=findMaxId(datas)+1;  //新id为当前数据中的最大id+1
				datas.unshift({       //向数据中添加新数据
					id:newId,
					pid:nowId,    //nowId是当前三大区id
					title:txt,
					type:"file",
					tree_onoff:"false"
				})
				tree.innerHTML=createTreeHtml(datas,-1,1);     //重画树
				drow(datas,nowId);    //重绘三区
			}
		}
	}
		//删除
	var delete1=document.getElementById("delete1");
	delete1.addEventListener("click",function(){
		//点击删除，没有选择文件和选择文件两种情况
		var selectArr = whoSelect();   //所有选中item的数组
		if( selectArr.length ){  //如果有选中的item
			//使用弹框
			new Dialog({       //执行弹框函数,传入一个对象作为参数.
				title:"删除文件",
				content:"<div style='padding: 10px;'>确定要删除这个文件夹吗？已删除的文件可以在回收站找到</div>",
				okFn:function (){   //点击确定时执行的函数,根据执行结果返回一个布尔值,决定是否从页面中清掉弹框,本项目不写返回值,返回undefined,布尔值为false,判断为点击确定就清掉弹框
					var arr=[];     //用来存所有待删除数据的id
					for (var i = 0; i < file_items.length; i++) {   //遍历当前所有item
						if(file_items[i].classList.contains("hover")){    //如果这个item是加了hover的,获取它的id以及它所有子级的id,压入arr
							var id=file_items[i].dataset.id;
							arr=arr.concat(handle.getChildsAllById(datas,id));  //找到子级下的所有子级
						}
					}
			//		console.log(arr)       //此时arr里存着需要删除的数据的id
					handle.deletChildsAll(datas,arr);     //从数据中删除
					tree.innerHTML=createTreeHtml(datas,-1,1);     //重画树
					drow(datas,nowId);    //重绘三区
					dropTip("ok","删除成功");
				}
			});
		}else{  //如果没有选中的item
			dropTip("wrong","请选择一个要删除的文件")
		}
	})
	
		//重命名
	var re_obj={
		item:null,     //item就是要重命名的那个item元素
		name:null,     //存放名字的div元素
		name_inp:null,  //输入框input元素
		txt: null,       //原先的名字(已去掉前后空格),字符串
	};   //用来保存重命名状态时的小全局变量(rename点击函数和document在重命名状态下的按下函数都需要调用),"小全局变量可以避免全局污染,还可以将重命名相关的属性/方法放在一起"
	
	rename.addEventListener("click",function(){
		var arr=whoSelect();     //当前选中的item的数组
		if(arr.length==0){   //如果当前没有选中的item
			dropTip("wrong","请选择一个文件");
		}else if(arr.length>1){   //如果选择了多个
			dropTip("wrong","不能选择多个文件");
		}else{     //只选择了一个文件,正确,开始执行重命名,此时arr里面就存着这一个item
			var item = re_obj.item = arr[0];   //item就是要重命名的那个item,成功进行重命名时声明变量时也将变量存入re_obj小全局变量对象中
			var name=re_obj.name=item.getElementsByClassName("name")[0];  //名字div
			var name_inp=re_obj.name_inp=item.getElementsByClassName("name_inp")[0];  //名字输入框input元素
			var txt=re_obj.txt=name.innerHTML.trim();   //去掉前后空格
			name.style.display="none";
			name_inp.style.display="block";
			name_inp.value=txt;      //让输入框的默认内容为原先的名字,正因为有这行,所以之后不需要清空input内容
			name_inp.onmousedown=function(e){    //阻止冒泡,用户在真个document区域只有点击input可以不结束重命名状态
				e.cancelBubble=true;
			}
			name_inp.onclick=function(e){    //阻止冒泡,用户在真个document区域只有点击input可以不结束重命名状态
				e.cancelBubble=true;
			}
			name_inp.select();   //选中状态
			rename.isRename=true;    //在重命名按键上标记正在重命名状态
		}
	})
	document.addEventListener("mousedown",function(){    //给document添加重命名状态下的按下事件,此时按下任意地方都要判断重命名是否成功,并执行相应操作
		if( !rename.isRename ){    //如果不是在重命名状态,跳出
			return;
		}
		//重名
		/*
			判断input的值是否为空
			不为空：
				是否命名冲突
					冲突：
						提醒命名不成功，还原以前名字
					不冲突：
						提醒命名成功，改为更改后的名字
						找到数据，改title，重新渲染树形菜单

			为空：
				还原以前名字
		*/
		
		var value = re_obj.name_inp.value.trim();   //输入框的value值(新起的名字,去掉前后空格)
		if( value ){    //如果去掉前后空格后名字依然存在
			var isExist = isTitleExist(datas,value,nowId);   //判断新起的名字是否存在于当前三区id下(当前页面上),返回一个布尔值
			//名字存在
			if(value === re_obj.txt){   //如果新名字和旧名字一样,什么也不做,等待最后关闭
			}else if(isExist){    //如果新名字和老名字不相同,且冲突
				dropTip("wrong","命名冲突，请重新命名");
				re_obj.name_inp.select();
				return;
			}else{   //成功命名
				dropTip("ok","命名成功");
				re_obj.name.innerHTML= value;   //名字div的innerHtml改为新名字
				//通过id找到对应的数据,修改数据
				var self = handle.getSelfById(datas,re_obj.item.dataset.id);  //self是那条数据
				self.title = value;     //修改数据
				tree.innerHTML=createTreeHtml(datas,-1,1);     //根据修改后的数据画树
			}
		}
		//文件区不重新渲染,只修改dom
		re_obj.name_inp.style.display = "none";   //关闭输入框，打开原名字
		re_obj.name.style.display = "block";
		select_item(re_obj.item,0)   //清除选中重命名的选中状态
		rename.isRename=false;
	})
		//移动到
	function moveItem(selectArr,fileId){  //将selectArr(一个数组)里面的item元素(包括数据修改和重新渲染页面)移动到fileId(一个id,字符串)这个id的文件下
		var childs=handle.getChildsById(datas,fileId);   //根据isHitElement的id,找到他所有的子级数据,返回一个数组
		var arr=Array.from(childs);   //变成一个数组
		arr=arr.map(function(item){     //将数组中的每一项变成每一项的名字,字符串
			return item.title;
		})
		var bl=true;    //记录下面for循环执行完之后,是否所有都成功移动了,只要有一条没有成功移动,上弹框警告,否则上弹框成功
		for (var i = 0; i < selectArr.length; i++) {    //遍历选中的item
			if(arr.indexOf(selectArr[i].getElementsByClassName("name")[0].innerHTML)==-1){    //如果这个item的名字不存在于isHitElement的id的下一级,移动成功,修改pid,删除节点
				handle.getSelfById(datas,selectArr[i].dataset.id).pid=fileId;   //根据item的id找到数组中的这条数据,将他的pid改为fileId
				files.removeChild(selectArr[i]);    //改完pid之后,从结构中删掉item,不重绘files区
				//这里只是从结构中删除了节点,并没有从selectArr数组中删除数据,所以不需要做i--;
			}else{         //存在名字重复情况,改变bl
				bl=false;
			}
		}
		//上弹框出现
		if(bl){   //如果都成功移动了,弹成功框,否则失败框
			dropTip("ok","移动成功");
		}else{
			dropTip("wrong","部分文件移动失败，重名了");
		}
		tree.innerHTML=createTreeHtml(datas,-1,1); //重新画树
	}
	var move=document.getElementById("move");
	move.addEventListener("click",function(){
		var selectArr=whoSelect();   //一个数组,里面存着所有被选中的item元素
		if(selectArr.length){    //如果至少选择了一个,正常执行移动到,如果没有选中item,弹框报错
			//预处理数据
			var selectIdArr=[];      //用来存所有选中的item以及其所有子级的id
			var moveStart=false;     //是否可以点击确定,false为不可以点击确定关闭弹框
			for (var i = 0; i < selectArr.length; i++) {    //拼上每一个item子级及其子级的id
				var idds=handle.getChildsAllById(datas,selectArr[i].dataset.id);
				selectIdArr=selectIdArr.concat(idds);  

			}
//			console.log(selectIdArr);//这一步的时候selectIdArr里面存着所有item及其所有子级的id
			
			//生成弹框+遮罩
			new Dialog({   
				title:"移动到",
				content:'<div class="tree" id="tree_menu">'+ createTreeHtml(datas,-1,1)+'</div>',
				okFn:function(){     //点击确定之前做的事,它的返回值决定能否点击确定关闭弹框
					if(moveStart){    //如果可以点击确定,移动数据,重新渲染界面
						moveItem(selectArr,fileId);
					}else{
						return true;    //返回true,不能关闭弹框
					}
				}
			});
			
			//给弹框树添加事件
			
			var tree_menu=document.getElementById("tree_menu");
			var selectedSpan=tree_menu.getElementsByClassName("tree_span")[0];     //用来存当前选中的树span,默认值是第一个,面向对象的写法写点击清空上一个! 每次点击只需要将它的样式清空,然后重新赋值为当前元素,然后再给他添加样式
			var fileId=0;   //记录当前选中的id,默认是0;
			selectedSpan.style.background="#e1e8ed";  //给第一个添加默认点击颜色
			tree_menu.addEventListener("click",function(e){     //给弹框树添加点击事件
				var target=e.target;
				if(target.className=="ico1"){
					openUl(target.parentNode);
				}else if(target = parent(target,".tree_span")){   //如果不在ico1的span区域上点击了,给这个span加点击样式
					var info=document.getElementsByClassName("full-pop")[0].getElementsByClassName("error")[0];   //弹框底部的报错栏
					selectedSpan.style.background="";    //清空上一个
					selectedSpan=target;              //赋值为当前点击的这个span
					selectedSpan.style.background="#e1e8ed";   //给当前这个span添加点击颜色
					fileId=target.dataset.id;     //记录当前span的id
					//判断能否放到这个span下面
					if(selectIdArr.indexOf(Number(target.dataset.id))!=-1){    //如果点击的这个span是选中的或者选中的子级,报错,否则清空报错
						info.innerHTML="不能移动到自身及其子文件下";
						moveStart=false; //记录不可以点击确定关闭弹窗
					}else if(target.dataset.id==nowId){    //如果点击的span的id等于当前三大区id,弹出该文件下已经存在
						info.innerHTML="该文件下已经存在";
						moveStart=false; //记录不可以点击确定关闭弹窗
					}else{
						info.innerHTML="";
						moveStart=true;   //记录可以点击确定关闭弹窗
					}
				}
			})
			tree_menu.addEventListener("dblclick",function(e){     //给弹框树添加双事件
				var target=e.target;
				if(target.className=="ico2"){   //如果双击了ico2
					openUl(target.parentNode);
				}
				if(target.className=="tree_span"){    //如果双击了树span
					openUl(target);
				}
			})
		}else{
			dropTip("wrong","请选择一个文件");
		}
	})
})()





var left_ul=document.getElementById("left_ul");   //左侧ul
var content =document.getElementById("content");
var num1=2;    //控制list页面显示几条信息
//封装函数
function creat(){    //重绘左面和图片
	if(window.location.search==""){          //如果是第一次加载没有search，给一个初始search
		window.location.search=aData.list[0].lx;
	}
	for (var i = 0; i < aData.list.length; i++) {  //生成左侧li
		var li=document.createElement("li");
		var a=document.createElement("a");
		a.href="javascript:;";
		a.innerHTML=aData.list[i].text;
		li.appendChild(a);
		left_ul.appendChild(li);
		li.lx=aData.list[i].lx;    //给每个li添加search属性
		if(li.lx==window.location.search.substr(1)){   //如果这个li是search里的，给他加选中状态
			li.className="focus";
		}
		li.onclick=function(){
			window.open("list.html?"+this.lx,"_self");
		}
	}	
	//重绘图片
	var tit_img=document.getElementById("tit_img");
	tit_img.src=aData[window.location.search.slice(1)].img;    //图片地址变为这个键值下的img
}
function creatContent1(){            //重绘第一页内容区
	 //重绘页数
	var page1=document.getElementById("page1");
	var pages_length=Math.ceil((aData[window.location.search.slice(1)].text.length)/num1); //根据search获取当前一共有多少条页
	var spans=page1.getElementsByTagName("span");
	for (var i = 0; i < pages_length; i++) {
		var span=document.createElement("span");
		span.index=i;    //第几页
		var a=document.createElement("a");
		a.href="javascript:;";
		a.innerHTML=i+1;
		if(i==0)span.className="focus";    //页面初始化时在第一页
		span.appendChild(a);
		page1.appendChild(span);
		span.onclick=function(){
			pageNum=this.index;
			for (var i = 0; i < spans.length; i++) {   //先清掉所有的
				spans[i].className="";
			}
			this.className="focus";
			creatInfo(this.index);    //点击span时重绘内容,将点击的页数传入 0~
		}
	}	
	//重绘上一页下一页按钮
	var prev1=document.getElementById("prev1");
	var next1=document.getElementById("next1");
	var pageNum=0;    //记录当前在第几页
	prev1.onclick=function(){    //上一页
		if(pageNum==0)return;    //向左停在第一页
		pageNum--;
		for (var i = 0; i < spans.length; i++) {   //先清掉所有的
			spans[i].className="";
		}
		spans[pageNum].className="focus";
		creatInfo(pageNum);    //点击span时重绘内容,将点击的页数传入 0~
	}
	next1.onclick=function(){     //下一页
		if(pageNum==pages_length-1)return;    //向右停在最后页
		pageNum++;
		for (var i = 0; i < spans.length; i++) {   //先清掉所有的
			spans[i].className="";
		}
		spans[pageNum].className="focus";
		creatInfo(pageNum);    //点击span时重绘内容,将点击的页数传入 0~
	}
	//初始化内容区域
	creatInfo();
}
function creatInfo(pa){     //根据点击的页数page重绘info内容区
	var page=pa||0;   //初始未点击状态给一个默认值0（第一页）；
	content.innerHTML="";   //清空content
	for (var i = 0; i < num1; i++) {   //num1设置为几就生成几条信息
		var num=num1*(page)+i;    //取aData第几条数据 0~
		if(num>aData[window.location.search.substr(1)].text.length-1){ //如果要取得数据超过最后一条数据，跳出循环
			break;
		}
		//p .zp
		var p1=document.createElement("p");      //上面那个p标签
		p1.className="zp";
		
		var span1=document.createElement("span");     //职位需求
		var a1=document.createElement("a");
		a1.num=num;        //a1自定义属性，存自己是data中的第几条
		a1.onclick=function(){
			window.location.hash=this.num;
		}
		a1.href="javascript:;";
		a1.innerHTML="★ 职位需求："+aData[window.location.search.substr(1)].text[num].zw;
		span1.appendChild(a1);
		p1.appendChild(span1);
		
		var span2=document.createElement("span"); //需求人数
		span2.innerHTML="需求人数："+aData[window.location.search.substr(1)].text[num].rs+"名";
		p1.appendChild(span2);
		
		var span3=document.createElement("span");    //日期
		span3.className="date";
		span3.innerHTML=aData[window.location.search.substr(1)].text[num].sj.join("-");
		p1.appendChild(span3);
		
		//p .yq
		var p2=document.createElement("p");
		p2.className="yq";
		p2.innerHTML=aData[window.location.search.substr(1)].text[num].info[0].l.join("").slice(0,100)+"...[<a href='javascript:;'>查看详情</a>]";
		
		
		content.appendChild(p1);
		content.appendChild(p2);
		p2.getElementsByTagName("a")[0].num=num;
		p2.getElementsByTagName("a")[0].onclick=function(){
			window.location.hash=this.num;
		}
	}
}
function creatContent2(){      //重绘第二页内容区    innerHTML方法,
	var temp=aData[window.location.search.slice(1)].text[window.location.hash.slice(1)];   //哪一个search下的哪一个哈希，对象
	content.innerHTML='<h2>'+temp.zw+'</h2><div><span class="l">招聘公司：'+temp.gs+'查看公司地理位置>></span><span>公司性质：'+temp.xz+'</span><span class="l">职位性质：'+temp.gz+'</span><span>工作地点：'+temp.dd+'</span><span class="l">工作经验：'+temp.jy+'</span><span>学历要求：'+temp.xl+'</span><span class="l">招聘人数：'+temp.rs+'人</span><span>薪资待遇：'+temp.dy+'</span><span class="l">发布日期：'+temp.sj.join("")+'</span><span>招聘类型：'+temp.lx+'</span></div><div class="clear"></div><dl><dt>'+temp.info[1].t+'</dt><dd>'+temp.info[1].l[0]+'</dd></dl><dl><dt>'+temp.info[0].t+'</dt><dd>'+temp.info[0].l[0]+'</dd><dd>'+temp.info[0].l[1]+'</dd><dd>'+temp.info[0].l[2]+'</dd><dd>'+temp.info[0].l[3]+'</dd><dd>'+temp.info[0].l[4]+'</dd><dd>'+temp.info[0].l[5]+'</dd></dl><p>有意者请投递简历至 liuyajuan@fulan.com.cn</p> ';
}

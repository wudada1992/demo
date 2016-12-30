var has =window.location.hash.substr(1);

if( has == "" ){
	has = "2-14";
}
var str = aData[has]["hd"];//主标题
var str2 = aData[has]["nr"];//内容

var box = document.getElementById("box");
var oData = document.getElementById("Data");
var oNum = document.getElementById("oNum");
var oDay = document.getElementById("Day");
var imgbox = document.getElementById("imgbox");
var imgb = document.getElementById("imgb");
var imgs = imgb.getElementsByTagName("img");
var back = document.getElementById("back");
var eng = document.getElementById("eng");

var now = 0;
var next = now + 1;
var next2 = now + 2;
var next3 = now + 3;

var opa = 0;//左下角数字部分的初始透明度
var DayOpa1 = 0;//详细日期部分的初始透明度
var Dayif = true;//判断详细日期部分透明度循环
var DayOpa2 = 0.9;//详细日期部分最终循环的透明度

//时间设定
var num = -1;//主标题部分是否结束
var int2 = 40 * str.length+200;//主要内容部分定时器的时间
var int3 = int2 + 1000;//左下角数字部分定时器
var int4 = int3 + 700;//英文日期部分定时器
var int5 = int4 + 500;//轮播图部分定时器
var int6 = int5 + 500;//详细时间信息部分定时器
var int7 = int6 + 500;//back按钮定时器

document.onmousedown = function(){
	return false;
}
//运动函数
function move (obj,object1,duration,fn) {
	var startTime = new Date();  	
	
	var d = duration;//总持续时间
	
	var j = {};//从来存储处理之后的对应的属性的初始值(b)和总运动路程(c)
	for( var a in object1){
		j[a] = {};
		j[a].b = parseFloat(getComputedStyle(obj)[a]);
		j[a].c = object1[a] - j[a].b;
	}
	obj.timer = setInterval(function(){
		var t = new Date() - startTime;//已过时间 = 当前实时时间 - 点击时的初始时间
		if(t>=d){//当时间超过总持续时间的时候
			t = d;
		}
		for(var a in j){
			var c = j[a].c;
			var b = j[a].b;
			var v = (c/d)*t+b;
			if(a == "opacity"){
				obj.style[a] = v ;
			}else{
				obj.style[a] = v + "px";
			}
		}
		if(t==d){
			clearInterval(obj.timer);//清除定时器，清除的是定时器下一次的运行
			fn&&fn();//执行回调函数
		}
	},1)
}
//主标题部分
var timer1 = setInterval(function(){
	num++;
	var spans = document.createElement("span");
	spans.innerHTML = str.charAt(num);
	
	box.appendChild(spans);
	setTimeout(function(){
		if(spans.previousElementSibling){
			spans.style.left = spans.previousElementSibling.getBoundingClientRect().right - box.getBoundingClientRect().left + 1 + "px";
		}else{
			spans.style.left = "0px";
		}
		spans.style.opacity = 1;
		spans.style.top ="0px";
	},100);
	if(num > str.length-2){
		clearInterval( timer1 );
	}
},40)
////内容部分
setTimeout(function(){
	oData.innerHTML = str2;
	move(oData,{"top":595,"opacity":1},500);
},int2);
//左下角数字
setTimeout(function(){
	var opaTimer = setInterval(function(){
		oNum.innerHTML = has.substr(0,has.indexOf("-"));
		opa += 0.1;
		oNum.style.opacity = opa;
		if(opa >= 1){
			clearInterval(opaTimer);
		}
	},50)
},int3)
//详细日期
setTimeout(function(){
	var daydis = setInterval(function(){
		DayOpa1 += 0.1;
		oDay.style.opacity = DayOpa1;
		if(DayOpa1 >= 1){
			clearInterval( daydis );
			setInterval(function(){
				if(Dayif && DayOpa2<1){
					DayOpa2 += 0.01;
					if(DayOpa2 >= 1){
						Dayif = false;
					}
				}
				if(Dayif == false){
					setTimeout(function(){
						DayOpa2 -= 0.01;
						if(DayOpa2 <= 0.82){
							Dayif = true;
						}
					},500);
				}
				oDay.style.opacity = DayOpa2;
			},40);
		}
	},30);
},int6)
 


//轮播区域
imgs[0].src = aData[has]["tp"][now];
imgs[1].src = aData[has]["tp"][next];
imgs[2].src = aData[has]["tp"][next2];
imgs[3].src = aData[has]["tp"][next3];

setTimeout(function(){
	move(imgbox,{"right":200,"opacity":1},800,function(){});
	setInterval(function(){
		
		now %= aData[has]["tp"].length;
		next %= aData[has]["tp"].length;
		next2 %= aData[has]["tp"].length;
		next3 %= aData[has]["tp"].length;
		imgs[2].src = aData[has]["tp"][next2];
		imgs[3].src = aData[has]["tp"][next3];
		move(imgb,{"left":-600},500,function(){
			imgb.style.left = 0;//拉回来
			imgs[0].src = aData[has]["tp"][next2];//改img1src成为下一张;
			imgs[1].src = aData[has]["tp"][next3];
			now +=2;
			next +=2;
			next2 +=2;
			next3 +=2;
			
		})
	},3000);
},int5)
//英文月份
var Month = has.substr(0,has.indexOf("-"));
if(Month == 1){
	eng.innerHTML = "January";
}
if(Month == 2){
	eng.innerHTML = "February";
}
if(Month == 3){
	eng.innerHTML = "March";
}
if(Month ==4){
	eng.innerHTML = "April";
}
if(Month ==5){
	eng.innerHTML = "May";
}
if(Month == 6){
	eng.innerHTML = "June";
}
if(Month == 7){
	eng.innerHTML = "July";
}
if(Month == 8){
	eng.innerHTML = "August";
}
if(Month == 9){
	eng.innerHTML = "September";
}
if(Month == 10){
	eng.innerHTML = "October";
}
if(Month == 11){
	eng.innerHTML = "November";
}
if(Month == 12){
	eng.innerHTML = "December";
}
setTimeout(function(){
	move(eng,{"bottom":46},300);
},int4);
//轮播图左侧时间信息
function TimeDate(){
	
	var Day = document.getElementById("Day");
	var spans = Day.getElementsByTagName("span");
	var Moth = has.substr(0,has.indexOf("-"));
	var Date = has.substr(has.indexOf("-")+1,has.length);
	var T2 = new window.Date();
	T2.setFullYear(2017);
	T2.setMonth(Moth-1);
	T2.setDate(Date);
	var oDay = T2.getDay();
	var oDay2;
	switch(oDay){
		case 0:
			oDay2 = "日";
			break;
		case 1:
			oDay2 = "一";
			break;
		case 2:
			oDay2 = "二";
			break;
		case 3:
			oDay2 = "三";
			break;
		case 4:
			oDay2 = "四";
			break;
		case 5:
			oDay2 = "五";
			break;
		case 6:
			oDay2 = "六";
			break;
	}
	  
	spans[0].innerHTML = Date;
	spans[1].innerHTML = Moth + "月" + Date +"日&nbsp星期" + oDay2;
};
TimeDate();
//back按钮
setTimeout(function(){
	move(back,{"right":134},500);
},int7)
back.onclick = function(){
	
	setTimeout(function(){
		move(Day,{"top":-300},200);
		
		move(oNum,{"left":-700},200);
	},400)
	setTimeout(function(){
		move(Data,{"top":700,"opacity":0},400);
		move(box,{"top":-300,"opacity":0},600);
	},800);
	setTimeout(function(){
		move(eng,{"bottom":-300},500);
		move(imgbox,{"right":-2000},500);
		
	},1200);
	setTimeout(function(){
		move(back,{"right":60,"bottom":0},200,function(){
			setTimeout(function(){
				move(back,{"left":2000,"bottom":200},200);
			},1)
		});
	},1500)
	setTimeout(function(){
		window.open("index.html#"+has,"_self");
	},1700)
//window.open("跳转.html#"+has,"_self");

}
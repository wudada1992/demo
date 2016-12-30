//生成模板（生成页面/渲染数据）
//1、渲染树菜单
//生成树形菜单的结构，返回html
function createTreeHtml(data,id,n){   //初次id=-1,1
	//找到指定id的子元素
	var childs = handle.getChildsById(data,id);
	if(childs.length==0){     //如果没有子级,返回空字符串
		html="";
		return html;
	}
	
	var html = '';   //画树的时候就做判断，根据数据中的tree_span值决定子级ul是打开还是关闭，如果有子级且要打开子级ul，则传入第三个参数1,否则传0
	if(n==1){   //打开此ul
		html+=`<ul style="display:block" ${1}>`;
	}else if(n==0){
		html+=`<ul style="display:none" ${0}>`;
	}
		childs.forEach(function (value){
			//根据数据的id找到所有的父级
			var parentsLength = handle.getParentsAllById(data,value.id).length;
			html += '<li><span class="tree_span" data-id="'+value.id+'" style="padding-left:'+parentsLength*20+'px;">';
			if(handle.getChildsById(data,value.id).length==0){   //如果它是没有子级的，第一个图标不显示背景图，否则都显示
				html+='<i class="ico1" style="visibility:hidden;"></i>';
			}else{
				if(ifTree_onoffById(data,value.id)=="true"){   //打开状态
					html+='<i class="ico1" data-onoff="true" style="background:url(img/ico.png) -350px -17px;"></i>';    //ico1身上带开关，显示ul是否开启，默认false是关闭装太
				}else{ //关闭状态
					html+='<i class="ico1" data-onoff="false"></i>';    //ico1身上带开关，显示ul是否开启，默认false是关闭装太
				}
			}
			html+='<i class="ico2"></i>'+value.title+'</span>';
			//递归找value的子数据
			if(ifTree_onoffById(data,value.id)=="true"){    //如果这个id身上是ture，传入第三个参数1画子级ul
				html += createTreeHtml(data,value.id,1);
			}else{    //否则传第三个参数0
				html += createTreeHtml(data,value.id,0);
			}
			html += '</li>';	
		})
		html += '</ul>';
	return html;
}
//2. 渲染导航
//生成指定id的导航的html结构，返回html
function createNavHtml(data,id){
	//找到指定id的所有的父级
	//指定一个id，找到这个id对应的数据的所有的父数据
	var parents = handle.getParentsAllById(data,id).reverse();
	var html = '<a href="javascript:;" class="check" id="allCheck" data-onoff="false"></a>';

	parents.forEach(function (value){
		if(value.id==id){   //最后一个不用加ico右箭头,颜色为蓝色
			html += '<span style="color:#55addc;border-bottom: 2px solid #55addc;" data-id="'+value.id+'">'+value.title+'</span>';
		}else{
			html += '<span data-id="'+value.id+'">'+value.title+'</span><i class="ico"></i>';	//data-id存的是数据的id
		}
	})
	return html;
}

//3. 渲染文件区域
//渲染指定id下的所有的子数据  返回html
function createFilesHtml(data,id){
	var childs = handle.getChildsById(data,id);
	var filesHtml = '';
	if(childs.length==0){  //file_bg位置初始化
		var wrapH=window.innerHeight-head.offsetHeight-bar.offsetHeight;   //响应式大区高度
		var filesH=wrapH-bread.offsetHeight-40;     //文件区高度
		var filesW=files.clientWidth;               //文件区宽度
		var file_bgT=((filesH-210)/2)<20?20:((filesH-210)/2);     //背景区top
		var file_bgL=(filesW-200)/2      //背景区left
		filesHtml='<div style="top:'+file_bgT+'px; left:'+file_bgL+'px;" class="file_bg" >您还没有上传过文件哦~</div>';
	}else{
		childs.forEach(function (value){
			filesHtml += '<div class="file_item" data-id="'+value.id+'"><a href="javascript:;" class="check" data-onoff="false"></a><i class="ico" style="background:';
			if(value.type){
				if(value.type=="file"){    //文档
					filesHtml+="url(img/ico.png) -73px -135px";
				}else if(value.type=="text"){   //text
					filesHtml+="url(img/ico.png) -181px -135px";
				}else if(value.type=="zip"){      //压缩文件
					filesHtml+="url(img/ico.png) -290px -135px";
				}
			}else{
				filesHtml+="url(img/ico.png) -73px -135px";
			}
			filesHtml+=';"></i><div class="name">'+value.title+'</div><input type="text" class="name_inp" style="display:none;"/></div>';
		});
	}
	return filesHtml;
}
function parent(element,attr){    //判断指定元素及其父级是否有attr，如果有返回这个元素
	//先找到attr的第一个字符
	var firstChar = attr.charAt(0);
	if( firstChar === "." ){
		while(element.nodeType !== 9 && !element.classList.contains(attr.slice(1))){
			//element没有指定的class，那么element就为父级，继续向上找
			element = element.parentNode;
		}
	}else if(firstChar === "#"){
		while(element.nodeType !== 9 && element.id !== attr.slice(1)){
			//element没有指定的class，那么element就为父级，继续向上找
			element = element.parentNode;
		}
	}else{
		while(element.nodeType !== 9 && element.nodeName !== attr.toUpperCase()){
			//element没有指定的class，那么element就为父级，继续向上找
			element = element.parentNode;
		}
	}

	return element.nodeType === 9 ? null : element;

}

function ifTree_onoffById(data,id,set1){   //根据id返回数据中对象属性tree_onoff，返回值是字符串true或false，如果有第三个参数，则修改数据将值设置成第三个参数，此时没有返回值
	for (var i = 0; i < data.length; i++) {    //遍历数组，将数据中这一条的tree_onoff关闭false
		if(data[i].id==id){
			if(set1){     //如果第三个参数存在,只修改值
				data[i].tree_onoff=set1;
			}else{    //如果没传第三个参数，则返回data[i].tree_onoff
				return data[i].tree_onoff;
			}
		}
	}
}
function select_item(obj,n){     //是否选中item，obj是要选中的item，n为1代表选中，n为0取消选中
	if(n==1){      //选中
		obj.classList.add("hover");
		obj.getElementsByClassName("check")[0].dataset.onoff=true;   //打开check开关
	}else{
		obj.classList.remove("hover");
		obj.getElementsByClassName("check")[0].dataset.onoff=false;
	}
}
function findMaxId(data){              //找数据中的最大id值,返回值是这个最大id,数字类型
	var maxId=0;
	data.forEach(function(value){
		if(value.id>maxId){     //如果这一项的id大于最大id
			maxId=value.id;
		}
	})
	return Number(maxId);
}
function whoSelect(){                //返回一个数组,里面存着所有选中的item元素
	//var arr = [];
	//找所有的checkboxs的class为checked
	var checkboxs=files.getElementsByClassName("check");
	return Array.from(checkboxs).filter(function (item){
		return item.dataset.onoff=="true"?true:false;        //找到所有选中的选框
	}).map(function (item){
		return parent(item,".file_item");     //返回选中选框的item父级存入arr中
	})
}
function pengzhuang(obj1,obj2){    //obj1 拖拽的元素   obj2 被碰撞的元素,碰撞检测 返回一个布尔值,true是两个元素碰撞了
	var obj1Rect = 	obj1.getBoundingClientRect();
	var obj2Rect = 	obj2.getBoundingClientRect();

	//如果obj1碰上了哦obj2返回true，否则放回false
	var obj1Left = obj1Rect.left;
	var obj1Right = obj1Rect.right;
	var obj1Top = obj1Rect.top;
	var obj1Bottom = obj1Rect.bottom;

	var obj2Left = obj2Rect.left;
	var obj2Right = obj2Rect.right;
	var obj2Top = obj2Rect.top;
	var obj2Bottom = obj2Rect.bottom;

	if( obj1Right < obj2Left || obj1Left > obj2Right || obj1Bottom < obj2Top || obj1Top > obj2Bottom ){
		return false;
	}else{
		return true;
	}
}
//在指定id的所有的子数据中，是否存在某一个title
// 存在 true
// 不存在 false
function isTitleExist(data,value,id){
	var childs = handle.getChildsById(data,id);  //先找到指定id的所有子级
	return childs.findIndex(function(item){
		return item.title === value;
	}) !== -1;
}
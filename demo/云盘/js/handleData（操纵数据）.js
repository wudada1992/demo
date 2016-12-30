//操作数据
//根据传入的id获取想要的数据
var handle = {
	//通过id找到对应的数据，返回的是一个对象
	getSelfById(data,id){     //ES6的独特写法
		return data.find(function (value){
			return value.id == id;
		})
	},
	//通过指定id找到子数据，返回的是一个数组
	getChildsById (data,id){
		return data.filter(function (value){
			return value.pid == id;
		})	
	},
	//找到指定id所有的父数据，包含自己，返回数组
	getParentsAllById (data,id){
		var arr = [];
		var self = 	handle.getSelfById(data,id);
		if( self ){
			arr.push(self);
			arr = arr.concat(handle.getParentsAllById(data,self.pid));
		}
		return arr;
	},
	//找到指定id所有的子数据（包括子级的所有子级），包含自己，返回数组,里面存着所有子级的id
	getChildsAllById (data,id) {
		var arr=[];
		var self = 	handle.getSelfById(data,id);
		arr.push(self.id);
		data.forEach(function(value){       //遍历数据，如果数据的pid等于id，将数据的id压入数组，将来根据id删除数据
			if(value.pid==id){
				arr=arr.concat(handle.getChildsAllById(data,value.id));
			}
		})
		return arr;
	},
	deletChildsAll(data,arr){      //传入一个数组，里面存着要删除数据的id，从数据中删除数组中所有id代表的数据。
		for (var i = 0; i < data.length; i++) {         //遍历数据每一项,如果这一项的id存在于arr中,删掉这一项
			if(arr.indexOf(data[i].id)!=-1){      //如果这一项的id在数组中
				data.splice(i,1);     //赋的是地址，操作的是同一个数组
				i--;
			}
		}
	}
}
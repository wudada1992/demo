# 坦克大战
------

## 简介

这仅仅是一个小游戏的雏形，我们还有很多东西可以添加，欢迎大家和我一起来完善它。

## 玩法操作

小键盘5 ： 向上

小键盘2  ： 向下

小键盘1  ： 向左

小键盘3  ： 向右

空格 ： 开火

## 更新日志

>2016-12-31

目前我们的游戏背景界面还是一片空白，而且只有一辆可以发射子弹的坦克，不过好在它的性能非常好！用户操纵坦克时的体验非常棒，这得益于我对它进行了一些细节优化，在后面我们还会提到。

## API

### 1、fire()

当此函数被调用时，会做下面几件事情：

a、根据当前坦克朝向，在页面相应位置生成一颗子弹，生成的同时开一个定时器让子弹向此时坦克面朝方向移动。

b、用transition的方式演示炮管后坐力，同时开一个延迟器在一段时间之后令炮管回弹。

c、开一个延迟器，子弹飞行一段时间之后从DOM中删除这个子弹。

```javascript
function fire(){      //生成子弹、发射子弹、炮管后坐力、清除子弹和定时器
  var bull=document.createElement("div");   //生成子弹
  bull.className="bull";
  document.body.appendChild(bull);
  if(face=="r"){
    bull.style.left=box.offsetLeft+150+"px";    //初始位置
    bull.style.top=box.offsetTop+45+"px";
    var timer1=setInterval(function(){        //开定时器
      bull.style.left=parseFloat(bull.style.left)+10+"px";
    },10);
  }
  if(face=="l"){
    bull.style.left=box.offsetLeft-50+"px";
    bull.style.top=box.offsetTop+45+"px";
    var timer1=setInterval(function(){
      bull.style.left=parseFloat(bull.style.left)-10+"px";
    },10);
  }
  if(face=="t"){
    bull.style.left=box.offsetLeft+55+"px";
    bull.style.top=box.offsetTop-50+"px";
    var timer1=setInterval(function(){
      bull.style.top=parseFloat(bull.style.top)-10+"px";
    },10);
  }
  if(face=="b"){
    bull.style.left=box.offsetLeft+55+"px";
    bull.style.top=box.offsetTop+150+"px";
    var timer1=setInterval(function(){
      bull.style.top=parseFloat(bull.style.top)+10+"px";
    },10);
  }
  pao.style.transition=0.05+"s";    //炮管后坐力
  pao.style.left=20+"px";
  setTimeout(function(){      //炮管回弹
    pao.style.transition=0.5+"s";
    pao.style.left=50+"px";
  },100);
  setTimeout(function(){        //一段时间之后删掉子弹，清掉定时器
    clearInterval(timer1);
    document.body.removeChild(bull);
  },2000);
}
```
      
### 2、全局变量face

a、用来标记坦克上一时刻的朝向，当坦克成功向一个方向移动时，立即修正此变量。

b、它还有一个作用是当坦克改变行进方向、通过transition演示转动过渡的时候，我们可以获知坦克是从哪个方向转向了哪个方向。这便于精准控制坦克应该从哪个方向开始转动，防止出现明明只需要转动90°而坦克却傻傻的转动了270°的情况。

c、它的另一个作用是刚刚开始游戏时，在坦克还没有进行移动时face有一个默认向右的值，此时坦克也是向右的，发射出的子弹也是向右飞行的。坦克发射的子弹的移动方向是根据这个face值进行判断的，而不是根据数组中的移动方向进行判断的。

d、它的值：

“l”:坦克向左

“r”:坦克向右

“t”:坦克向上

“b”:坦克向下

### 3、全局数组arr

用来记录当前哪些方向键是按下状态。

a、在方向键按下时，判断数组中是否有对应值。如果没有，push相应的值。

b、在方向键抬起时会从数组中删除对应值。

c、数组中方向键值的下标顺序就是用户按依次按下方向按键的顺序。这样做的好处是当用户抬起当前方向按键时，我们可以找到用户按下的上一个方向按键，命令坦克向这个方向前进！

### 4、全局开的定时器

在全局上有一个定时器，每隔很短的时间就会执行一次，它会做以下几件事情：

a、嗅探arr数组中最后一位（当前朝向），如果有，向这个方向移动。

b、当坦克一直朝一个方向移动时，arr数组中最后一位应当和face标记的朝向是一致的；一旦发现这两个值不相等，证明此时坦克转向了（由face方向转向了arr数组中最后一位的方向）；接下来根据不同的情况，选取合适的转向动画方案，然后将face值修改为arr最后一项所代表的方向。

### 5、document.onkeydown事件

按键之后，如果按下的是小键盘5、小键盘2、小键盘1、小键盘3这几个方向键，程序会做以下步骤：

a、判断后向数组中push当前朝向

b、相应的改变face

C、由全局一直开启的定时器嗅探当前朝向，并控制坦克移动

如果按下的是开火键（空格），程序会做以下步骤：

a、判断是否在合适的发射时间（开关+定时器控制，防止子弹过于密集），如果在，执行fire（）一系列开火操作

### 6、document.onkeyup事件

从arr数组中删除抬起键对应的值

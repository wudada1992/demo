let data={
	talent:{
		atk:{           //攻击力
			now:0,         //当前在第几个等级
			n:3,           //共有几个等级
			left: 50,
            top: 100,
            //灰色图片left、top
            l1:-4,
            t1:-4,
//          //彩色图片left、top
            l2:-4,
            t2:-60,
            //技能名字
            name:"蛮横之力",
            //后置技能代号
            next:"atkB",
            //技能描述
            dis:["攻击力+1","攻击力+4","攻击力+9"],
		},
		speed:{             //移动速度
			now:0,         //当前在第几个等级
			n:3,           //共有几个等级
			left: 450,
            top: 100,
            //灰色图片left、top
            l1:-116,
            t1:-228,
//          //彩色图片left、top
            l2:-116,
            t2:-284,
            //技能名字
            name:"疾跑",
            //后置技能代号
            next:"rate",
            //技能描述
            dis:["移动速度+0.2","移动速度+0.8","移动速度+1.8"],
		},
		hp:{               //血量
			now:0,         //当前在第几个等级
			n:3,           //共有几个等级
			left: 250,
            top: 100,
            l1:-116,
            t1:-340,
//          //彩色图片left、top
            l2:-116,
            t2:-396,
            //技能名字
            name:"坚不可摧",
            //后置技能代号
            next:"nb",
            //技能描述
            dis:["血量上限+50","血量上限+200","血量上限+450"],
		},
		atr:{               //攻击范围
			now:0,         //当前在第几个等级
			n:3,           //共有几个等级
			left: 350,
            top: 100,
            l1:-60,
            t1:-452,
//          //彩色图片left、top
            l2:-116,
            t2:-60,
            //技能名字
            name:"虽远必诛",
            //后置技能代号
            next:"vast",
            //技能描述
            dis:["攻击范围+50","攻击范围+200","攻击范围+450"],
		},
		atkB:{               //大攻击
			now:0,         //当前在第几个等级
			n:3,           //共有几个等级
			left: 50,
            top: 200,
            l1:-116,
            t1:-116,
//          //彩色图片left、top
            l2:-116,
            t2:-172,
            //技能名字
            name:"牺牲",
            //前置技能代号
            pre:["atk"],
            //后置技能代号
            next:"thump",
            //技能描述
            dis:["进一步增加攻击力，但变的更易受伤。随着技能等级的提升，受到的伤害逐渐减轻。攻击力+2，受伤系数1.7","进一步增加攻击力，但变的更易受伤。攻击力+4，受伤系数1.4","进一步增加攻击力，但变的更易受伤。攻击力+6，受伤系数1.1"],
		},
		cri:{                //暴击率
			now:0,         //当前在第几个等级
			n:3,           //共有几个等级
			left: 150,
            top: 200,
            l1:-4,
            t1:-340,
//          //彩色图片left、top
            l2:-4,
            t2:-396,
            //技能名字
            name:"致命",
            //后置技能代号
            next:"thump",
            //技能描述
            dis:["暴击率10%","暴击率40%","暴击率90%"],
		},
		nb:{                //击退
			now:0,         //当前在第几个等级
			n:3,           //共有几个等级
			left: 250,
            top: 200,
            l1:-228,
            t1:-340,
//          //彩色图片left、top
            l2:-228,
            t2:-396,
            //技能名字
            name:"击退",
            //前置技能代号
            pre:["hp"],
            //技能描述
            dis:["攻击附带击退敌人一段距离，距离系数+1","攻击附带击退敌人一段距离，距离系数+2","攻击附带击退敌人一段距离，距离系数+3"],
		},
		rate:{                 //攻击速度
			now:0,         //当前在第几个等级
			n:3,           //共有几个等级
			left: 450,
            top: 200,
            l1:-4,
            t1:-116,
//          //彩色图片left、top
            l2:-4,
            t2:-172,
            //技能名字
            name:"快速射击",
            //前置技能代号
            pre:["speed"],
            //后置技能代号
            next:"vast",
            //技能描述
            dis:["攻击间隔减少0.1秒","攻击间隔减少0.2秒","攻击间隔减少0.3秒"],
		},
		thump:{             //百步穿杨
			now:0,         //当前在第几个等级
			n:1,           //共有几个等级
			left: 100,
            top: 300,
            l1:-284,
            t1:-172,
//          //彩色图片left、top
            l2:-340,
            t2:-172,
            //技能名字
            name:"百步穿杨",
            //前置技能代号
            pre:["atkB","cri"],
            //后置技能代号
            next:"hurt",
            //技能描述
            dis:["攻击一条直线上的敌人,且箭身周围形成箭气，对50码内所有敌人造成等量伤害"],
		},
		vast:{              //散弹
			now:0,         //当前在第几个等级
			n:1,           //共有几个等级
			left: 400,
            top: 300,
            l1:-172,
            t1:-452,
//          //彩色图片left、top
            l2:-228,
            t2:-172,
            //技能名字
            name:"火力全开",
            //前置技能代号
            pre:["atr","rate"],
            //后置技能代号
            next:"num",
            //技能描述
            dis:["向扇形区域内发射三支弓箭"],
		},
		hurt:{              //暴击伤害
			now:0,         //当前在第几个等级
			n:3,           //共有几个等级
			left: 100,
            top: 400,
            l1:-340,
            t1:-4,
//          //彩色图片left、top
            l2:-396,
            t2:-4,
            //技能名字
            name:"重伤",
            //前置技能代号
            pre:["thump"],
            //技能描述
            dis:["暴击伤害400%","暴击伤害600%","暴击伤害800%"],
		},
		num:{                //散弹数量
			now:0,         //当前在第几个等级
			n:3,           //共有几个等级
			left: 400,
            top: 400,
            l1:-172,
            t1:-340,
//          //彩色图片left、top
            l2:-172,
            t2:-396,
            //技能名字
            name:"万箭齐发",
            //前置技能代号
            pre:["vast"],
            //技能描述
            dis:["向扇形区域内发射5支弓箭","向扇形区域内发射7支弓箭","向扇形区域内发射9支弓箭"],
		},
	},
	monster:{   //怪物种类
		fox:{                   //狐狸
			name:"fox",         //怪物名字
			maxHp:10,            //最大生命值
			atk:10,            //攻击力
			rate:1,              //攻击速度
			atr:70,               //攻击范围
			speed:2,              //移动速度
			w:150,                //图宽
			h:150,                //图高
			b:15,                //怪物的肥胖程度，单位px，决定命中角度大小
			imgsRunAll:10,         //怪物跑动图片有几张
			imgsHitAll:21,          //怪物攻击图片有几张
			imgsKnockbackAll:32,        //怪物受伤有几张图片
			imgsDeathAll:32          //怪物死亡图片有几张
		},
		leopard:{                  //豹子
			name:"leopard",         //怪物名字
			maxHp:20,            //最大生命值
			atk:10,            //攻击力
			rate:0.5,              //攻击速度
			atr:90,               //攻击范围
			speed:4,              //移动速度
			w:200,                //图宽
			h:200,                //图高
			b:15,                //怪物的肥胖程度，单位px，决定命中角度大小
			imgsRunAll:30,         //怪物跑动图片有几张
			imgsHitAll:39,          //怪物攻击图片有几张
			imgsKnockbackAll:34,        //怪物受伤有几张图片
			imgsDeathAll:41          //怪物死亡图片有几张
		},
		pig:{                    //野猪
			name:"pig",         //怪物名字
			maxHp:150,            //最大生命值
			atk:20,            //攻击力
			rate:2,              //攻击速度
			atr:90,               //攻击范围
			speed:0.8,              //移动速度
			w:150,                //图宽
			h:150,                //图高
			b:30,                //怪物的肥胖程度，单位px，决定命中角度大小
			imgsRunAll:18,         //怪物跑动图片有几张
			imgsHitAll:46,          //怪物攻击图片有几张
			imgsKnockbackAll:18,        //怪物受伤有几张图片
			imgsDeathAll:32          //怪物死亡图片有几张
		},
		alligator:{                   //鳄鱼
			name:"alligator",         //怪物名字
			maxHp:80,            //最大生命值
			atk:30,            //攻击力
			rate:1,              //攻击速度
			atr:90,               //攻击范围
			speed:2,              //移动速度
			w:300,                //图宽
			h:300,                //图高
			b:20,                //怪物的肥胖程度，单位px，决定命中角度大小
			imgsRunAll:33,         //怪物跑动图片有几张
			imgsHitAll:39,          //怪物攻击图片有几张
			imgsKnockbackAll:17,        //怪物受伤有几张图片
			imgsDeathAll:71          //怪物死亡图片有几张
		},
		foxBoss:{                   //狐狸boss
			name:"fox",         //怪物名字
			maxHp:1000,            //最大生命值
			atk:30,            //攻击力
			rate:3,              //攻击速度
			atr:130,               //攻击范围
			speed:0.8,              //移动速度
			w:250,                //图宽
			h:250,                //图高
			b:25,                //怪物的肥胖程度，单位px，决定命中角度大小
			imgsRunAll:10,         //怪物跑动图片有几张
			imgsHitAll:21,          //怪物攻击图片有几张
			imgsKnockbackAll:32,        //怪物受伤有几张图片
			imgsDeathAll:32          //怪物死亡图片有几张
		},
		leopardBoss:{                   //豹子boss
			name:"leopard",         //怪物名字
			maxHp:1000,            //最大生命值
			atk:40,            //攻击力
			rate:2,              //攻击速度
			atr:130,               //攻击范围
			speed:1,              //移动速度
			w:250,                //图宽
			h:250,                //图高
			b:25,                //怪物的肥胖程度，单位px，决定命中角度大小
			imgsRunAll:30,         //怪物跑动图片有几张
			imgsHitAll:39,          //怪物攻击图片有几张
			imgsKnockbackAll:34,        //怪物受伤有几张图片
			imgsDeathAll:41          //怪物死亡图片有几张
		},
		pigBoss:{                    //野猪boss
			name:"pig",         //怪物名字
			maxHp:3000,            //最大生命值
			atk:50,            //攻击力
			rate:3,              //攻击速度
			atr:130,               //攻击范围
			speed:0.5,              //移动速度
			w:250,                //图宽
			h:250,                //图高
			b:45,                //怪物的肥胖程度，单位px，决定命中角度大小
			imgsRunAll:18,         //怪物跑动图片有几张
			imgsHitAll:46,          //怪物攻击图片有几张
			imgsKnockbackAll:18,        //怪物受伤有几张图片
			imgsDeathAll:32          //怪物死亡图片有几张
		},
		alligatorBoss:{                   //鳄鱼boss
			name:"alligator",         //怪物名字
			maxHp:2000,            //最大生命值
			atk:60,            //攻击力
			rate:2,              //攻击速度
			atr:150,               //攻击范围
			speed:0.8,              //移动速度
			w:400,                //图宽
			h:400,                //图高
			b:40,                //怪物的肥胖程度，单位px，决定命中角度大小
			imgsRunAll:33,         //怪物跑动图片有几张
			imgsHitAll:39,          //怪物攻击图片有几张
			imgsKnockbackAll:17,        //怪物受伤有几张图片
			imgsDeathAll:71          //怪物死亡图片有几张
		}
	}
}

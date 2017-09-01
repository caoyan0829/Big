

var GameEngine={
	//1.属性
	ele:null, //  document.getElementById("main");  不先写，会直接加载，顺序问题
	
	
	allBullets:[],  //页面显示的所有子弹
	allEnemys:[],  //页面显示的所有敌机
	
	totalscore:0,  //总分
	//2.初始化方法
	
	init:function(){
		this.ele=document.getElementById("main");
		
		//console.log(1)
		//return this;   //有返回 可以这样写：GameEngine.init().star()    GameEngine.ele 改变了
	},
	//3.游戏开始
	star:function(){
		console.log("游戏开始");
		this.loadding(function(){   //回调       //this=GameEngine
			console.log("加载完毕，进入主页面")
			//右上角分数显示
			var div=document.createElement("div");
			div.className="score";
			GameEngine.ele.appendChild(div)
			
			
			
			Myself.init();     //飞机初始化
			Myself.moving();   //拖拽移动
			Myself.fire();     ///发射子弹   
			GameEngine.keybord();   //监听键盘
			
			GameEngine.createEnemy();  //创建敌机
			
			GameEngine.crash();   //碰撞检测
			
			GameEngine.movebg();   //移动背景图 
		});   
	},
	
	//4.模拟加载游戏
	loadding:function(back){
		//logo
		var logo=document.createElement("div");
		GameEngine.ele.appendChild(logo);
		logo.className="logo";
		
		//加载
		var load=document.createElement("div");
		GameEngine.ele.appendChild(load);
		load.className="load";
		
		//加载动画
		var index=0
		var timer=setInterval(function(){
			++index;
			if(index<6){
				load.style.backgroundImage="url(images/loading"+(index%3+1)+".png)";
			}else{
				clearInterval(timer);
				GameEngine.ele.removeChild(logo);  //移除节点 进入游戏
				GameEngine.ele.removeChild(load);
				if(back) back();   //回到了  17行  因为我要继续执行游戏，此时是异步操作，用回调
			}
			
		},500)
	},
	//键盘
	keybord:function(){
		var xspeed=0;
		var yspeed=0;
		window.onkeydown=function(e){
			e=e||event;
			if(e.keyCode==37){
				xspeed = -10
			}
			else if(e.keyCode==38){
				yspeed = -10
			}
			else if(e.keyCode==39){
				xspeed = 10
			}
			else if(e.keyCode==40){
				yspeed = 10
				//Myself.ele.style.top=Myself.ele.offsetTop+10+"px";
			}
		}
		window.onkeyup=function(e){
			e=e||event;
			if(e.keyCode==37||e.keyCode==39){  //松开其中一个
				xspeed=0;
			}
			if(e.keyCode==38||e.keyCode==40){
				yspeed=0;
			}
		}
		setInterval(function(){
			var x=Myself.ele.offsetLeft+xspeed
			if(x<0) x=0;
			if(x >GameEngine.ele.offsetWidth-Myself.ele.offsetWidth){
				x = GameEngine.ele.offsetWidth-Myself.ele.offsetWidth-1;
			};
			Myself.ele.style.top=Myself.ele.offsetTop+yspeed+"px";
			Myself.ele.style.left=x+"px";
		},30)
	},
	//创建敌机
	createEnemy:function(){
		//大型飞机
		setInterval(function(){
			var flag=Math.random()>0.5?true:false;
			if(flag){
				var enemy=new Enemy(Enemy.prototype.Enemy_type_large);
				enemy.init();
				enemy.move()
			}
		},4000)
		//中型
		setInterval(function(){
			var flag=Math.random()>0.5?true:false;
			if(flag){
				var enemy=new Enemy(Enemy.prototype.Enemy_type_middle);
				enemy.init();
				enemy.move()
			}
		},2000)
		
		//小型
		setInterval(function(){
			var enemy=new Enemy(Enemy.prototype.Enemy_type_small);
			enemy.init();
			enemy.move()
		},1500)
		
	},
	
	//碰撞检测  子弹和敌机
	crash:function(){
		var timer=setInterval(function(){
			for(var i=0;i<GameEngine.allEnemys.length;i++){  //遍历敌机
				for(var j=0;j<GameEngine.allBullets.length;j++){ //遍历所有子弹
					
					if(isCrash(GameEngine.allEnemys[i].ele , GameEngine.allBullets[j].ele)){//判断两个节点是否有交集碰撞
						//有交集的话应该让子弹和敌机（看血量）一起消失
						//让子弹爆炸并消失
						GameEngine.allBullets[j].boom();
						GameEngine.allBullets.splice(j,1); //子弹爆炸时 也从数组移除  移除当前的子弹
						//让敌机收一点伤害
						GameEngine.allEnemys[i].hurt()
						
					}
				}
			
				//判断我的飞机与敌机是否碰撞
				if(isCrash(GameEngine.allEnemys[i].ele,Myself.ele)){
					//console.log(1)
					clearInterval(timer);
					Myself.boom(function(){
						var name=prompt("请留下您的大名,您当前的分数是"+GameEngine.totalscore);
						ajax({
							type: "post",
							url: "http://60.205.181.47/myPHPCode4/uploadScore.php",
							data: {name: name, score: GameEngine.totalscore},
							
							success: function(data){
								console.log("提交成功: " + data);
								//进入排行榜
								location.href = "Phangbang.html";
							}
						})
					})
					
					break;
				}
			}
		},30)
	},
	
	//移动背景图
	movebg:function(){
		var y=0;
		setInterval(function(){
			GameEngine.ele.style.backgroundPositionY=y++ +"px"
		},50)
	}
}























//敌机
function Enemy(type){
	//属性
	this.ele=null;
	this.hp=1;  //血量
	this.speed=10;  //速度
	this.dieImages=[];  //敌机死亡时的图片
	this.score=10;  //分数
	//方法
	this.init=function(){
		this.ele=document.createElement("div");
		GameEngine.ele.appendChild(this.ele);
		
		//将当前敌机对象 加入到数组
		GameEngine.allEnemys.push(this);
		
		
		
		switch(type){
			//大型飞机
			case this.Enemy_type_large:
				this.ele.className="enemy-large";
				this.speed=this.Enemy_speed_large;  //对象的属性，不是节点的属性
				this.hp=this.Enemy_hp_large;
				this.dieImages=["images/plane3_die1.png","images/plane3_die2.png","images/plane3_die3.png","images/plane3_die4.png","images/plane3_die5.png","images/plane3_die6.png",]
				this.score=50;
				break;
			//中型飞机
			case this.Enemy_type_middle:
				this.ele.className="enemy-middle";
				this.speed=this.Enemy_speed_middle;
				this.hp=this.Enemy_hp_middle;
				this.dieImages=["images/plane2_die1.png","images/plane2_die2.png","images/plane2_die3.png","images/plane2_die4.png",]
				this.score=30;
				break;
			//大型飞机
			case this.Enemy_type_small:
				this.ele.className="enemy-small";
				this.speed=this.Enemy_speed_small;
				this.hp=this.Enemy_hp_small;
				this.dieImages=["images/plane1_die1.png","images/plane1_die2.png","images/plane1_die3.png",]
				this.score=10;
				break;
			//其他
			default:
				alert("该型号不存在")
			
		}
		//位置
		
		this.ele.style.left=parseInt(Math.random()*(GameEngine.ele.offsetWidth-this.ele.offsetWidth))+"px";
		this.ele.style.top=-this.ele.offsetHeight+"px";
	};
	
	//移动
	this.move=function(){
		var that=this;
		this.timer=setInterval(function(){
			if(that.ele.offsetTop > GameEngine.ele.offsetHeight){
				//console.log(1)
				clearInterval(this.timer)
				GameEngine.ele.removeChild(that.ele);
				//将当前敌机从数组移出
				GameEngine.allEnemys.splice(GameEngine.allEnemys.indexOf(that),1)
				
			}else{
				that.ele.style.top=that.ele.offsetTop+that.speed+"px"
			}
			
		},50)
	};
	this.hurt=function(){
		this.hp--;
		if(this.hp==0){
			this.boom()
			GameEngine.totalscore += this.score;
			var div=document.getElementsByClassName("score")[0]
			//console.log(div)
			div.innerHTML=GameEngine.totalscore;
			//GameEngine.ele.className("score").innerHTML=GameEngine.totalscore
		}
	}
	//飞机爆炸
	this.boom=function(){
		//停止移动
		clearInterval(this.timer);
		//爆炸动画
		var i=0;
		
		var that=this;
		var dietimer=setInterval(function(){
			//大型飞机
			
			if(i>=that.dieImages.length){
				clearInterval(dietimer);
				GameEngine.ele.removeChild(that.ele);
				//将飞机从数组中移除  （添加一个就在数组加一个，删除一个就在数组移除一个）
				GameEngine.allEnemys.splice(GameEngine.allEnemys.indexOf(that),1)
			}
			that.ele.style.backgroundImage="url("+that.dieImages[i++]+")";
			
		},100)
	}
}



Enemy.prototype={
	Enemy_type_large:3,   //敌机机型
	Enemy_type_middle:2,
	Enemy_type_small:1,
	
	Enemy_speed_large:3,  //敌机速度
	Enemy_speed_middle:6,
	Enemy_speed_small:9,
	
	Enemy_hp_large:8,   //敌机血量
	Enemy_hp_middle:3,
	Enemy_hp_small:1,
}






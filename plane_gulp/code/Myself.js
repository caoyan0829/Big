
//玩家自己
var Myself={
	//属性
	ele:null,
	
	//方法
	
	init:function(){
		Myself.ele=document.createElement("div");
		GameEngine.ele.appendChild(Myself.ele);
		Myself.ele.className="Myself";
		Myself.ele.style.top=GameEngine.ele.offsetHeight - Myself.ele.offsetHeight+"px";
		Myself.ele.style.left=GameEngine.ele.offsetWidth/2 - Myself.ele.offsetWidth/2+"px";
		return this
	},
	//拖拽移动
	moving:function(){
		//this.ele=Myself.ele
		console.log(3)
		this.ele.onmousedown=function(e){
			e=e||event;
			var disx=e.offsetX;
			var disy=e.offsetY;
//			console.log(2)
			document.onmousemove=function(e){
				e=e||event;
				var x=e.pageX-disx-GameEngine.ele.offsetLeft;
				var y=e.pageY-disy
				//console.log(x)
				if(x<0) x=0;
				if(x >GameEngine.ele.offsetWidth-Myself.ele.offsetWidth){
					x = GameEngine.ele.offsetWidth-Myself.ele.offsetWidth-1;
				};
				Myself.ele.style.left=x+"px";
				Myself.ele.style.top=y+"px";
//				console.log(1)
			}
			document.onmouseup=function(){
				document.onmouseup=document.onmousemove=null;
			}
		};
		
		
	},
	//发射子弹
	fire:function(){
		this.timer=setInterval(function(){
			//创建子弹
			var bullet=new Bullet();   //多个子弹
			bullet.init();  //调用子弹节点
			bullet.move();   //调用子弹移动
		},Myself.Pinlv)   //时间间隔  控制创建的子弹个数
		
	},
	boom:function(callback){
		//停止发射子弹
		clearInterval(this.timer);
		
		var dieImages=["images/me_die1.png","images/me_die2.png","images/me_die3.png","images/me_die4.png"]
		//死亡动画
		var i=0;
		var dietimer=setInterval(function(){
			if(i>=dieImages.length){
				clearInterval(dietimer);
				GameEngine.ele.removeChild(Myself.ele)
				
				callback()
			}else{
				Myself.ele.style.backgroundImage="url("+dieImages[i++]+")";
			}
			
		},100)
	}
	
	
}








//单例模式
let Plane=(function(){
		//玩家自己
	let Myself={
		//属性
		ele:null,
		
		//方法
		
		init:()=>{
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
			this.ele.onmousedown=e=>{
				e=e||event;
				let disx=e.offsetX;
				let disy=e.offsetY;
	//			console.log(2)
				document.onmousemove=e=>{
					e.stopPropagation()
					e=e||event;
					let x=e.pageX-disx-GameEngine.ele.offsetLeft;
					let y=e.pageY-disy
					//console.log(x)
					if(x<0) x=0;
					if(x >GameEngine.ele.offsetWidth-Myself.ele.offsetWidth){
						x = GameEngine.ele.offsetWidth-Myself.ele.offsetWidth-1;
					};
					Myself.ele.style.left=x+"px";
					Myself.ele.style.top=y+"px";
	//				console.log(1)
				}
				document.onmouseup=()=>{
					document.onmouseup=document.onmousemove=null;
				}
			};
			
			
		},
		//发射子弹
		fire:()=>{
			this.timer=setInterval(()=>{
				//创建子弹
				let bullet=new Bullet();   //多个子弹
				bullet.init();  //调用子弹节点
				bullet.move();   //调用子弹移动
			},Myself.Pinlv)   //时间间隔  控制创建的子弹个数
			
		},
		boom:function(callback){
			//停止发射子弹
			clearInterval(this.timer);
			
			let dieImages=["images/me_die1.png","images/me_die2.png","images/me_die3.png","images/me_die4.png"]
			//死亡动画
			let i=0;
			let dietimer=setInterval(()=>{
				if(i>=dieImages.length){
					clearInterval(dietimer);
					GameEngine.ele.removeChild(Myself.ele)
					
					callback()
				}else{
					Myself.ele.style.backgroundImage=`url(${dieImages[i++]})`;
				}
				
			},100)
		}
	}
	
	let instance;
	return function(){
		if(!instance){
			instance=Myself;
		}
		return instance;
	}
})()










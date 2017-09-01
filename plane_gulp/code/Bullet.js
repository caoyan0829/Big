
//子弹 有很多 构造函数
function Bullet(){
	
	this.ele=null;
	
	this.init=function(){
		var that=this;
		this.ele=document.createElement("div");
		this.ele.className="bullet";
		GameEngine.ele.appendChild(this.ele);
		//
		GameEngine.allBullets.push(this); //将当前子弹对象 加入数组中
		
		that.ele.style.left=Myself.ele.offsetLeft+Myself.ele.offsetWidth/2-that.ele.offsetWidth/2+1+"px";
		that.ele.style.top=Myself.ele.offsetTop-this.ele.offsetHeight+"px";
	}
	//移动
	this.move=function(){
		var that=this;
		this.timer=setInterval(function(){
			if(that.ele.offsetTop<-18){
				clearInterval(that.timer);
				GameEngine.ele.removeChild(that.ele);
				//将当前的子弹从数组中删掉
				var index=GameEngine.allBullets.indexOf(that)
				GameEngine.allBullets.splice(index,1)       //将子弹从数组头移除，先进的在头部
			}
			that.ele.style.top = that.ele.offsetTop -14 +"px";
		},50)  //每50毫秒 走的路程
	},
	//子弹爆炸
	this.boom=function(){
		clearInterval(this.timer)
		
		this.ele.className="bullet-die";
		//动画
		var that=this;
		var i=0
		var dietimer=setInterval(function(){
			++i;
			if(i>2){
				clearInterval(dietimer);
				GameEngine.ele.removeChild(that.ele)//  数组中的子弹还在
			}
			that.ele.style.backgroundImage="url(images/die"+i+".png)"; 
		},100)
		
	}
}

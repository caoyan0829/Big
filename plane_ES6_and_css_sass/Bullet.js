
//子弹 有很多 构造函数
class Bullet extends Base{
	constructor() {
		super();
	    //this.ele=null;
	}
	
	//初始化
	init(){
		let that=this;
		this.ele=document.createElement("div");
		this.ele.className="bullet";
		GameEngine.ele.appendChild(this.ele);
		//
		GameEngine.allBullets.push(this); //将当前子弹对象 加入数组中
		
		that.ele.style.left=Plane().ele.offsetLeft+Plane().ele.offsetWidth/2-that.ele.offsetWidth/2+1+"px";
		that.ele.style.top=Plane().ele.offsetTop-this.ele.offsetHeight+"px";
	}
	//移动
	move(){
		//let that=this;
		this.timer=setInterval(()=>{
			if(this.ele.offsetTop<-18){
				clearInterval(this.timer);
				GameEngine.ele.removeChild(this.ele);
				//将当前的子弹从数组中删掉
				let index=GameEngine.allBullets.indexOf(this)
				GameEngine.allBullets.splice(index,1)       //将子弹从数组头移除，先进的在头部
			}
			this.ele.style.top = this.ele.offsetTop -14 +"px";
		},50)  //每50毫秒 走的路程
	}
	//子弹爆炸
	//this.boom=function(){
	boom(){
		clearInterval(this.timer)
		
		this.ele.className="bullet-die";
		//动画
		//let that=this;
		let i=0
		let dietimer=setInterval(()=>{
			++i;
			if(i>2){
				clearInterval(dietimer);
				GameEngine.ele.removeChild(this.ele)//  数组中的子弹还在
			}
			this.ele.style.backgroundImage=`url(images/die${i}.png)`; 
		},100)
		
	}
}

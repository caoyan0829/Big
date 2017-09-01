function getStyle(obj,attr){   //对象    属性
	if(window.getComputedStyle){
		return window.getComputedStyle(obj,null)[attr];
	}
		return obj.currentStyle[attr]
}

//封装运动函数
//支持同时改变多个属性
//animate(box, {left:300, top:300, width:300, height:300, opacity:20})
//参数：
//第一个参数： 需要修改的节点对象
//第二个参数：需要修改的css样式属性级目标值
//第三个参数：运动完成后的回调函数
function moves(obj,json,fn){
	 
	clearInterval(obj.timer);  //防止多次点击有多个定时器
	
	obj.timer=setInterval(function(){   //哪个对象使用定时器，就显示哪个
		
		var bStop=true;      //设置一个变量   用来判断定时器的使用
		for(var attr in json){     //用来遍历多个css样式
			var itarget=json[attr];   //将其中的属性  赋值为itarget
			
			var current;    
			//1.current     当前值
			if(attr=="opacity"){      //如果对象是透明度
				current=Math.round(getStyle(obj,attr)*100);    //得到其css样式，让其范围 与filter一致
			}else{
				current=parseFloat(getStyle(obj,attr));   //如果是其余的 带数值的   
				current=Math.round(current);
				//console.log(current)
			}
			
			
			//2.speed    运动速度
			var speed=(itarget-current)/8;     //  速度本身除以8 是为了得到   加速度
			speed = speed>0? Math.ceil(speed): Math.floor(speed);
			//3.临界值
			if(current!=itarget){      //如果当前值与目标值 不一样   将bStop为false     那么就继续执行定时器  
				bStop=false;    
			}
			//4.运动
			if(attr=="opacity"){
				obj.style[attr]=(current+speed)/100;
				obj.style.filter="alpha(opacity="+(current+speed)+")";
			}else{
				obj.style[attr]=current+speed+"px"
				
			}
		}
		if(bStop){     //如果     bStop为true  说明itarget==current  那么此时达到要求   停止定时器
			clearInterval(obj.timer)
			
			if (fn){
				fn()
			}             //如果想再动一次，就回调
		}
		
		
			
	},30)
	
	
	
}























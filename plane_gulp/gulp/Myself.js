var Myself={ele:null,init:function(){return Myself.ele=document.createElement("div"),GameEngine.ele.appendChild(Myself.ele),Myself.ele.className="Myself",Myself.ele.style.top=GameEngine.ele.offsetHeight-Myself.ele.offsetHeight+"px",Myself.ele.style.left=GameEngine.ele.offsetWidth/2-Myself.ele.offsetWidth/2+"px",this},moving:function(){console.log(3),this.ele.onmousedown=function(e){var l=(e=e||event).offsetX,n=e.offsetY;document.onmousemove=function(e){var t=(e=e||event).pageX-l-GameEngine.ele.offsetLeft,f=e.pageY-n;t<0&&(t=0),t>GameEngine.ele.offsetWidth-Myself.ele.offsetWidth&&(t=GameEngine.ele.offsetWidth-Myself.ele.offsetWidth-1),Myself.ele.style.left=t+"px",Myself.ele.style.top=f+"px"},document.onmouseup=function(){document.onmouseup=document.onmousemove=null}}},fire:function(){this.timer=setInterval(function(){var e=new Bullet;e.init(),e.move()},Myself.Pinlv)},boom:function(e){clearInterval(this.timer);var l=["images/me_die1.png","images/me_die2.png","images/me_die3.png","images/me_die4.png"],n=0,t=setInterval(function(){n>=l.length?(clearInterval(t),GameEngine.ele.removeChild(Myself.ele),e()):Myself.ele.style.backgroundImage="url("+l[n++]+")"},100)}};
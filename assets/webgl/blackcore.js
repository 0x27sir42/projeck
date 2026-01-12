const c=document.getElementById("bg");
const x=c.getContext("2d");
function r(){c.width=innerWidth;c.height=innerHeight}
r();addEventListener("resize",r);

let p=[];
for(let i=0;i<700;i++){
 p.push({a:Math.random()*6.28,r:Math.random()*800+100,s:Math.random()*2});
}

(function loop(){
 x.fillStyle="rgba(0,0,0,.4)";
 x.fillRect(0,0,c.width,c.height);
 p.forEach(o=>{
  o.a+=0.002*o.s;o.r-=0.1;
  if(o.r<80)o.r=900;
  let X=c.width/2+Math.cos(o.a)*o.r;
  let Y=c.height/2+Math.sin(o.a)*o.r;
  x.fillStyle="#00ff9c";
  x.fillRect(X,Y,2,2);
 });
 requestAnimationFrame(loop);
})();

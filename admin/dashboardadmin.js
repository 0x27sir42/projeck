setInterval(()=>{
 let s=JSON.parse(localStorage.getItem("zila_support")||"[]");
 inbox.innerHTML="";
 s.forEach(d=>{
  inbox.innerHTML+=`
  <div class="msg">
   <b>${d.wallet}</b><br>${d.msg}<br>
   <button onclick="ban('${d.wallet}')">BAN</button>
  </div>`;
 });
},1500);

function ban(w){
 let b=JSON.parse(localStorage.getItem("zila_banned")||"[]");
 if(!b.includes(w)) b.push(w);
 localStorage.setItem("zila_banned",JSON.stringify(b));
}

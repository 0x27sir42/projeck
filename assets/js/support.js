function sendSupport(){
 let m=supportMsg.value;
 if(m.length<3) return;
 let a=JSON.parse(localStorage.getItem("zila_support")||"[]");
 a.push({wallet:user,msg:m,time:new Date().toLocaleString()});
 localStorage.setItem("zila_support",JSON.stringify(a));
 supportStatus.innerText="Sent ✔";
}

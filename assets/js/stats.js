setInterval(()=>{
 let s=JSON.parse(localStorage.getItem("zila_sales")||"[]");
 let t=s.reduce((a,b)=>a+Number(b.amount),0);
 stats.innerText="📊 Total Raised: "+t+" POL";
},1500);

async function loadStats(){
 const c=new ethers.Contract(PRESALE_ADDRESS,presaleABI,provider);
 const raised=await c.totalRaised();
 const buyers=await c.totalBuyers();
 document.getElementById("stats").innerHTML=
  `Raised: ${ethers.utils.formatEther(raised)} POL<br>Buyers: ${buyers}`;
}
setInterval(()=>{ if(provider) loadStats(); },5000);

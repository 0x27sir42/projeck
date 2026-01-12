let provider, signer, admin;

async function connectAdmin(){
 if(!window.ethereum) return alert("Wallet not found");
 await ethereum.request({method:"eth_requestAccounts"});
 provider=new ethers.providers.Web3Provider(window.ethereum);
 signer=provider.getSigner();
 admin=await signer.getAddress();
 document.getElementById("adminWallet").innerText="Admin: "+admin;
 loadSupport();
}

function loadSupport(){
 const list=document.getElementById("supportList");
 list.innerHTML="";
 for(let k in localStorage){
   if(k.startsWith("support_")){
     const user=k.replace("support_","");
     const msg=localStorage.getItem(k);
     list.innerHTML+=`
       <div class="status">
         <b>${user}</b><br>${msg}
       </div>`;
   }
 }
}

async function withdraw(){
 const c=new ethers.Contract(PRESALE_ADDRESS,["function withdraw()"],signer);
 await (await c.withdraw()).wait();
 alert("Withdraw success");
}

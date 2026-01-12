let provider, signer, admin;

async function connectAdmin(){
 await ethereum.request({method:"eth_requestAccounts"});
 provider=new ethers.providers.Web3Provider(window.ethereum);
 signer=provider.getSigner();
 admin=await signer.getAddress();
 adminWallet.innerText=admin;
 loadSupport();
}

function loadSupport(){
 supportList.innerHTML="";
 for(let k in localStorage){
  if(k.startsWith("support_")){
   const u=k.replace("support_","");
   supportList.innerHTML+=`
   <div class="status">
    <b>${u}</b><br>
    ${localStorage.getItem(k)}<br>
    <input id="r_${u}" placeholder="Reply">
    <button onclick="reply('${u}')">Send</button>
   </div>`;
  }
 }
}

function reply(u){
 localStorage.setItem("reply_"+u,document.getElementById("r_"+u).value);
}

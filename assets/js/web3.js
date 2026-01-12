let provider, signer, user;

async function connectWallet(){
 if(!window.ethereum) return alert("Wallet not found");
 await ethereum.request({method:"eth_requestAccounts"});
 provider=new ethers.providers.Web3Provider(window.ethereum);
 signer=provider.getSigner();
 user=await signer.getAddress();
 connectBtn.innerText="Connected";
 walletInfo.innerText=user;
 loadStats();
}

async function buyZila(){
 const val=buyAmount.value;
 const c=new ethers.Contract(PRESALE_ADDRESS,presaleABI,signer);
 await (await c.buy({value:ethers.utils.parseEther(val)})).wait();
}

function sendSupport(){
 localStorage.setItem("support_"+user,supportMsg.value);
 supportStatus.innerText="Sent";
}

function loadReply(){
 const r=localStorage.getItem("reply_"+user);
 if(r) document.getElementById("adminReply").innerText=r;
}
setInterval(loadReply,2000);

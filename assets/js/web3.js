let provider, signer, user;

async function connectWallet(){
 if(!window.ethereum) return alert("Wallet not found");
 await ethereum.request({method:"eth_requestAccounts"});
 provider=new ethers.providers.Web3Provider(window.ethereum);
 signer=provider.getSigner();
 user=await signer.getAddress();

 document.getElementById("connectBtn").innerText="Connected";
 document.getElementById("walletInfo").innerText="Wallet: "+user;
}

async function buyZila(){
 const val=buyAmount.value;
 const c=new ethers.Contract(PRESALE_ADDRESS,presaleABI,signer);
 presaleStatus.innerText="Processing...";
 await (await c.buy({value:ethers.utils.parseEther(val)})).wait();
 presaleStatus.innerText="Success";
}

async function claimPresale(){
 const c=new ethers.Contract(PRESALE_ADDRESS,presaleABI,signer);
 await (await c.claim()).wait();
}

function sendSupport(){
 if(!user) return alert("Connect wallet");
 const msg=supportMsg.value;
 localStorage.setItem("support_"+user,msg);
 supportStatus.innerText="Sent to admin";
}

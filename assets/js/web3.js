let provider,signer,user;

async function connectWallet(){
 if(!window.ethereum) return alert("Wallet not found");
 await ethereum.request({method:"eth_requestAccounts"});
 provider=new ethers.providers.Web3Provider(window.ethereum);
 signer=provider.getSigner();
 user=await signer.getAddress();
 document.getElementById("connectBtn").innerText=user.slice(0,6)+"..."+user.slice(-4);
}

async function buyZila(){
 const val=document.getElementById("buyAmount").value;
 const c=new ethers.Contract(PRESALE_ADDRESS,presaleABI,signer);
 await (await c.buy({value:ethers.utils.parseEther(val)})).wait();
 document.getElementById("presaleStatus").innerText="SUCCESS";
}

async function claimPresale(){
 const c=new ethers.Contract(PRESALE_ADDRESS,presaleABI,signer);
 await (await c.claim()).wait();
}

async function stakeZila(){
 const amt=document.getElementById("stakeAmount").value;
 const plan=document.getElementById("plan").value;
 const token=new ethers.Contract(ZILA_TOKEN,tokenABI,signer);
 const staking=new ethers.Contract(STAKING_ADDRESS,stakingABI,signer);

 const allow=await token.allowance(user,STAKING_ADDRESS);
 if(allow.lt(ethers.utils.parseEther(amt))){
   await (await token.approve(STAKING_ADDRESS,ethers.constants.MaxUint256)).wait();
 }
 await (await staking.stake(ethers.utils.parseEther(amt),plan)).wait();
}

let provider,signer,user;

async function connectWallet(){
 if(!window.ethereum) return alert("Wallet required");
 await ethereum.request({method:"eth_requestAccounts"});
 await ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:CHAIN_ID}]});
 provider=new ethers.providers.Web3Provider(window.ethereum);
 signer=provider.getSigner();
 user=await signer.getAddress();

 if(isBanned(user)) return alert("ACCESS DENIED");

 await signer.signMessage("ZILA AUTH");

 connectBtn.innerText=user.slice(0,6)+"..."+user.slice(-4);
 walletHUD.innerText="👁 "+user;
}
async function buyZila(){
 if(!user) return alert("Connect wallet");
 let v=buyAmount.value;
 const c=new ethers.Contract(PRESALE_ADDRESS,presaleABI,signer);
 await (await c.buy({value:ethers.utils.parseEther(v)})).wait();

 let s=JSON.parse(localStorage.getItem("zila_sales")||"[]");
 s.push({wallet:user,amount:v});
 localStorage.setItem("zila_sales",JSON.stringify(s));
}

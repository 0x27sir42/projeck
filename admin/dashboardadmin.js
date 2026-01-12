let provider,signer,admin;

const PRESALE="0x72cF8781aa3A6D7FD3324CD0dAA8b858461849d7";

const adminABI=[
 "function withdraw()"
];

async function connectAdmin(){
 await ethereum.request({method:"eth_requestAccounts"});
 provider=new ethers.providers.Web3Provider(window.ethereum);
 signer=provider.getSigner();
 admin=await signer.getAddress();
 document.getElementById("adminStatus").innerText="ADMIN "+admin;
}

async function withdraw(){
 const c=new ethers.Contract(PRESALE,adminABI,signer);
 await (await c.withdraw()).wait();
 alert("WITHDRAW SUCCESS");
}

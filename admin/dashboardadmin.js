let provider, signer, admin;

/* ===== CONFIG ===== */
const OWNER = "ISI_OWNER_WALLET_KAMU_DI_SINI".toLowerCase();

const PRESALE = "0x72cF8781aa3A6D7FD3324CD0dAA8b858461849d7";
const STAKING = "0xef1CC2A23c0023093C545044d9f7154863715a27";

/* ===== ABI ===== */
const presaleABI = [
  "function withdrawPOL() external",
  "function tgeTime() view returns(uint256)",
  "function users(address) view returns(uint256 totalBought,uint256 claimed)",
  "function setTGE(uint256 _time)"
];

const stakingABI = [
  "function stakes(address) view returns(uint256 amount,uint256 start,uint256 lock,uint256 apy,uint256 claimed)",
  "function pendingReward(address) view returns(uint256)"
];

/* ===== CONNECT ADMIN ===== */
async function connectAdmin(){
  if(!window.ethereum) return alert("Wallet not found");

  await ethereum.request({method:"eth_requestAccounts"});
  await ethereum.request({
    method:"wallet_switchEthereumChain",
    params:[{chainId:"0x89"}]
  });

  provider = new ethers.providers.Web3Provider(ethereum);
  signer = provider.getSigner();
  admin = (await signer.getAddress()).toLowerCase();

  if(admin !== OWNER){
    document.body.innerHTML = "<h1 style='color:red;text-align:center'>ACCESS DENIED</h1>";
    throw new Error("Unauthorized");
  }

  adminStatus.innerText = "Admin connected: " +
    admin.slice(0,4)+"***"+admin.slice(-4);
}

/* ===== PRESALE STATS ===== */
async function loadPresaleStats(){
  const c = new ethers.Contract(PRESALE, presaleABI, signer);
  const bal = await provider.getBalance(PRESALE);
  const tge = await c.tgeTime();

  presaleStats.innerText =
    "POL Balance: " + ethers.utils.formatEther(bal) + " POL\n" +
    "TGE: " + (tge==0 ? "Not set" : new Date(tge*1000).toUTCString());
}

/* ===== SET TGE ===== */
async function setTGE(){
  const time = tgeInput.value;
  if(!time) return alert("Input timestamp");
  const c = new ethers.Contract(PRESALE, presaleABI, signer);
  tgeStatus.innerText = "Setting TGE...";
  await (await c.setTGE(time)).wait();
  tgeStatus.innerText = "TGE set successfully";
}

/* ===== WITHDRAW POL ===== */
async function withdrawPOL(){
  if(!confirm("Withdraw all POL to owner wallet?")) return;
  const c = new ethers.Contract(PRESALE, presaleABI, signer);
  withdrawStatus.innerText = "Withdrawing...";
  await (await c.withdrawPOL()).wait();
  withdrawStatus.innerText = "Withdraw success";
}

/* ===== CHECK USER STAKE ===== */
async function checkStake(){
  const user = userAddress.value;
  if(!user) return alert("Input user address");

  const s = new ethers.Contract(STAKING, stakingABI, signer);
  const data = await s.stakes(user);
  const reward = await s.pendingReward(user);

  stakeInfo.innerText =
    "Staked: " + ethers.utils.formatEther(data.amount) + " ZILA\n" +
    "APY: " + data.apy + "%\n" +
    "Pending Reward: " + ethers.utils.formatEther(reward) + " ZILA";
    }

let provider, signer, admin;

/* ===== CONTRACT ADDRESSES ===== */
const PRESALE = "0x72cF8781aa3A6D7FD3324CD0dAA8b858461849d7";

/* ===== ABI (ADMIN FUNCTIONS) ===== */
const presaleABI = [
  "function setTGE(uint256)",
  "function withdrawPOL()",
  "function totalRaised() view returns(uint256)"
];

/* ===== CONNECT ADMIN ===== */
async function connectAdmin(){
  if(!window.ethereum){
    alert("Wallet not detected");
    return;
  }

  try{
    const accounts = await ethereum.request({
      method: "eth_requestAccounts"
    });

    provider = new ethers.providers.Web3Provider(window.ethereum);
    signer = provider.getSigner();
    admin = accounts[0];

    // SIGN MESSAGE (SECURITY)
    const message = "ZILA ADMIN AUTHORIZATION";
    const signature = await signer.signMessage(message);

    document.getElementById("adminStatus").innerText = "Admin connected";
    document.getElementById("adminAddress").innerText =
      "Wallet: " + admin;
    document.getElementById("adminSignature").innerText =
      "Signature: " + signature.slice(0,40) + "...";

  }catch(err){
    console.error(err);
    document.getElementById("adminStatus").innerText =
      "Connection rejected";
  }
}

/* ===== LOAD PRESALE STATS ===== */
async function loadPresaleStats(){
  if(!admin) return alert("Connect admin wallet first");

  const c = new ethers.Contract(PRESALE, presaleABI, provider);
  const raised = await c.totalRaised();

  document.getElementById("presaleStats").innerText =
    "Total Raised: " + ethers.utils.formatEther(raised) + " POL";
}

/* ===== SET TGE ===== */
async function setTGE(){
  if(!admin) return alert("Connect admin wallet first");

  const tge = document.getElementById("tgeInput").value;
  if(!tge) return alert("Input TGE timestamp");

  const c = new ethers.Contract(PRESALE, presaleABI, signer);
  document.getElementById("tgeStatus").innerText = "Setting TGE...";
  await (await c.setTGE(tge)).wait();

  document.getElementById("tgeStatus").innerText =
    "TGE successfully set";
}

/* ===== WITHDRAW POL ===== */
async function withdrawPOL(){
  if(!admin) return alert("Connect admin wallet first");

  const c = new ethers.Contract(PRESALE, presaleABI, signer);
  document.getElementById("withdrawStatus").innerText =
    "Withdrawing POL...";
  await (await c.withdrawPOL()).wait();

  document.getElementById("withdrawStatus").innerText =
    "POL withdrawn successfully";
}

/* ===== CHECK STAKE (PLACEHOLDER) ===== */
function checkStake(){
  const addr = document.getElementById("userAddress").value;
  if(!addr) return alert("Input user address");

  document.getElementById("stakeInfo").innerText =
    "Stake data loaded for " + addr;
    }

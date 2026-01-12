/* =========================
   ZILA UNIVERSAL WALLET CORE
   SUPPORT ALL EVM WALLETS
========================= */

const DEBUG = true;
function log(...a){ if(DEBUG) console.log("🟢 WALLET:",...a); }
function err(...a){ console.error("🔴 WALLET ERROR:",...a); }

window.provider = null;
window.signer = null;
window.user = null;

/* ===== GLOBAL CONNECT WALLET ===== */
window.connectWallet = async function () {
  log("Connect triggered");

  if (!window.ethereum) {
    alert("❌ No Web3 wallet detected.\nUse MetaMask / Trust / OKX / Rabby / Brave");
    return;
  }

  try {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts"
    });

    if (!accounts || !accounts.length) {
      alert("❌ Wallet rejected");
      return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    signer = provider.getSigner();
    user = await signer.getAddress();

    log("Connected address:", user);

    const network = await provider.getNetwork();
    log("Chain ID:", network.chainId);

    // UI UPDATE
    const btn = document.getElementById("connectBtn");
    const hud = document.getElementById("walletStatus");

    if (btn) btn.innerText = user.slice(0,6) + "..." + user.slice(-4);
    if (hud) hud.innerHTML = "🟢 Connected<br><b>" + user + "</b>";

    if (typeof loadStats === "function") loadStats();

    log("Wallet connected SUCCESS");

  } catch (e) {
    err(e);
    alert("❌ Wallet connection failed.\nCheck console.");
  }
};

/* ===== AUTO RECONNECT ===== */
window.addEventListener("load", async () => {
  if (!window.ethereum) return;

  const acc = await ethereum.request({ method: "eth_accounts" });
  if (acc.length) {
    log("Auto reconnect");
    window.connectWallet();
  }
});

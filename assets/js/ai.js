function zilaAI(){
 let q=aiInput.value.toLowerCase();
 let r="ZILA AI: ";
 if(q.includes("price")) r+="Presale 0.000625 POL.";
 else if(q.includes("staking")) r+="Staking APY optimized.";
 else r+="AI core evolving.";
 aiOutput.innerText=r;
}

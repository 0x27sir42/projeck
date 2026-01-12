function isBanned(addr){
 let b=JSON.parse(localStorage.getItem("zila_banned")||"[]");
 return b.includes(addr);
}

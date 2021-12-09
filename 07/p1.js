const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const rawCrabs = input.split(',');
let crabs = [];
for(let i=0; i<rawCrabs.length; i++) crabs[i] = rawCrabs[i]-0;

let min = Infinity;
let res = 0;
for(let j=0; j<2000; j++) {
  let total = 0;
  for(let i=0; i<crabs.length; i++) {
    total += Math.abs(crabs[i]-j);
  }
  if(total < min) {
    min = total;
    res = j;
  }
}

console.log(res, min);
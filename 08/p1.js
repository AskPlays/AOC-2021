const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const rawDigits = input.split('\r\n');
let endBits = [];
for(let i=0; i<rawDigits.length; i++) endBits[i] = rawDigits[i].split(' | ')[1].split(' ');

let total = 0;
for(let i=0; i<endBits.length; i++) {
  for(let j=0; j<endBits[i].length; j++) {
    if([2, 3, 4, 7].includes(endBits[i][j].length)) total++;
  }
}

console.log(total);
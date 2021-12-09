const fs = require('fs');
const input = fs.readFileSync('./01/input.txt', 'utf8');

const values = input.split('\n');

let res = 0;
for(let i=1; i<values.length; i++) {
  if(values[i]-0 > values[i-1]-0) res++;
}
console.log(res);
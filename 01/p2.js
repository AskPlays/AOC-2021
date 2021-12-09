const fs = require('fs');
const input = fs.readFileSync('./01/input.txt', 'utf8');

const values = input.split('\n');

function tSum(i) {
  return (values[i]-0)+(values[i+1]-0)+(values[i+2]-0);
}

let res = 0;
for(let i=1; i<values.length-2; i++) {
  if(tSum(i) > tSum(i-1)) res++;
}
console.log(res);
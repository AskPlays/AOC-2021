const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const values = input.split('\n');

let gamma = '';
let epsilon = '';
for(let j=0; j<values[0].length; j++) {
  let zeros = 0;
  let ones = 0;
  for(let i=0; i<values.length; i++) {
    if(values[i][j] == '0') zeros++;
    else if(values[i][j] == '1') ones++;
  }
  if(zeros == ones) console.log("HELP!");
  if(zeros > ones) { gamma += '0'; epsilon += '1'; }
  else if(zeros < ones) { gamma += '1'; epsilon += '0'; }
}
gamma = parseInt(gamma, 2);
epsilon = parseInt(epsilon, 2);;
console.log(gamma, epsilon, gamma*epsilon);
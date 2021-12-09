const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
// const input = `00100
// 11110
// 10110
// 10111
// 10101
// 01111
// 00111
// 11100
// 10000
// 11001
// 00010
// 01010`;

const v1 = input.split('\n');
const v2 = v1.slice();

for(let j=0; j<v1[0].length && v1.length > 1; j++) {
  let zeros = 0;
  let ones = 0;
  for(let i=0; i<v1.length; i++) {
    if(v1[i][j] == '0') zeros++;
    else if(v1[i][j] == '1') ones++;
  }
  let keep = zeros > ones ? '0' : '1';
  for(let i=0; i<v1.length; i++) {
    if(v1[i][j] !== keep) {
      v1.splice(i, 1);
      i--;
    }
  }
}
let o2 = v1[0];

for(let j=0; j<v2[0].length && v2.length > 1; j++) {
  let zeros = 0;
  let ones = 0;
  for(let i=0; i<v2.length; i++) {
    if(v2[i][j] == '0') zeros++;
    else if(v2[i][j] == '1') ones++;
  }
  let keep = zeros <= ones ? '0' : '1';
  for(let i=0; i<v2.length; i++) {
    if(v2[i][j] !== keep) {
      v2.splice(i, 1);
      i--;
    }
  }
}
let co2 = v2[0];
console.log(o2, co2)

gamma = parseInt(o2, 2);
epsilon = parseInt(co2, 2);;
console.log(gamma, epsilon, gamma*epsilon);
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');

const values = input.split('\n');

let horz = 0;
let aim = 0;
let vert = 0;
for(let i=0; i<values.length; i++) {
  let parts = values[i].split(' ');
  if(parts[0] == "forward") { horz += parts[1]-0; vert += (parts[1]-0)*aim;}
  if(parts[0] == "down") aim += parts[1]-0;
  if(parts[0] == "up") aim -= parts[1]-0;
}
console.log(horz, vert, horz*vert);
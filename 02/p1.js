const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
// const input = `forward 5
// down 5
// forward 8
// up 3
// down 8
// forward 2`

const values = input.split('\n');

let horz = 0;
let vert = 0;
for(let i=0; i<values.length; i++) {
  let parts = values[i].split(' ');
  if(parts[0] == "forward") horz += parts[1]-0;
  if(parts[0] == "down") vert += parts[1]-0;
  if(parts[0] == "up") vert -= parts[1]-0;
}
console.log(horz, vert, horz*vert);
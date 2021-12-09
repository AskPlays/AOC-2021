const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const rawFish = input.split(',');
let fish = [];
for(let i=0; i<rawFish.length; i++) fish[i] = rawFish[i]-0;

for(let j=0; j<120; j++) {
  let len = fish.length;
  for(let i=0; i<len; i++) {
    if(fish[i] > 0) {
      fish[i]--;
    } else {
      fish[i]=6;
      fish.push(8);
    }
  }
}

console.log(fish.length);
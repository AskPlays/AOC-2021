const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const rawFish = input.split(',');
let days = [0, 0, 0, 0, 0, 0, 0, 0, 0];
for(let i=0; i<rawFish.length; i++) days[rawFish[i]-0]++;

for(let j=0; j<256; j++) {
  let births = 0;
  for(let i=0; i<days.length; i++) {
    if(i == 0) {
      births+=days[i];
    } else {
      days[i-1] = days[i];
    }
  }
  days[6] += births;
  days[8] = births;
}

let total = 0;
for(let i=0; i<days.length; i++) {
  total += days[i];
}

console.log(total);
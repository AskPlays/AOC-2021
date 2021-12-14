const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '');
const test = `NNCB

CH -> B
HH -> N
CB -> H
NH -> C
HB -> C
HC -> B
HN -> C
NN -> C
BH -> H
NC -> B
NB -> B
BN -> B
BB -> N
BC -> B
CC -> N
CN -> C`;
const parts = input.split('\n\n');
let polymer = parts[0].split('');
const inserts = parts[1].split('\n');
const pairs = [];

for(let i = 0; i < inserts.length; i++) {
    pairs[i] = inserts[i].split(' -> ');
}

console.log(polymer.join(''));
for(let k=0; k < 10; k++) {
    for(let i = 0; i < polymer.length-1; i++) {
        let done = false;
        for(let j = 0; j < pairs.length; j++) {
            if(pairs[j][0] == polymer[i]+polymer[i+1]) {
                polymer.splice(i+1, 0, pairs[j][1]);
                done = true;
                break;
            }
        }
        if(done) i++;
    }
    //console.log(polymer.join(''));
}

let amounts = {};
for(let i = 0; i < polymer.length; i++) {
    if(amounts[polymer[i]]) amounts[polymer[i]]++;
    else amounts[polymer[i]] = 1;
}

let sorted = Object.keys(amounts).sort((a, b)=>amounts[b]-amounts[a]).reduce(
    (obj, key) => { 
        obj[key] = amounts[key]; 
        return obj;
    }, 
    {}
);

let keys = Object.keys(sorted);

console.log(sorted, sorted[keys[0]]-sorted[keys[keys.length-1]]);
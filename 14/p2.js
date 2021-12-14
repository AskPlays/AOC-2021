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
const polymers = {};
let insertions = {};

for(let i = 0; i < inserts.length; i++) {
    const pair = inserts[i].split(' -> ');
    polymers[pair[0]] = pair[1];
    insertions[pair[0]] = 0;
}

const insertionsDC = Object.assign({}, insertions);
const amounts = {"O": 0, "K": 0, "P": 0, "V": 0, "N": 0, "F": 0, "S": 0, "B": 0, "C": 0, "H": 0};
const pNames = Object.keys(polymers);

for(let i = 0; i < polymer.length-1; i++) {
    for(let j = 0; j < pNames.length; j++) {
        if(pNames[j] == polymer[i]+polymer[i+1]) {
            insertions[pNames[j]]++;
            break;
        }
    }
}

for(let i = 0; i < polymer.length; i++) {
    amounts[polymer[i]]++;
}

console.log(polymer.join(''));

const steps = 40;
for(let k=0; k < steps; k++) {
    const newInsertions = Object.assign({}, insertionsDC);
    for(let i = 0; i < pNames.length; i++) {
        const name = pNames[i];
        const amount = insertions[name]
        if(amount > 0) { 
            newInsertions[name[0]+polymers[name]] += amount;
            newInsertions[polymers[name]+name[1]] += amount;
            amounts[polymers[name]] += amount;
        }
    }
    insertions = newInsertions;
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
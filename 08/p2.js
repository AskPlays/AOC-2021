const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');//'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'//
const rawDigits = input.split('\r\n');
let startBits = [];
let endBits = [];
for(let i=0; i<rawDigits.length; i++) {
  let bothBits = rawDigits[i].split(' | ');
  startBits[i] = bothBits[0].split(' ');
  endBits[i] = bothBits[1].split(' ');
}

function getByElim(bits, letters) {
  for(let i=0; i<bits.length; i++) {
    let res = bits[i];
    let fail = false;
    for(let j=0; j<letters.length; j++) {
      if(res.indexOf(letters[j]) != -1) res = res.replace(letters[j], "");
      else {
        fail = true;
        break;
      }
    }
    if(fail) continue;
    else return res;
  }
}

let total = 0;
for(let i=0; i<startBits.length; i++) {
  let one = '';
  let four = '';
  let seven = '';
  let eight = '';
  let len5 = [];
  let len6 = [];
  for(let j=0; j<startBits[i].length; j++) {
    if(startBits[i][j].length == 2) one = startBits[i][j];
    if(startBits[i][j].length == 3) seven = startBits[i][j];
    if(startBits[i][j].length == 4) four = startBits[i][j];
    if(startBits[i][j].length == 5) len5.push(startBits[i][j]);
    if(startBits[i][j].length == 6) len6.push(startBits[i][j]);
    if(startBits[i][j].length == 7) eight = startBits[i][j];
  }
  //step 1:
  let cf = one;
  //step 2:
  let bd = four.replace(cf[0], "").replace(cf[1], "");
  //step 3:
  let a = seven.replace(cf[0], "").replace(cf[1], "");
  //step 4:
  let g = getByElim(len6, a+bd+cf);
  //step 5:
  let e = getByElim([eight], a+bd+cf+g);
  //step 6:
  let f = getByElim(len6, a+bd+e+g);
  //step 7:
  let c = cf.replace(f, "");
  //step 8:
  let d = getByElim(len5, a+c+f+g);
  //step 9:
  let b = getByElim([four], c+d+f);

  let number = '';
  for(let j=0; j<endBits[i].length; j++) {
    let isA = false;
    let isB = false;
    let isC = false;
    let isD = false;
    let isE = false;
    let isF = false;
    let isG = false;
    for(let k=0; k<endBits[i][j].length; k++) { 
      if(endBits[i][j][k] == a) isA = true;
      if(endBits[i][j][k] == b) isB = true;
      if(endBits[i][j][k] == c) isC = true;
      if(endBits[i][j][k] == d) isD = true;
      if(endBits[i][j][k] == e) isE = true;
      if(endBits[i][j][k] == f) isF = true;
      if(endBits[i][j][k] == g) isG = true;
    }
    if(isA && isB && isC && isD && isE && isF && isG) number += '8'; //7
    else if(isA && isB && isC && isE && isF && isG) number += '0'; //6
    else if(isA && isB && isD && isE && isF && isG) number += '6';
    else if(isA && isB && isC && isD && isF && isG) number += '9';
    else if(isA && isC && isD && isE && isG) number += '2'; //5
    else if(isA && isC && isD && isF && isG) number += '3';
    else if(isA && isB && isD && isF && isG) number += '5';
    else if(isB && isC && isD && isF) number += '4'; //4
    else if(isA && isC && isF) number += '7'; //3
    else if(isC && isF) number += '1'; //2
  }
  total += number-0;
}

console.log(total);

let solution = `
acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf
   8                  3    7    9      6     4          1      5     3     5     3
abcdefg             acdfg acf abcdfg abdefg bcdf        cf | abdfg acdfg abdfg acdfg

analysis:
ab=cf (1) {2} cf~
ef=bd (4) [cf] {4} bd~
d=a (7) [cf] {3} a=
c=g (9) [abcdf] {6} g=
g=e (8) [abcdfg] {7} e=
b=f (6) [abdeg] {6} f=
a=c (1) [f] {2} c=
f=d (3) [acfg] {5} d=
e=b (4) [cdf] {4} b=

solving:
cdfeb fcadb cdfeb cdbaf
  5     3     5     3
abdfg acdfg abdfg acdfg
gadbf dgcaf gadbf gafcd
`
const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\r\n');

const board = [];
for(let i=0; i<1000; i++) board[i] = [];

for(let k=0; k<lines.length; k++) {
  const coords = lines[k].split(' -> ');
  //console.log(coords);
  const pos1 = coords[0].split(',');
  const x1 = pos1[0]-0;
  const y1 = pos1[1]-0;
  const pos2 = coords[1].split(',');
  const x2 = pos2[0]-0;
  const y2 = pos2[1]-0;
  //console.log(coords);
  
  if(x1 == x2) {
    const min = Math.min(y1, y2);
    const max = Math.max(y1, y2);
    for(let i=min; i<=max; i++) {
      setBoard(x1, i);
    }
  } else if(y1 == y2) {
    const min = Math.min(x1, x2);
    const max = Math.max(x1, x2);
    for(let i=min; i<=max; i++) {
      setBoard(i, y1);
    }
  }

}

function setBoard(x, y) {
  if(board[x][y]) {
    board[x][y]++;
  } else {
    board[x][y] = 1;
  }
}

//console.log(boards);

let crosses = 0;
for(let i=0; i<board.length; i++) {
  for(let j=0; j<board[i].length; j++) {
    if(board[i][j]) {
      if(board[i][j] >= 2) crosses++;
    }
  }
}
console.log(crosses);


//console.log(moves, boards);
/*const values = input.split('\n');

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
console.log(gamma, epsilon, gamma*epsilon);*/
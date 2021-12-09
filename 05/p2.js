const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const lines = input.split('\r\n');

const board = [];
for(let i=0; i<1000; i++) board[i] = [];

for(let k=0; k<lines.length; k++) {
  const coords = lines[k].split(' -> ');
  const pos1 = coords[0].split(',');
  const x1 = pos1[0]-0;
  const y1 = pos1[1]-0;
  const pos2 = coords[1].split(',');
  const x2 = pos2[0]-0;
  const y2 = pos2[1]-0;
  
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
  } else if(Math.abs(x1-x2) == Math.abs(y1-y2)) {
    const xDir = Math.sign(x2-x1);
    const yDir = Math.sign(y2-y1);
    if(xDir == 1) {
      let j=y1;
      for(let i=x1; i<=x2; i++) {
        setBoard(i, j);
        j+=yDir;
      }
    } else {
      let j=y1;
      for(let i=x1; i>=x2; i--) {
        setBoard(i, j);
        j+=yDir;
      }
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


let crosses = 0;
for(let i=0; i<board.length; i++) {
  for(let j=0; j<board[i].length; j++) {
    if(board[i][j]) {
      if(board[i][j] >= 2) crosses++;
    }
  }
}
console.log(crosses);
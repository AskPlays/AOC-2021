const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const boards = input.split('\r\n\r\n');
const moves = boards.splice(0, 1)[0].split(',');

for(let k=0; k<boards.length; k++) {
  const rows = boards[k].split('\r\n');
  //console.log(rows);
  for(let l=0; l<rows.length; l++) {
    const cells = rows[l].replace(/^( )/g, '').replace(/( )+/g, ' ').split(' ');
    //console.log(cells);
    rows[l] = cells;
  }
  boards[k] = rows;
}

//console.log(boards);

let win = false;
for(let l=0; l<moves.length; l++) {
  for(let k=0; k<boards.length; k++) {
    const board = boards[k];
    for(let i=0; i<board.length; i++) {
      let cells = 0;
      for(let j=0; j<board[i].length; j++) {
        if(board[i][j] == moves[l]) board[i][j] = -1;
        if(board[i][j] == -1) cells++;
      }
      if(cells == board[i].length) {
        win = true;
        break;
      }
    }
    if(win) {
      let sum = 0;
      for(let i=0; i<board.length; i++) {
        for(let j=0; j<board[i].length; j++) {
          if(board[i][j] != -1) sum += board[i][j]-0;
        }
      }
      console.log(sum, moves[l]-0, sum*(moves[l]-0));
      break;
    }
    for(let j=0; j<board[0].length; j++) {
      let cells = 0;
      for(let i=0; i<board.length; i++) {
        if(board[i][j] == moves[l]) board[i][j] = -1;
        if(board[i][j] == -1) cells++;
      }
      if(cells == board[0].length) {
        win = true;
        break;
      }
    }
    if(win) {
      let sum = 0;
      for(let i=0; i<board.length; i++) {
        for(let j=0; j<board[i].length; j++) {
          if(board[i][j] != -1) sum += board[i][j]-0;
        }
      }
      console.log(sum, moves[l]-0, sum*(moves[l]-0));
      break;
    }
  }
  if(win) break;
}



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
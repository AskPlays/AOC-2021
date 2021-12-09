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

let con = "";
let win = false;
for(let l=0; l<moves.length; l++) {
  for(let k=0; k<boards.length; k++) {
    const board = boards[k];
    const board2 = JSON.parse(JSON.stringify(board));
   //let sum = 0;
    for(let i=0; i<board.length; i++) {
      let cells = 0;
      let nn = false;
      for(let j=0; j<board[i].length; j++) {
        //if(board[i][j] != -1) sum += board[i][j]-0;
        if(board[i][j] == moves[l]) {
          board[i][j] = -1;
          nn = true;
        }
        if(board[i][j] == -1) cells++;
      }
      if(cells == board[i].length && nn) {
        win = true;
      }
    }
    if(win) {
      let sum = 0;
      for(let i=0; i<board.length; i++) {
        for(let j=0; j<board[i].length; j++) {
          if(board[i][j] != -1) sum += board[i][j]-0;
        }
      }
      //console.log(sum, moves[l]-0, sum*(moves[l]-0));
      con = (sum+" ") + moves[l]+ " " + (sum*(moves[l]-0));
      win = false;
      boards.splice(k, 1);
      k--;
      continue;
    }
    for(let j=0; j<board2[0].length; j++) {
      let cells = 0;
      let nn = false;
      for(let i=0; i<board2.length; i++) {
        if(board2[i][j] == moves[l]) { 
          board2[i][j] = -1;
          nn = true;
        }
        if(board2[i][j] == -1) cells++;
      }
      if(cells == board2[0].length && nn) {
        win = true;
      }
    }
    if(win) {
      let sum = 0;
      for(let i=0; i<board.length; i++) {
        for(let j=0; j<board[i].length; j++) {
          if(board[i][j] != -1) sum += board[i][j]-0;
        }
      }
      //console.log(sum, moves[l]-0, sum*(moves[l]-0));
      con = (sum+" ") + moves[l]+ " " + (sum*(moves[l]-0));
      win = false;
      boards.splice(k, 1);
      k--;
      continue;
    }
  }
}

console.log(con);
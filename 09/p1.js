const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const test = `2199943210
3987894921
9856789892
8767896789
9899965678`;
const board = input.split('\r\n');

let total = 0;
for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
        if(i > 0 && board[i-1][j]-0 <= board[i][j]-0) continue;
        if(i < board.length-1 && board[i+1][j]-0 <= board[i][j]-0) continue;
        if(j > 0 && board[i][j-1]-0 <= board[i][j]-0) continue;
        if(j < board[i].length-1 && board[i][j+1]-0 <= board[i][j]-0) continue;
        total += 1+(board[i][j]-0);
    }
}

console.log(total);
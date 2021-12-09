const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');//'acedgfb cdfbe gcdfa fbcad dab cefabd cdfgeb eafb cagedb ab | cdfeb fcadb cdfeb cdbaf'//
const test = `2199943210
3987894921
9856789892
8767896789
9899965678`;
const board = input.split('\r\n');
const basins = {};

function checkP(x, y, checked) {
    return !checked[(y+1)+","+(x+1)];
}

async function basinSize(x, y, checked) {
    if(board[x][y] == '9') return 0;
    checked[(y+1)+","+(x+1)] = true;
    if(checkP(x-1, y, checked) && x>0) basinSize(x-1, y, checked);
    if(checkP(x+1, y, checked) && x < board.length-1) basinSize(x+1, y, checked);
    if(checkP(x, y-1, checked) && y>0) basinSize(x, y-1, checked);
    if(checkP(x, y+1, checked) && y < board[0].length-1) basinSize(x, y+1, checked);
}

for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
        if(i > 0 && board[i-1][j]-0 <= board[i][j]-0) continue;
        if(i < board.length-1 && board[i+1][j]-0 <= board[i][j]-0) continue;
        if(j > 0 && board[i][j-1]-0 <= board[i][j]-0) continue;
        if(j < board[i].length-1 && board[i][j+1]-0 <= board[i][j]-0) continue;
        const checked = {};
        basinSize(i, j, checked);
        basins[i+","+j]=Object.keys(checked).length;
    }
}

const sizes = Object.values(basins);
sizes.sort((a, b)=> b-a);
console.log(sizes[0]*sizes[1]*sizes[2]);
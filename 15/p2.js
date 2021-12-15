const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '');
const test = `1163751742
1381373672
2136511328
3194931569
7163417111
1119111137
1311192121
3125421139
1293138121
2311944581`;
const risks = input.split('\n');
const unvisited = [];
const visited = [];
const board = [];

const bW = risks.length;
const bH = risks[0].length;
const scale = 5;

for(let i = 0; i < risks.length*scale; i++) {
    board[i] = [];
    for(let j = 0; j < risks[0].length*scale; j++) {
        board[i][j] = (risks[i % bW][j % bH]-0)+Math.floor(i/bW) + Math.floor(j/bH);
        if(board[i][j] > 9) board[i][j] = board[i][j]- 9;
    }
}

const width = board.length;
const height = board[0].length;
const end = (bW*5-1)*width+(bH*5-1);

for(let i = 0; i < width; i++) {
    for(let j = 0; j < height; j++) {
        visited[i*width+j] = false;
    }
}

unvisited[0] = 0;

function visit(dist, x, y) {
    const idx = x*width+y;
    if(visited[idx]) return;
    const val = dist+board[x][y];
    if(val < unvisited[idx] || unvisited[idx] == undefined) unvisited[idx] = val;;
}

console.time("dijkstra");
let searching = true;
while(searching) {
    let lowest = 0;
    let lowestDist = Infinity;
    const nodeNames = Object.keys(unvisited);
    for(let i = 0; i < nodeNames.length; i++) {
        if(unvisited[nodeNames[i]] < lowestDist) {
            lowest = nodeNames[i];
            lowestDist = unvisited[nodeNames[i]];
        }
    }
    if(lowest == end) {
        searching = false;
        break;
    }
    const x = Math.floor(lowest/width);
    const y = lowest%width;
    if(x > 0) visit(lowestDist, x-1, y);
    if(x < width-1) visit(lowestDist, x+1, y);
    if(y > 0) visit(lowestDist, x, y-1);
    if(y < height-1) visit(lowestDist, x, y+1);
    delete unvisited[lowest];
    visited[lowest] = true;
}
console.timeEnd("dijkstra");

console.log(unvisited[end]);
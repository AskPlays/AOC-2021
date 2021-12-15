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
const board = input.split('\n');
const unvisited = {};

for(let i = 0; i < board.length; i++) {
    for(let j = 0; j < board[i].length; j++) {
        unvisited[i+","+j] = Infinity;
    }
}

unvisited["0,0"] = 0;

function visit(dist, x, y) {
    if(unvisited[x+","+y] > dist+(board[x][y]-0)) unvisited[x+","+y] = dist+(board[x][y]-0);
}

console.time("dijkstra");
let searching = true;
while(searching) {
    let lowest = "0,0";
    let lowestDist = Infinity;
    const nodeNames = Object.keys(unvisited);
    for(let i = 0; i < nodeNames.length; i++) {
        if(unvisited[nodeNames[i]] < lowestDist) {
            lowest = nodeNames[i];
            lowestDist = unvisited[nodeNames[i]];
        }
    }
    if(lowest == (board.length-1)+","+(board[0].length-1)) {
        searching = false;
        break;
    }
    const coords = lowest.split(",");
    const x = coords[0]-0;
    const y = coords[1]-0;
    if(x > 0) visit(lowestDist, x-1, y);
    if(x < board.length-1) visit(lowestDist, x+1, y);
    if(y > 0) visit(lowestDist, x, y-1);
    if(y < board[0].length-1) visit(lowestDist, x, y+1);
    delete unvisited[lowest];
}
console.timeEnd("dijkstra");

console.log(unvisited[(board.length-1)+","+(board[0].length-1)]);
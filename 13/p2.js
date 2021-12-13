const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const test = `6,10
0,14
9,10
0,3
10,4
4,11
6,0
6,12
4,1
0,13
10,12
3,4
3,0
8,4
1,10
2,14
8,10
9,0

fold along y=7
fold along x=5`;
const parts = input.split('\r\n\r\n');//test.split('\n\n');//
const coords = parts[0].split('\r\n');
const folds = parts[1].split('\r\n');
let dots = [];
const insts = [];

const WIDTH = 1500;
const HEIGHT = 1500;

for(let i = 0; i < coords.length; i++) {
    const coord = coords[i].split(',');
    dots[i] = {x:coord[0]-0, y:coord[1]-0};
}

for(let i = 0; i < folds.length; i++) {
    let inst = folds[i].replace("fold along ", "").split('=');
    insts[i] = {axis:inst[0], pos:inst[1]-0};
}

function show(grid) {
    for(let j = 0; j < 6; j++) {
        let line = "";
        for(let i = 0; i < 40; i++) {
            if(grid[i][j]) line += "#";
            else line += " ";
        }
        console.log(line);
    }
}

function fold(coords, inst) {
    const grid = [];
    for(let i = 0; i < WIDTH; i++) {
        grid[i] = [];
    }
    if(inst.axis == "x") { 
        for(let i = 0; i < coords.length; i++) {
            if(coords[i].x < inst.pos) grid[coords[i].x][coords[i].y] = "#";
            else grid[2*inst.pos-coords[i].x][coords[i].y] = "#";
        }
    }
    if(inst.axis == "y") { 
        for(let i = 0; i < coords.length; i++) {
            if(coords[i].y < inst.pos) grid[coords[i].x][coords[i].y] = "#";
            else grid[coords[i].x][2*inst.pos-coords[i].y] = "#";
        }
    }
    return grid;
}

function points(grid) {
    let points = [];
    for(let j = 0; j < HEIGHT; j++) {
        for(let i = 0; i < WIDTH; i++) {
            if(grid[i][j]) points.push({x: i, y: j});
        }
    }
    return points;
}

let grid;
for(var i = 0; i < insts.length; i++) {
    grid = fold(dots, insts[i]);
    dots = points(grid);
}

show(grid);
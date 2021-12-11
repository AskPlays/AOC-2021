const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const test = `5483143223
2745854711
5264556173
6141336146
6357385478
4167524645
2176841721
6882881134
4846848554
5283751526`;
const lines = input.split('\r\n');
const cells = [];
for(let i = 0; i < lines.length; i++) {
    cells[i] = lines[i].split('');
    for(let j = 0; j < cells[i].length; j++) {
        cells[i][j] = cells[i][j]-0;
    }
}

function check(done, x, y) {
    if(done[x*cells.length+y]) return;
    if(cells[x][y] > 9) {
        done[x*cells.length+y] = true;
        flash(done, x, y);
    }
}

function flash(done, x, y) {
    doCell(done, x, y-1);
    doCell(done, x+1, y-1)
    doCell(done, x+1, y)
    doCell(done, x+1, y+1)
    doCell(done, x, y+1)
    doCell(done, x-1, y+1)
    doCell(done, x-1, y)
    doCell(done, x-1, y-1)
}

function doCell(done, x, y) {
    if(x >= 0 && x < cells.length && y >= 0 && y < cells[0].length) {
        cells[x][y]++;
        check(done, x, y);
    }
}

let flashes = 0;
for(let k = 0; k < 100; k++) {
    for(let i = 0; i < cells.length; i++) {
        for(let j = 0; j < cells[i].length; j++) {
            cells[i][j]++;
        }
    }
    const done = [];
    for(let i = 0; i < cells.length; i++) {
        for(let j = 0; j < cells[i].length; j++) {
            check(done, i, j);
        }
    }
    for(let i = 0; i < cells.length; i++) {
        for(let j = 0; j < cells[i].length; j++) {
            if(done[i*cells.length+j]) cells[i][j]=0;
        }
    }
    flashes += Object.keys(done).length;
    /*let stringed = "";
    for(let i = 0; i < cells.length; i++) {
        stringed += cells[i].join('')+"\n";
    }
    console.log(stringed);*/
}

console.log(flashes);
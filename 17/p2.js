const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '');
const test = `target area: x=20..30, y=-10..-5`;
const area = input.slice(13).split(', ');
const xRange = area[0].slice(2).split('..');
const yRange = area[1].slice(2).split('..');
const xMin = xRange[0]-0;
const xMax = xRange[1]-0;
const yMin = yRange[0]-0;
const yMax = yRange[1]-0;
let pos = {x: 0, y:0};
let vel = {x: 0, y:0};

console.log(xMin, xMax, yMin, yMax)

function step() {
    pos.x += vel.x;
    pos.y += vel.y;
    if(vel.x > 0) vel.x--;
    else if(vel.x < 0) vel.x++;
    vel.y--;
}

let finished = 0;

for(let i = 10; i < 200; i++) {
    for(let j = -114; j < 800; j++) {
        pos = {x: 0, y:0};
        vel = {x: i, y:j};
        let done = false;
        while(pos.x <= xMax && pos.y >= yMin && !done) {
            step();
            if(pos.x >= xMin && pos.x <= xMax && pos.y >= yMin && pos.y <= yMax) done = true;
        }
        if(done) {
            finished++;
        }
    }
}

console.log(finished);
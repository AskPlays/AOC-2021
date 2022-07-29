const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '');
const test = fs.readFileSync('test.txt', 'utf8').replace(/\r/g, '');
const rawScanners = test.split(/\n*--- scanner \d+ ---\n*/g).slice(1);
// console.log(scanners[0]);

const scanners = rawScanners.map((val)=>val.split('\n').map(val=>val.split(',').map(val=>parseInt(val))));
// console.log(scanners[0]);

const debug = false;

// const diff = [];
const same = [];

function rotate2d(a, b, c) {
    return [
        [ a,  b,  c],
        [ a, -c,  b],
        [ a, -b, -c],
        [ a,  c, -b],
        // [ a,  c,  b],
        // [ a, -b,  c],
        // [ a, -c, -b],
        // [ a,  b, -c],
    ]
}

function nrotate2d(a, b, c) {
    return [
        [ a, -b,  c],
        [ a,  c,  b],
        [ a,  b, -c],
        [ a, -c, -b],
    ]
}

function rotate(b, r) {
    const [x, y, z] = b;
    const arr = [
        ...rotate2d(x, y, z),
        ...nrotate2d(-x, y, z),
        ...rotate2d(y, z, x),
        ...nrotate2d(-y, z, x),
        ...rotate2d(z, x, y),
        ...nrotate2d(-z, x, y),
    ]
    return arr[r];
}

const relative = [];

let k = 0;
for(const scanner of scanners) {
    same.push([])
    const diff = [];
    const diffId = [];
    for(let i = 0; i<scanner.length; i++) {
        for(let j = i+1; j<scanner.length; j++) {
            const [x1, y1, z1] = scanner[i];
            const [x2, y2, z2] = scanner[j];
            diff.push((x1-x2)+","+(y1-y2)+","+(z1-z2));
            diffId.push([i, j]);
        }
    }
    for(let l = k+1; l<scanners.length; l++) {
        const oscanner = scanners[l];
        for(let m = 0; m<24; m++) {
            const tempSame = [];
            let relSame = 0;
            for(let i = 0; i<oscanner.length; i++) {
                const [x1, y1, z1] = rotate(oscanner[i], m);
                for(let j = i+1; j<oscanner.length; j++) {
                    const [x2, y2, z2] = rotate(oscanner[j], m);
                    //compare generated diff with diff array.
                    const hash = (x1-x2)+","+(y1-y2)+","+(z1-z2);
                    if(diff.indexOf(hash) != -1) {
                        console.log(relSame);
                        relSame++;
                        tempSame.push(hash);
                    };
                }
            }
            if(relSame >= 12) {
                relative[l] = m;
                same[k].push(...tempSame);
                break;
            }
        }
    }
    k++;
}
console.log(same);
console.log(relative);

// function arrayTest(x, y, z) {
// return [
//     ...rotate2d(x, y, z),
//     ...rotate2d(-x, y, z),
//     ...rotate2d(y, x, z),
//     ...rotate2d(-y, x, z),
//     ...rotate2d(z, y, x),
//     ...rotate2d(-z, y, x),
// ]
// }
// console.log(arrayTest(1,2,3));
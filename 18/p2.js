const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '');
const test = `[[[0,[5,8]],[[1,7],[9,6]]],[[4,[1,2]],[[1,4],2]]]
[[[5,[2,8]],4],[5,[[9,9],0]]]
[6,[[[6,2],[5,6]],[[7,6],[4,7]]]]
[[[6,[0,7]],[0,9]],[4,[9,[9,0]]]]
[[[7,[6,4]],[3,[1,3]]],[[[5,5],1],9]]
[[6,[[7,3],[3,2]]],[[[3,8],[5,7]],4]]
[[[[5,4],[7,7]],8],[[8,3],8]]
[[9,3],[[9,9],[6,[4,9]]]]
[[2,[[7,7],7]],[[5,8],[[9,3],[0,2]]]]
[[[[5,2],5],[8,[3,7]]],[[5,[7,5]],[4,4]]]`;
const numbers = input.split('\n');

const debug = false;

function splitOnce(str) {
    let opened = 0;
    for(let i = 0; i < str.length; i++) {
        if(str[i] == '[') opened++;
        if(str[i] == ']') opened--;
        if(str[i] == ',' && opened == 0) return [str.slice(0, i), str.slice(i+1)];
    }
    console.log("ERROR no split!");
}

function insert(str, start, end, ins) {
    return str.slice(0, start)+ins+str.slice(end);
}

function magnitude(str) {
    if(str-0 >= 0) return str-0;
    const elts = splitOnce(str.slice(1,-1));
    const n1 = magnitude(elts[0]);
    const n2 = magnitude(elts[1]);
    return n1*3+n2*2;
}

function explode(str, idx) {
    const elts = str.slice(idx).replace(/\[(\d+,\d+)\].*/, '$1').split(',');
    let left = idx;
    if(typeof elts[1] == 'undefined') console.log(str, idx);
    let right = idx+elts[0].length+elts[1].length+3;
    for(let i = right; i < str.length-1; i++) {
        if(str[i]-0 >= 0) {
            if(str[i+1]-0 >= 0) str = insert(str, i, i+2, ((str[i]+str[i+1])-0)+(elts[1]-0));
            else str = insert(str, i, i+1, (str[i]-0)+(elts[1]-0));
            break;
        }
    }
    for(let i = left; i > 0; i--) {
        if(str[i]-0 >= 0) {
            if(str[i-1]-0 >= 0) {
                str = insert(str, i-1, i+1, ((str[i-1]+str[i])-0)+(elts[0]-0));
                // left++;
                // right++;
            } else {
                if((str[i]-0)+(elts[0]-0) >= 10) {
                    left++;
                    right++;
                }
                str = insert(str, i, i+1, (str[i]-0)+(elts[0]-0));
            }
            break;
        }
    }
    return insert(str, left, right, '0');
}

function split(str, idx) {
    let num = str[idx]+str[idx+1];
    num = num-0;
    return insert(str, idx, idx+2, concat(Math.floor(num/2), Math.ceil(num/2)));
}

function add(str) {
    let finished = false;
    if(debug) console.log(str, 'start');
    while(!finished) {
        let either = false;
        let done = false;
        while(!done) {
            let opened = 0;
            for(let i = 0; i < str.length; i++) {
                if(str[i] == '[') {
                    opened++;
                    if(opened == 5) {
                        str = explode(str, i);
                        either = true;
                        if(debug) console.log(str, 'explode', i);
                        break;
                    }
                } else if(str[i] == ']') opened--;
                if (i==str.length-1) done = true;
            }
        }
        for(let i = 0; i < str.length; i++) {
            if(str[i]-0 >= 0 && str[i+1]-0 >= 0) {
                str = split(str, i);
                either = true;
                if(debug) console.log(str, 'split', i);
                break;
            }
        }
        if(!either) break;
    }
    if(debug) console.log(str, 'end');
    return str;
}

function concat(a, b) {
    return `[${a},${b}]`;
}

function largestSum(nums) {
    let largest = 0;
    for(let i=0; i<nums.length; i++) {
        for(let j=0; j<nums.length; j++) {
            if(j==i) continue;
            const res = add(concat(nums[i], nums[j]));
            const mag = magnitude(res);
            if(mag > largest) largest = mag;
            // console.log(result);
            console.log(mag, res);
        }
    }
    return largest;
}

console.log(largestSum(numbers));
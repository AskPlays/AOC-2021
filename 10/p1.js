const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const test = `[({(<(())[]>[[{[]{<()<>>
[(()[<>])]({[<{<<[]>>(
{([(<{}[<>[]}>{[]{[(<()>
(((({<>}<{<{<>}{[]{[]{}
[[<[([]))<([[{}[[()]]]
[{[{({}]{}}([{[{{{}}([]
{<[[]]>}<{[{[{[]{()[[[]
[<(<(<(<{}))><([]([]()
<{([([[(<>()){}]>(<<{{
<{([{{}}[<[[[<>{}]]]>[]]`;
const lines = input.split('\r\n');
const stack = [];

let total = 0;
for(let i = 0; i < lines.length; i++) {
    for(let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        if("([{<".indexOf(char) != -1) {
            stack.push(char);
            continue;
        } else if(")]}>".indexOf(char) != -1) {
            const open = stack.pop();
            if("([{<".indexOf(open) == ")]}>".indexOf(char)) continue;
            else total += ([3, 57, 1197, 25137])[")]}>".indexOf(char)];
        }
        //total += 1+(board[i][j]-0);
    }
}

console.log(total);
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

let scores = [];
for(let i = 0; i < lines.length; i++) {
    let failed = false;
    const stackF = [];
    for(let j = 0; j < lines[i].length; j++) {
        const char = lines[i][j];
        if("([{<".indexOf(char) != -1) {
            stackF.push(char);
            continue;
        } else if(")]}>".indexOf(char) != -1) {
            const open = stackF.pop();
            if("([{<".indexOf(open) == ")]}>".indexOf(char)) continue;
            else failed = true;
        }
    }
    if(!failed) {
        let brackets = "";
        for(let j = 0; j < lines[i].length; j++) {
            const char = lines[i][j];
            if("([{<)]}>".indexOf(char) == -1) continue;
            if("([{<".indexOf(char) != -1) {
                brackets = char + brackets;
                continue;
            } else if(")]}>".indexOf(char) != -1) {
                brackets = brackets.replace(("([{<")[")]}>".indexOf(char)], "");
            }
        }
        let rem = brackets.replace(/\(/g, ")")
        .replace(/\[/g, "]")
        .replace(/\{/g, "}")
        .replace(/\</g, ">");
        let total = 0;
        for(let j = 0; j < rem.length; j++) {
            const char = rem[j];
            if(")]}>".indexOf(char) != -1) {
                total *= 5;
                total += ([1, 2, 3, 4])[")]}>".indexOf(char)];
            }
        }
        scores.push(total);
    }
    
}

scores.sort((a, b) => a-b);

console.log(scores[Math.floor(scores.length/2)]);

const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8');
const test = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`;
const lines = input.split('\r\n');
const nodes = {};

class Node {
    constructor(id) {
        this.id = id;
        this.paths = [];
    }
}

function search(path, node) {
    if(node.id == "end") { 
        paths++; 
        return;
    }
    if(node.id == node.id.toLowerCase() && path.indexOf(node.id) != -1) return;
    for(let i = 0; i < node.paths.length; i++) {
        search(path+","+node.id, node.paths[i]);
    }
}

let paths = 0;
for(let i = 0; i < lines.length; i++) {
    let ends = lines[i].split('-');
    if(!nodes[ends[0]]) nodes[ends[0]] = new Node(ends[0]);
    if(!nodes[ends[1]]) nodes[ends[1]] = new Node(ends[1]);
    nodes[ends[0]].paths.push(nodes[ends[1]]);
    nodes[ends[1]].paths.push(nodes[ends[0]]);
}
console.log(nodes);
search("", nodes["start"]);

console.log(paths);
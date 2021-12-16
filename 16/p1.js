const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '');
const test = `A0016C880162017C3686B18A3D4780`;
const hexData = input;
let bitData = "";
hexData.split('').forEach(str => {bitData += hex2bin(str)});

// console.log(bitData);

let totalV = 0;
let packets = [];

function hex2bin(hex){
    return (parseInt(hex, 16).toString(2)).padStart(4, '0');;
}

function parsePacket(packet, first=false) {
    // console.log(packet);
    let offset = 0;
    let bits = packet;
    if(first) {
        while(bits.length%4 != 0) {
            bits = '0'+bits;
        }
    }
    // console.log(bits);
    const V = parseInt(bits.substr(0, 3), 2);
    totalV += V; // part 1
    bits = bits.substr(3);
    const T = parseInt(bits.substr(0, 3), 2);
    bits = bits.substr(3);
    offset += 6;
    packets.push({V, T});
    if(T == 4) { // literal
        let literal = "";
        while(true) {
            if(bits[0] == '1') {
                literal += bits.substr(1, 4);
                bits = bits.substr(5);
                offset += 5;
            }
            if(bits[0] == '0') {
                literal += bits.substr(1, 4);
                bits = bits.substr(5);
                offset += 5;
                break;
            }
        }
        // console.log(literal, parseInt(literal, 2));
        return offset;
        
    } else { // operator
        const L = parseInt(bits.substr(0, 1), 2);
        bits = bits.substr(1);
        offset += 1;
        if(L == 0) {
            const len = parseInt(bits.substr(0, 15), 2);
            bits = bits.substr(15);
            offset += 15;
            let subPacketOffset = 0;
            while (subPacketOffset < len) {
                subPacketOffset += parsePacket(bits.substr(subPacketOffset));
            }
            offset += subPacketOffset
        } else {
            const len = parseInt(bits.substr(0, 11), 2);
            bits = bits.substr(11);
            offset += 11;
            let subPacketOffset = 0;
            let i = 0;
            while (i < len) {
                subPacketOffset += parsePacket(bits.substr(subPacketOffset));
                //console.log(offset);
                i++;
            }
            offset += subPacketOffset
        }
        return offset;
    }
}

console.log(parsePacket(bitData, true), totalV);
// console.log(packets);
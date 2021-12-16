const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf8').replace(/\r/g, '');
const test = `9C0141080250320F1802104A08`;
const hexData = input;
let bitData = "";
hexData.split('').forEach(str => {bitData += hex2bin(str)});

// console.log(bitData);

let packets = [];

function hex2bin(hex){
    return (parseInt(hex, 16).toString(2)).padStart(4, '0');;
}

function parseValue(values, type) {
    if(type === 0) {
        return values.reduce((a, b) => a + b, 0);
    } else if(type === 1) {
        return values.reduce((a, b) => a * b, 1);
    } else if(type === 2) {
        return values.reduce((a, b) => Math.min(a,b), values[0]);
    } else if(type === 3) {
        return values.reduce((a, b) => Math.max(a,b), values[0]);
    } else if(type === 5) {
        return +(values[0] > values[1]);
    } else if(type === 6) {
        return +(values[0] < values[1]);
    } else if(type === 7) {
        return +(values[0] == values[1]);
    } 
    
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
    bits = bits.substr(3);
    const T = parseInt(bits.substr(0, 3), 2);
    bits = bits.substr(3);
    offset += 6;
    packets.push({V, T});
    if(T == 4) { // literal
        let value = "";
        while(true) {
            if(bits[0] == '1') {
                value += bits.substr(1, 4);
                bits = bits.substr(5);
                offset += 5;
            }
            if(bits[0] == '0') {
                value += bits.substr(1, 4);
                bits = bits.substr(5);
                offset += 5;
                break;
            }
        }
        // console.log(value, parseInt(value, 2));
        return {offset, value: parseInt(value, 2)};
        
    } else { // operator
        const L = parseInt(bits.substr(0, 1), 2);
        bits = bits.substr(1);
        offset += 1;
        let values = [];
        if(L == 0) {
            const len = parseInt(bits.substr(0, 15), 2);
            bits = bits.substr(15);
            offset += 15;
            let subPacketOffset = 0;
            while (subPacketOffset < len) {
                const res = parsePacket(bits.substr(subPacketOffset));
                subPacketOffset += res.offset;
                values.push(res.value);
            }
            offset += subPacketOffset
        } else {
            const len = parseInt(bits.substr(0, 11), 2);
            bits = bits.substr(11);
            offset += 11;
            let subPacketOffset = 0;
            let i = 0;
            while (i < len) {
                const res = parsePacket(bits.substr(subPacketOffset));
                subPacketOffset += res.offset;
                values.push(res.value);
                i++;
            }
            offset += subPacketOffset
        }
        return {offset, value: parseValue(values, T)};
    }
}

console.log(parsePacket(bitData, true));
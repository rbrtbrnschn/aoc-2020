import rawInput from "./input";
const input = rawInput.map((numStr) => parseInt(numStr));
import { isTesting } from "./input";

const log = (...params: any) => isTesting ? console.log(...params) : null;
const table = (...params: any) => isTesting ? console.table(...params) : null;

let pointer = isTesting ? 14 : 557;

function getPreambles(pointer: number) {
    const preambleRange = isTesting ? 5 : 25;
    if (pointer - preambleRange < 0) pointer = preambleRange;

    const preambleStart = pointer - preambleRange;
    const preambleEnd = pointer;
    const preambles = input.slice(preambleStart, preambleEnd);
    // table({ preambleRange, preambleStart, preambleEnd })
    return preambles;
}

function isSum(pointer: number, _x: number = 0) {
    const [x, y] = [_x, pointer];
    const range = input.slice(x, y);
    let desiredRange: Array<number> = [];
    let index = x;
    let _isSum = false;

    const reduced = range.reduce((prev, acc) => {
        const sum = prev + acc;
        const __isSum = sum === input[pointer];
        if (__isSum) {
            _isSum = true;
            desiredRange = [x, index];
        };
        index++;
        return sum;
    })
    if (_isSum) console.log(desiredRange)
    return true;
}

for (let i = 0; i < pointer; i++) {
    isSum(pointer, i);
}
console.log(input[444] + input[459]) 
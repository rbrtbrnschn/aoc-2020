import rawInput from "./input";
const input = rawInput.map((numStr) => parseInt(numStr));
import { isTesting } from "./input";

const log = (...params: any) => isTesting ? console.log(...params) : null;
const table = (...params: any) => isTesting ? console.table(...params) : null;

let pointer = isTesting ? 5 : 25;

function getPreambles(pointer: number) {
    const preambleRange = isTesting ? 5 : 25;
    if (pointer - preambleRange < 0) pointer = preambleRange;

    const preambleStart = pointer - preambleRange;
    const preambleEnd = pointer;
    const preambles = input.slice(preambleStart, preambleEnd);
    // table({ preambleRange, preambleStart, preambleEnd })
    return preambles;
}

function isSum(pointer: number) {
    const num = input[pointer];
    const preambles = getPreambles(pointer);
    let _isSum = false;
    preambles.forEach((first) => {
        if (_isSum) return;
        preambles.forEach((second) => {
            if (first === second) return;
            if (first + second === num) {
                _isSum = true;
                return
            }
        })
    })
    return _isSum;
}

for (let i = pointer; i < input.length; i++) {
    const _isSum = isSum(pointer);
    if (!_isSum && pointer !== input.length - 1) console.log(input[pointer], pointer);
    pointer++;
}
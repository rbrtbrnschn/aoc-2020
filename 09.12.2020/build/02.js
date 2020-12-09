"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const input = input_1.default.map((numStr) => parseInt(numStr));
const input_2 = require("./input");
const log = (...params) => input_2.isTesting ? console.log(...params) : null;
const table = (...params) => input_2.isTesting ? console.table(...params) : null;
let pointer = input_2.isTesting ? 14 : 557;
function getPreambles(pointer) {
    const preambleRange = input_2.isTesting ? 5 : 25;
    if (pointer - preambleRange < 0)
        pointer = preambleRange;
    const preambleStart = pointer - preambleRange;
    const preambleEnd = pointer;
    const preambles = input.slice(preambleStart, preambleEnd);
    return preambles;
}
function isSum(pointer, _x = 0) {
    const [x, y] = [_x, pointer];
    const range = input.slice(x, y);
    let desiredRange = [];
    let index = x;
    let _isSum = false;
    const reduced = range.reduce((prev, acc) => {
        const sum = prev + acc;
        const __isSum = sum === input[pointer];
        if (__isSum) {
            _isSum = true;
            desiredRange = [x, index];
        }
        ;
        index++;
        return sum;
    });
    if (_isSum)
        console.log(desiredRange);
    return true;
}
for (let i = 0; i < pointer; i++) {
    isSum(pointer, i);
}
console.log(input[444] + input[459]);

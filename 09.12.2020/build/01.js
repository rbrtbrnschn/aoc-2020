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
let pointer = input_2.isTesting ? 5 : 25;
function getPreambles(pointer) {
    const preambleRange = input_2.isTesting ? 5 : 25;
    if (pointer - preambleRange < 0)
        pointer = preambleRange;
    const preambleStart = pointer - preambleRange;
    const preambleEnd = pointer;
    const preambles = input.slice(preambleStart, preambleEnd);
    return preambles;
}
function isSum(pointer) {
    const num = input[pointer];
    const preambles = getPreambles(pointer);
    let _isSum = false;
    preambles.forEach((first) => {
        if (_isSum)
            return;
        preambles.forEach((second) => {
            if (first === second)
                return;
            if (first + second === num) {
                _isSum = true;
                return;
            }
        });
    });
    return _isSum;
}
for (let i = pointer; i < input.length; i++) {
    const _isSum = isSum(pointer);
    if (!_isSum && pointer !== input.length - 1)
        console.log(input[pointer], pointer);
    pointer++;
}

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
    range.reduce((prev, acc) => {
        index++;
        const sum = prev + acc;
        const __isSum = sum === input[pointer];
        if (__isSum) {
            _isSum = true;
            desiredRange = [x, index];
        }
        ;
        return sum;
    });
    return desiredRange;
}
for (let i = 0; i < pointer; i++) {
    const range = isSum(pointer, i);
    if (range.length) {
        console.log(range);
        let map = [];
        for (let i = range[0]; i <= range[1]; i++) {
            if (i === 444 || i === 460)
                console.log(`${i}: ${input[i]}`);
            map.push(input[i]);
        }
        const lowest = map.reduce((prev, acc) => acc < prev ? acc : prev);
        const highest = map.reduce((prev, acc) => acc > prev ? acc : prev);
        console.log("highest:", highest);
        console.log("lowest:", lowest);
        console.log("sum of low and high:", lowest + highest);
        console.log("adding up each element of map:", map.reduce((prev, acc) => prev + acc));
        console.log("validating against:", input[pointer]);
    }
}

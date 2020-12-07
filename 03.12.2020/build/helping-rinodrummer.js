"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
function partOne() {
    const input = input_1.default;
    let trees = 0;
    let offset = 0;
    for (let line of input) {
        if (offset > line.length) {
            offset = Math.abs(offset % line.length);
        }
        console.table({ line, offset, char: line[offset] });
        if (line[offset] === '#') {
            trees++;
        }
        offset += 3;
    }
    return trees;
}
const trees = partOne();
console.log(trees);

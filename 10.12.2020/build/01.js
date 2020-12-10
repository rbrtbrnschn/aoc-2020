"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const input = input_1.default.map((e) => parseInt(e));
let ojd = 1;
let tjd = 1;
const lowestFrom = (array) => array.sort((a, b) => a - b)[0];
const differences = (num1, num2) => Math.abs(num1 - num2) === 3 ? tjd++ : Math.abs(num1 - num2) === 1 ? ojd++ : 0;
const filtered = input.sort((a, b) => a - b);
filtered.reduce((prev, acc) => {
    differences(prev, acc);
    console.log(prev, acc);
    return acc;
});
console.table({ ojd, tjd, res: ojd * tjd });

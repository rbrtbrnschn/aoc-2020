"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
let currentLine = 0;
let accumulator = 0;
let history = [];
const nop = () => null;
const jmp = (num) => currentLine += num - 1;
const acc = (num) => accumulator += num;
const sln = () => history.push(currentLine);
while (!history.includes(currentLine)) {
    const line = input_1.default[currentLine];
    const [cmd, args] = line.split(" ");
    const _args = parseInt(args);
    console.log(cmd, args, accumulator);
    switch (cmd) {
        case "nop":
            nop();
            break;
        case "jmp":
            jmp(_args);
            break;
        case "acc":
            acc(_args);
            break;
        default:
            throw new Error("unhandled operation");
    }
    sln();
    currentLine++;
}
console.log(accumulator);

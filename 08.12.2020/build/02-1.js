"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const copyRawInput = [...input_1.default];
const isDebugging = false;
let currentLine = 0;
let accumulator = 0;
let history = [];
let changes = [];
let lastChangedIndex = 0;
const nop = () => null;
const jmp = (num) => currentLine += num - 1;
const acc = (num) => accumulator += num;
const sln = () => history.push(currentLine);
const log = (...params) => isDebugging ? console.log(...params) : null;
const rst = () => {
    currentLine = 0;
    accumulator = 0;
    history = [];
};
function run(input = input_1.default) {
    const reachedBottom = currentLine >= input.length;
    while (!reachedBottom) {
        log("[CWL]:", currentLine);
        if (currentLine >= input.length) {
            log("[FINISHED]");
            break;
        }
        const reIteration = history.includes(currentLine);
        if (reIteration) {
            console.log("[REITERATION]:", currentLine);
            const formerChanges = changes.length > 1;
            if (formerChanges) {
                undoLastChange(input);
            }
            swapLastLine(input);
            rst();
            if (changes.length > 50)
                break;
            log(`Running #${changes.length}`);
            continue;
        }
        const line = input[currentLine];
        const [cmd, args] = line.split(" ");
        const _args = parseInt(args);
        sln();
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
        }
        currentLine++;
    }
}
function swapLastLine(input) {
    const lastLineIndex = history[history.length - 1];
    const lastLine = input[lastLineIndex];
    const [cmd, args] = lastLine.split(" ");
    let swappedLine = `${cmd} ${args}`;
    switch (cmd) {
        case "nop":
            swappedLine = `jmp ${args}`;
            break;
        case "jmp":
            swappedLine = `nop ${args}`;
            break;
        default:
            delete history[history.length - 1];
            history = history.filter((h) => h !== null);
            swapLastLine(input);
            break;
    }
    input[lastLineIndex] = swappedLine;
    lastChangedIndex = lastLineIndex;
    changes.push(lastLineIndex);
}
function undoLastChange(input) {
    const lastLineIndex = lastChangedIndex;
    const lastLine = input[lastLineIndex];
    const [cmd, args] = lastLine.split(" ");
    let swappedLine = `${cmd} ${args}`;
    switch (cmd) {
        case "nop":
            swappedLine = `jmp ${args}`;
            break;
        case "jmp":
            swappedLine = `nop ${args}`;
            break;
        default:
            break;
    }
    input[lastLineIndex] = swappedLine;
}
run(input_1.default);
console.log(accumulator);

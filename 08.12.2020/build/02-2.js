"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
let accumulator = 0;
let line = 0;
let previousLines = [];
let changedIndex = 0;
const jmp = (args) => line += args - 1;
const nop = (...params) => null;
const acc = (args) => accumulator += args;
const rst = () => { accumulator = 0; line = 0; previousLines = []; };
function testMap(map) {
    let isTrue = true;
    while (true) {
        try {
            if (line in previousLines)
                throw new Error("reiteration started");
            if (line === map.length)
                break;
            const [cmd, args] = map[line].split(" ");
            handleCmd(cmd, args, accumulator, line, previousLines);
            line++;
            previousLines.push(line);
        }
        catch (err) {
            isTrue = false;
            break;
        }
    }
    return isTrue;
}
function handleCmd(cmd, args, _acc, line, previousLines) {
    const parsedArgs = parseInt(args);
    switch (cmd) {
        case "jmp":
            jmp(parsedArgs);
            break;
        case "acc":
            acc(parsedArgs);
            break;
        case "nop":
            nop(parsedArgs);
            break;
        default:
            throw new Error(`Unknown Command: ${cmd} ${args}`);
    }
}
function createMap(defaultMap) {
    const newMap = [...defaultMap];
    newMap[changedIndex] = swapCommand(defaultMap);
    return newMap;
}
function swapCommand(map) {
    const line = map[changedIndex];
    const [cmd, args] = line.split(" ");
    let newCmd;
    switch (cmd) {
        case "jmp":
            newCmd = "nop";
            break;
        case "nop":
            newCmd = "jmp";
            break;
        case "acc":
            return `${cmd} ${args}`;
        default:
            throw new Error(`swapCommand, wrong cmd: ${cmd}`);
    }
    return `${newCmd} ${args}`;
}
for (let i = 0; i < input_1.default.length; i++) {
    const map = createMap(input_1.default);
    changedIndex++;
    const isProperMap = testMap(map);
    if (isProperMap) {
        console.log(accumulator);
        break;
    }
    rst();
}

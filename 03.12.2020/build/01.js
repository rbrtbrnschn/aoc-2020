"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const mapLength = input_1.default.length;
let timer = 0;
let currentPosition = [0, 0];
function addMap(prevInput, rawInput) {
    return prevInput.map((line, index) => line + rawInput[index]);
}
function handleTreeOrNoTree(char) {
    switch (char) {
        case "#":
            return "X";
        case ".":
            return "O";
        default:
            break;
    }
}
function parseMapForTrees(map) {
    let trees = 0;
    const field = map.map((line) => line.split(""));
    field.forEach((line) => {
        if (line.includes("X"))
            trees++;
    });
    return trees;
}
function followSlope(map, changedPostion = null) {
    timer++;
    const [x, y] = changedPostion || currentPosition;
    const vertical = 3;
    const horizontal = 1;
    const newX = x + vertical;
    const newY = y + horizontal;
    currentPosition = [newX, newY];
    let field;
    field = map.map((line) => line.split(""));
    if (timer === Math.floor(mapLength * 1.5)) {
        return field.map((line) => line.join(""));
    }
    try {
        const charAtCoords = field[newY][newX];
        if (!charAtCoords)
            throw new Error("new position out of bounds horizontally");
        field[newY][newX] = handleTreeOrNoTree(charAtCoords);
        return followSlope(field.map((line) => line.join("")));
    }
    catch (err) {
        if (field.length === mapLength - 1)
            return field.map((line) => line.join(""));
        return followSlope(addMap(map, input_1.default), [x, y]);
    }
}
const field = addMap(input_1.default, input_1.default);
const endMap = followSlope(field);
const trees = parseMapForTrees(endMap);
console.log(endMap);
console.log(trees);

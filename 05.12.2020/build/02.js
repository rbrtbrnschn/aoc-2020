"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
function splitIntoCategories(str) {
    const rowString = str.substr(0, 7);
    const columnString = str.slice(7, str.length);
    return [rowString, columnString];
}
function parseRowString(str) {
    const max = 127;
    let temp = [0, max];
    str.split("").forEach((char) => {
        const diff = temp[1] - temp[0];
        switch (char) {
            case "F":
                temp = [temp[0], Math.floor(temp[1] - diff / 2)];
                break;
            case "B":
                temp = [Math.floor(temp[0] + diff / 2), temp[1]];
                break;
            default:
                break;
        }
    });
    return temp[1];
}
function parseColumnString(str) {
    const max = 7;
    let temp = [0, max];
    str.split("").forEach((char) => {
        const diff = temp[1] - temp[0];
        switch (char) {
            case "L":
                temp = [temp[0], Math.floor(temp[1] - diff / 2)];
                break;
            case "R":
                temp = [Math.floor(temp[0] + diff / 2), temp[1]];
                break;
            default:
                break;
        }
    });
    return temp[1];
}
function computeSeatId(row, column) {
    return row * 8 + column;
}
;
const ids = input_1.default.map((seatNum) => {
    const [rowStr, columnStr] = splitIntoCategories(seatNum);
    const rowNum = parseRowString(rowStr);
    const columnNum = parseColumnString(columnStr);
    const id = computeSeatId(rowNum, columnNum);
    return id;
});
const filtered = ids.filter((id) => {
    if (id < 50)
        return false;
    if (id > 900)
        return false;
    const prior = id - 1;
    const post = id + 1;
    if (!ids.includes(prior))
        return true;
    if (!ids.includes(post))
        return true;
    return false;
});
console.log(((filtered[1] - filtered[0]) / 2 + filtered[0]));

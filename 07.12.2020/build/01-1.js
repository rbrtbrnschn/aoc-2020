"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const input = input_1.default.split("\n");
const query = "shiny gold bag";
const splitIntoKiwiPairs = input.map((line, index) => line.split(" contain "));
const splitIntoMultipleElements = splitIntoKiwiPairs.map((v, k) => {
    const split = v[1].split(", ");
    return [v[0], ...split];
});
const formattedInput = splitIntoMultipleElements.map((line, index) => line.map((val, index) => {
    let spliceEnd = val.length;
    if (val[val.length - 1] === ".")
        spliceEnd--;
    return !isNaN(parseInt(val[0])) ? val.slice(2, spliceEnd)
        : val[val.length - 1] === "." ? val.slice(0, spliceEnd)
            : val;
}));
function findKeys(_input = formattedInput, _query = query) {
    return _input.filter((val) => val.find((e, i) => e.includes(_query) && i !== 0)).map((e) => e[0]);
}
function findIndex(_input = formattedInput, key) {
    return _input.findIndex((val, i) => val[0].includes(key));
}
const baseKeys = findKeys();
console.log(findIndex(formattedInput, "bright white bags"));

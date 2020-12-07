"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const bagReg = /\bbag\b/;
const perLine = input_1.default.split("\n");
const minusPoint = perLine.map((value, index) => value.slice(0, value.length - 1));
const replacedBag = minusPoint.map((value, index) => {
    return value.replace(new RegExp(bagReg, "gm"), "bags");
});
const kvPairs = replacedBag.map((value, index) => value.split(" contain "));
const vPairs = kvPairs.map((value, index) => value.join(", ").split(", "));
function writeMap(input) {
    const map = new Map();
    input.forEach((value, index) => {
        let temp = {};
        value.forEach((value, index) => {
            if (index === 0)
                return;
            let num = parseInt(value);
            const isNum = !isNaN(num);
            if (!isNum)
                num = 0;
            const sliceStart = num === 0 ? 0 : num.toString().length;
            const text = value.slice(sliceStart, value.length).trim();
            temp[text] = num;
        });
        map.set(value.shift(), temp);
    });
    return map;
}
const map = writeMap(vPairs);
const baggageClaim = ["shiny gold bags"];
let prev = 1;
function llooper(map, bagType) {
    const mainBag = map.get(bagType);
    Object.entries(mainBag).forEach(([key, amount], k) => {
        if (amount === 0)
            return;
        baggageClaim.push(key);
        llooper(map, key);
    });
}
llooper(map, "shiny gold bags");
let newArr = 1;
let total = 0;
const all = baggageClaim.map((value, index) => {
    const bag = map.get(value);
    const entries = Object.entries(bag);
    entries.forEach(([key, amount], index) => {
        total += newArr * amount;
        newArr = newArr * amount;
    });
});
console.log(total);

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
function llooper(map, bagType) {
    const mainBag = map.get(bagType);
    Object.entries(mainBag).forEach(([key, amount], k) => {
        if (amount === 0)
            return;
        baggageClaim.push(key);
        llooper(map, key);
    });
}
const map = writeMap(vPairs);
const baggageClaim = ["shiny gold bags"];
llooper(map, "shiny gold bags");
const baggageClaim3 = ["shiny gold bags"];
let total3 = 0;
console.log(map);
while (baggageClaim3.length) {
    const bag = baggageClaim3.shift();
    total3++;
    const subBags = map.get(bag);
    if (!subBags)
        continue;
    Object.entries(subBags).forEach(([key, amount]) => {
        for (let i = 0; i < amount; i++) {
            baggageClaim3.push(key);
        }
    });
}
console.log(total3);

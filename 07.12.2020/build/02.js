"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const splitInput = input_1.default.split("\n").map((line) => line.split(" contain "));
let history = [];
function createEnum(input) {
    let dict = {};
    input.forEach((line) => {
        const key = line[0];
        let temp = {};
        line[1].split(", ").forEach((entry) => {
            const num = parseInt(entry[0]);
            if (isNaN(num))
                return temp;
            let bagType = entry.slice(2, entry.length);
            const expression = bagType[bagType.length - 1] == ".";
            if (expression)
                bagType = bagType.slice(0, bagType.length - 1);
            if (bagType[bagType.length - 1] === "g")
                bagType += "s";
            temp[bagType] = num;
        });
        dict[key] = temp;
    });
    return dict;
}
const dict = createEnum(splitInput);
function getBagsNeededForBagType(type = "shiny gold bags") {
    if (type === undefined || type === null || !type) {
        console.log(type);
        throw new Error("Misspelled getBagsNeededForBagType @RequestParam type: string");
    }
    const mostOutterBag = dict[type];
    let history = [];
    let currentAmmount = 1;
    sub(mostOutterBag);
    function sub(mostOutterBag) {
        const subEntries = Object.entries(mostOutterBag);
        if (!subEntries.length)
            return;
        subEntries.forEach(([key, amount], k) => {
            const subKey = dict[key];
            currentAmmount = (currentAmmount) * amount;
            if (!key)
                return;
            else
                sub(subKey);
        });
    }
    return currentAmmount;
}
console.log(dict);
console.log(getBagsNeededForBagType());

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const splitInput = input_1.default.split("\n").map((line) => line.split(" contain "));
function createEnum(input) {
    let dict = new Map();
    input.forEach((line) => {
        const key = line[0];
        const val = line[1].split(", ").map((entry) => {
            const expression = entry[entry.length - 1] == ".";
            if (expression)
                return entry.slice(0, entry.length - 1);
            return entry;
        });
        dict.set(key, val);
    });
    return dict;
}
function findKeys(bag, dict = createEnum(splitInput)) {
    let keys = [];
    dict.forEach((val, key) => {
        val.forEach((v, k) => {
            if (v.includes(bag))
                keys.push(key);
        });
    });
    return keys;
}
function tbd(keys) {
    let newKeys = [];
    keys.forEach((value, index) => {
        const _keys = findKeys(value);
        newKeys.push(..._keys);
    });
    return newKeys;
}
function removeDuplicates(arr) {
    const set = new Set(arr);
    return [...set];
}
function run(input) {
    const dict = createEnum(input);
    const baseKeys = findKeys("shiny gold bag", dict);
    const subKeys = tbd(baseKeys);
    const noDuplicateSubKeys = removeDuplicates(subKeys);
    const subSubKeys = tbd(noDuplicateSubKeys);
    const noDuplicateSubSubKeys = removeDuplicates(subSubKeys);
    const subSubSubKeys = tbd(noDuplicateSubSubKeys);
    const noDuplicateSubSubSubKeys = removeDuplicates(subSubSubKeys);
    const subSubSubSubKeys = tbd(noDuplicateSubSubSubKeys);
    const noDuplicateSubSubSubSubKeys = removeDuplicates(subSubSubSubKeys);
    const subSubSubSubSubKeys = tbd(noDuplicateSubSubSubSubKeys);
    const noDuplicateSubSubSubSubSubKeys = removeDuplicates(subSubSubSubSubKeys);
    const subSubSubSubSubSubKeys = tbd(noDuplicateSubSubSubSubSubKeys);
    const noDuplicateSubSubSubSubSubSubKeys = removeDuplicates(subSubSubSubSubSubKeys);
    const subSubSubSubSubSubSubKeys = tbd(noDuplicateSubSubSubSubSubSubKeys);
    const noDuplicateSubSubSubSubSubSubSubKeys = removeDuplicates(subSubSubSubSubSubSubKeys);
    const subSubSubSubSubSubSubSubKeys = tbd(noDuplicateSubSubSubSubSubSubSubKeys);
    const noDuplicateSubSubSubSubSubSubSubSubKeys = removeDuplicates(subSubSubSubSubSubSubSubKeys);
    const keysThatContainShinyGoldBagsAtSomePoint = [...noDuplicateSubSubSubSubSubSubSubSubKeys,
        ...noDuplicateSubSubSubSubSubSubSubKeys,
        ...noDuplicateSubSubSubSubSubSubKeys,
        ...noDuplicateSubSubSubSubSubKeys,
        ...noDuplicateSubSubSubSubKeys,
        ...noDuplicateSubSubSubKeys,
        ...noDuplicateSubSubKeys,
        ...noDuplicateSubKeys,
        ...baseKeys,
    ];
    return keysThatContainShinyGoldBagsAtSomePoint;
}
const keysThatContainShinyGoldBagsAtSomePoint = run(splitInput);
const dict = createEnum(splitInput);
console.log(dict);

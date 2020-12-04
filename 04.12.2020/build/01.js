"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const input = input_1.default.split("\n\n");
function splitPassports(passport) {
    const splitByNewLine = passport.split("\n");
    const splitBySpaceToo = splitByNewLine.join(" ").split(" ");
    return splitBySpaceToo;
}
function validatePassport(passport) {
    const completePassport = passport.length === 8;
    const missingOne = passport.length === 7;
    const hasCid = passport.map((e) => /cid/.test(e)).some((e) => e);
    const missingOptional = missingOne && !hasCid;
    return completePassport || missingOptional;
}
const o1 = splitPassports(input[3]);
const ret = validatePassport(o1);
const arrOfValidPassports = input.map((e) => {
    const passport = splitPassports(e);
    const isValid = validatePassport(passport);
    return isValid;
});
const amountOfValidPassports = arrOfValidPassports.filter((boo) => boo).length;
console.log(amountOfValidPassports);

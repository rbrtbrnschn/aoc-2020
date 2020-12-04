"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const input = input_1.default.split("\n\n");
class PassportScanner {
    constructor(input) {
        this.rawInput = input;
        this._validation = [];
    }
    get validation() {
        return this._validation;
    }
    set setValidation(validators) {
        this._validation = validators;
    }
    parse(passport) {
        let obj = {};
        const split = passport.split("\n").join(" ").split(" ");
        split.forEach((line) => {
            const splitLine = line.split(":");
            obj[splitLine[0]] = splitLine[1];
        });
        return obj;
    }
    validate(passport) {
        try {
            const validationArray = this.validation.map((val) => val(passport));
            return validationArray.every((e) => e);
        }
        catch (err) {
            return false;
        }
    }
}
const validators = [
    (passportObject) => Object.keys(passportObject).length === 8 || !Object.keys(passportObject).includes("cid") && Object.keys(passportObject).length === 7,
    (passportObject) => parseInt(passportObject["byr"]) >= 1920 && parseInt(passportObject["byr"]) <= 2002,
    (passportObject) => parseInt(passportObject["iyr"]) >= 2010 && parseInt(passportObject["iyr"]) <= 2020,
    (passportObject) => parseInt(passportObject["eyr"]) >= 2020 && parseInt(passportObject["eyr"]) <= 2030,
    (passportObject) => /[0-9A-Fa-f]{6}/g.test(passportObject["hcl"].slice(1, passportObject["hcl"].length)),
    (passportObject) => /^(amb|blu|brn|gry|grn|hzl|oth$)/gm.test(passportObject["ecl"]),
    (passportObject) => /\b(?=\w)\d{9}$/.test(passportObject["pid"]),
    (passportObject) => {
        const num = parseInt(passportObject["hgt"]);
        const unit = passportObject["hgt"].slice(('' + num).length);
        if (!unit.length)
            return false;
        if (unit === "cm") {
            return num >= 150 && num <= 193;
        }
        else {
            return num >= 59 && num <= 76;
        }
    }
];
const Machine = new PassportScanner(input);
Machine.setValidation = validators;
const validPassportArray = input.map((passportString) => {
    const passportObject = Machine.parse(passportString);
    return Machine.validate(passportObject);
});
const validPassports = validPassportArray.filter((e) => e).length;
console.log(validPassports);

import rawInput from "./input";
const input = rawInput.split("\n\n");

class PassportScanner {
    _validation: any;
    rawInput: Array<string>;

    get validation() {
        return this._validation;
    }
    set setValidation(validators: any) {
        this._validation = validators;
    }
    constructor(input: Array<string>) {
        this.rawInput = input;
        this._validation = [];
    }

    parse(passport: string) {
        let obj: Record<string, string> = {};
        const split = passport.split("\n").join(" ").split(" ");
        split.forEach((line) => {
            const splitLine = line.split(":");
            obj[splitLine[0]] = splitLine[1];
        })
        return obj;
    }

    validate(passport: Record<string, string>): boolean {
        try {
            const validationArray = this.validation.map((val: (pass: Record<string, string>) => boolean) => val(passport))
            return validationArray.every((e: boolean) => e);
        }
        catch (err) {
            return false;
        }
    }

}
const validators = [
    (passportObject: Record<string, string>) => Object.keys(passportObject).length === 8 || !Object.keys(passportObject).includes("cid") && Object.keys(passportObject).length === 7,
    (passportObject: Record<string, string>) => parseInt(passportObject["byr"]) >= 1920 && parseInt(passportObject["byr"]) <= 2002,
    (passportObject: Record<string, string>) => parseInt(passportObject["iyr"]) >= 2010 && parseInt(passportObject["iyr"]) <= 2020,
    (passportObject: Record<string, string>) => parseInt(passportObject["eyr"]) >= 2020 && parseInt(passportObject["eyr"]) <= 2030,
    (passportObject: Record<string, string>) => /[0-9A-Fa-f]{6}/g.test(passportObject["hcl"].slice(1, passportObject["hcl"].length)),
    (passportObject: Record<string, string>) => /^(amb|blu|brn|gry|grn|hzl|oth$)/gm.test(passportObject["ecl"]),
    (passportObject: Record<string, string>) => /\b(?=\w)\d{9}$/.test(passportObject["pid"]),
    (passportObject: Record<string, string>) => {
        const num = parseInt(passportObject["hgt"])
        const unit = passportObject["hgt"].slice(('' + num).length);
        // TODO console log to see if thats proper
        if (!unit.length) return false;

        if (unit === "cm") {
            return num >= 150 && num <= 193;
        } else {
            return num >= 59 && num <= 76;
        }
    }

]

const Machine = new PassportScanner(input);
Machine.setValidation = validators;

const validPassportArray = input.map((passportString) => {
    const passportObject = Machine.parse(passportString)
    return Machine.validate(passportObject);
})

const validPassports = validPassportArray.filter((e) => e).length;
console.log(validPassports);
import rawInput from "./input";
const input = rawInput.split("\n\n");

function splitPassports(passport: string): Array<string> {
    const splitByNewLine = passport.split("\n");
    const splitBySpaceToo = splitByNewLine.join(" ").split(" ");
    return splitBySpaceToo;
}

function validatePassport(passport: Array<string>): boolean {
    const completePassport = passport.length === 8;
    const missingOne = passport.length === 7;
    const hasCid = passport.map((e) => /cid/.test(e)).some((e) => e);
    const missingOptional = missingOne && !hasCid;
    // console.table({ completePassport, missingOne, hasCid, missingOptional, ret: completePassport || missingOne });
    return completePassport || missingOptional;
}

const o1 = splitPassports(input[3]);
const ret = validatePassport(o1);

const arrOfValidPassports = input.map((e) => {
    const passport = splitPassports(e);
    const isValid = validatePassport(passport);
    return isValid;
})
const amountOfValidPassports = arrOfValidPassports.filter((boo) => boo).length;
console.log(amountOfValidPassports);
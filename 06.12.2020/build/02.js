"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const groupInput = input_1.default.map((group) => group.split("\n"));
const groupYesses = groupInput.map((group) => {
    const groupString = group.join("");
    const duplicates = getUniqueDuplicates(groupString);
    const groupIsOnePerson = group.length === 1;
    const groupHasNoDuplicates = groupString.length === (new Set(groupString.split("")).size);
    const duplicatesByEachMember = duplicates.map((d) => {
        const hasEachDuplicates = group.map((member) => new Set(member).has(d) ? d : null);
        const boo = hasEachDuplicates.every((e) => e !== null);
        const char = hasEachDuplicates.filter((e) => e !== null)[0];
        return boo ? char : null;
    });
    if (groupIsOnePerson && groupHasNoDuplicates)
        return groupString.length;
    if (groupHasNoDuplicates)
        return 0;
    return duplicatesByEachMember.filter((e) => e !== null).length;
});
const amountOfYesses = groupYesses.reduce((prev, acc) => prev + acc);
console.log(amountOfYesses);
function getUniqueDuplicates(string) {
    const duplicates = string.split("").filter((val, i) => string.indexOf(val) !== i);
    const duplicatesHasDuplicates = new Set(duplicates).size !== duplicates.length;
    if (duplicatesHasDuplicates)
        return getUniqueDuplicates(duplicates.join(""));
    return duplicates;
}

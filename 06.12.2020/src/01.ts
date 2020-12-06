import input from "./input";

const groupInput = input.map((group) => group.split("\n"));
const groupStrings = groupInput.map((group) => group.join(""));
const groupYesses = groupStrings.map((str) => (new Set(str.split(""))).size)
const amountOfYesses = groupYesses.reduce((prev, acc) => prev + acc);
console.log(amountOfYesses);
// used the follwoing source as reference
// https://stackoverflow.com/questions/7376598/in-javascript-how-do-i-check-if-an-array-has-duplicate-values
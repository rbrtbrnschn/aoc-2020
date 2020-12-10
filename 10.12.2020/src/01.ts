import rawInput from "./input";
const input = rawInput.map((e) => parseInt(e));
//! Account For 1 Jolt difference from 0;
//! Account For 3 Jolt difference at builtin device adapter
let ojd = 1;
let tjd = 1;

const lowestFrom = (array: Array<number>): number => array.sort((a, b) => a - b)[0];
const differences = (num1: number, num2: number): number => Math.abs(num1 - num2) === 3 ? tjd++ : Math.abs(num1 - num2) === 1 ? ojd++ : 0;

const filtered = input.sort((a, b) => a - b);

filtered.reduce((prev, acc) => {
    differences(prev, acc);
    console.log(prev, acc);
    return acc;
})
console.table({ ojd, tjd, res: ojd * tjd })

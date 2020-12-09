import rawInput from "./input";
const input = rawInput.map((numStr) => parseInt(numStr));
import { isTesting } from "./input";

const log = (...params: any) => isTesting ? console.log(...params) : null;
const table = (...params: any) => isTesting ? console.table(...params) : null;

let pointer = isTesting ? 14 : 557;

function getPreambles(pointer: number) {
    const preambleRange = isTesting ? 5 : 25;
    if (pointer - preambleRange < 0) pointer = preambleRange;

    const preambleStart = pointer - preambleRange;
    const preambleEnd = pointer;
    const preambles = input.slice(preambleStart, preambleEnd);
    // table({ preambleRange, preambleStart, preambleEnd })
    return preambles;
}

function isSum(pointer: number, _x: number = 0) {
    const [x, y] = [_x, pointer];
    const range = input.slice(x, y);
    let desiredRange: Array<number> = [];
    let index = x;
    let _isSum = false;

    range.reduce((prev, acc) => {
        index++;
        const sum = prev + acc;
        const __isSum = sum === input[pointer];
        if (__isSum) {
            _isSum = true;
            desiredRange = [x, index];
        };

        return sum;
    })
    return desiredRange;
}

for (let i = 0; i < pointer; i++) {
    const range = isSum(pointer, i); // logs range of [444, 459]
    if (range.length) {
        console.log(range);
        let map = [];
        for (let i = range[0]; i <= range[1]; i++) {
            if (i === 444 || i === 460) console.log(`${i}: ${input[i]}`)
            map.push(input[i]);
        }
        const lowest = map.reduce((prev, acc) => acc < prev ? acc : prev);
        const highest = map.reduce((prev, acc) => acc > prev ? acc : prev);
        console.log("highest:", highest);
        console.log("lowest:", lowest);

        console.log("sum of low and high:", lowest + highest); // lowest of range + highest of range aka puzzle answer
        console.log("adding up each element of map:", map.reduce((prev, acc) => prev + acc)); // adding up each of map's contents which returns the same as below
        console.log("validating against:", input[pointer]); // which is the result i got from part 1 which was correct
        //TODO now even though I make sure by reducing the map to a sum, that that equals the result(input[pointer]);
        //TODO adding up lowest and highest of sad range is still wrong

    }
}


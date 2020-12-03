//! DONT WORK
import rawInput from "./input";
const mapLength = rawInput.length;
let timer = 0;
let currentPosition = [0, 0];

function addMap(prevInput: Array<string>, rawInput: Array<string>): Array<string> {
    // Takes In Previous Map And Base Map
    // Adds Together
    return prevInput.map((line, index) => line + rawInput[index]);
}

function handleTreeOrNoTree(char: string) {
    switch (char) {
        case "#":
            return "X"
        case ".":
            return "O"
        default:
            break;
    }
}

function parseMapForTrees(map: Array<string>): number {
    let trees = 0;
    const field = map.map((line) => line.split(""));
    field.forEach((line: any) => {
        if (line.includes("X")) trees++;
    })
    return trees;
}

function followSlope(map: Array<string>, slope: Array<number>, changedPostion: Array<number> | null = null): Array<any> {
    // Takes In Global Map
    // Slope defined as right 3, down 1
    timer++;
    const [x, y] = changedPostion || currentPosition;
    const [vertical, horizontal] = slope;
    // const vertical = 3;
    // const horizontal = 1;
    const newX = x + vertical;
    const newY = y + horizontal;
    currentPosition = [newX, newY];

    let field;
    field = map.map((line) => line.split(""));
    if (timer === Math.floor(mapLength * 1.5)) {
        return field.map((line) => line.join(""));
    }
    try {
        const charAtCoords = field[newY][newX];
        if (!charAtCoords) throw new Error("new position out of bounds horizontally");
        field[newY][newX] = handleTreeOrNoTree(charAtCoords);
        return followSlope(field.map((line) => line.join("")), slope);
    }
    catch (err) {
        if (field.length === mapLength - 1) {
            return field.map((line) => line.join(""))
        };

        return followSlope(addMap(map, rawInput), slope, [x, y]);
    }

}
const field = addMap(rawInput, rawInput);

// const threeOne = followSlope(field, [3, 1]);
// const oneOne = followSlope(field, [1, 1]);
// const fiveOne = followSlope(field, [5, 1]);
// const sevenOne = followSlope(field, [7, 1]);
const oneTwo = followSlope(field, [1, 2]);
// const treesThreeOne = parseMapForTrees(threeOne)
// const treesOneOne = parseMapForTrees(oneOne);
// const treesFiveOne = parseMapForTrees(fiveOne);
// const treesSevenOne = parseMapForTrees(sevenOne);
const treesOneTwo = parseMapForTrees(oneTwo);

console.log(treesOneTwo)
// const total = treesThreeOne * treesOneOne * treesFiveOne * treesSevenOne * treesOneTwo;
// console.log(total);
// console.log(threeOne);
// console.log(treesThreeOne);

// 286 * 60 * 76 * treesSevenOne * treesOneTwo
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

function followSlope(map: Array<string>, changedPostion: Array<number> | null = null): Array<any> {
    // Takes In Global Map
    // Slope defined as right 3, down 1
    timer++;
    const [x, y] = changedPostion || currentPosition;
    const vertical = 3;
    const horizontal = 1;
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
        return followSlope(field.map((line) => line.join("")));
    }
    catch (err) {
        if (field.length === mapLength - 1) return field.map((line) => line.join(""));

        return followSlope(addMap(map, rawInput), [x, y]);
    }

}
const field = addMap(rawInput, rawInput);

const endMap = followSlope(field);
const trees = parseMapForTrees(endMap)
console.log(endMap);
console.log(trees);

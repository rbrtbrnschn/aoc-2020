"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
class Field {
    constructor(field, slope) {
        this.basePattern = field;
        this.field = field;
        this._slope = slope;
        this._pos = [0, 0];
        this.symbolNoTree = ".";
        this.symbolTree = "#";
        this.markNoTree = "O";
        this.markTree = "X";
        this.hitTrees = 0;
        this.hitNoTrees = 0;
        this.extendedPatternTimes = 0;
        this.addPattern = this.addPattern.bind(this);
    }
    get slope() {
        return this._slope;
    }
    set slope(slope) {
        this._slope = slope;
    }
    get pos() {
        return this._pos;
    }
    set pos(pos) {
        this._pos = pos;
    }
    addPattern() {
        this.extendedPatternTimes++;
        return this.field = this.field.map((line, index) => line + this.basePattern[index]);
    }
    parseTrees() {
        const filtered = this.field.filter((line) => line.includes(this.markTree));
        return filtered.length;
    }
    isOnMap(pos) {
        const [x, y] = pos;
        if (y >= this.field.length)
            return false;
        const char = this.field[y].split("")[x];
        if (char === undefined)
            return false;
        return true;
    }
    handleTreeOrNoTree(char) {
        let returnChar = "";
        switch (char) {
            case "#":
                this.hitTrees++;
                returnChar = "X";
                break;
            case ".":
                this.hitNoTrees++;
                returnChar = "O";
                break;
            default:
                break;
        }
        return returnChar;
    }
    followSlope() {
        if (!this.slope)
            throw new Error("No slope set.");
        const [posX, posY] = this.pos;
        const [dX, dY] = this.slope;
        const potentialCoords = [posX + dX, posY + dY];
        const [potX, potY] = potentialCoords;
        if (potY >= this.field.length)
            return this.finalize(this.field);
        if (!this.isOnMap(potentialCoords))
            this.addPattern();
        const char = this.field[potY][potX];
        let workingLine = [...this.field[potY]];
        workingLine[potX] = this.handleTreeOrNoTree(char);
        this.field[potY] = workingLine.join("");
        this.pos = potentialCoords;
        return this.followSlope();
    }
    finalize(retVal) {
        const table = {
            extendedPatternTimes: this.extendedPatternTimes,
            hitTrees: this.hitTrees,
            hitNoTrees: this.hitNoTrees
        };
        console.table(table);
        return retVal;
    }
    resetField() {
        this.field = [...this.basePattern];
    }
    resetStats() {
        this.pos = [0, 0];
        this.hitTrees = 0;
        this.hitNoTrees = 0;
        this.extendedPatternTimes = 0;
    }
}
const startPos = [0, 0];
const slopesToTest = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
];
console.log(input_1.default.length);
const field = new Field(input_1.default);
const hitTreesPerSlope = slopesToTest.map((slope) => {
    field.slope = slope;
    field.followSlope();
    const hitTrees = field.hitTrees;
    field.resetField();
    field.resetStats();
    return hitTrees;
});
const reduced = hitTreesPerSlope.reduce((prev, accumolator) => prev * accumolator);
console.log(reduced);

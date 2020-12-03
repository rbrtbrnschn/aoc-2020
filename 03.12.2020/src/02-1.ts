//* TAKE 2 ON PART 2 OF DAY 3
//* IF THIS ISNT IMPRESSIVE, THEN I DONT KNOW WHY IM USING CAPS.
import rawInput from "./input";
class Field {
    field: Array<string>;
    basePattern: Array<string>;
    private _slope: Array<number>;
    private _pos: Array<number>

    symbolTree: string;
    symbolNoTree: string;
    markTree: string;
    markNoTree: string;
    hitTrees: number;
    hitNoTrees: number;
    extendedPatternTimes: number;

    get slope() {
        return this._slope;
    }
    set slope(slope: Array<number>) {
        this._slope = slope;
    }
    get pos() {
        return this._pos;
    }
    set pos(pos: Array<number>) {
        this._pos = pos;
    }

    constructor(field: Array<string>, slope?: any) {
        this.basePattern = field;
        this.field = field;
        this._slope = slope;
        this._pos = [0, 0];
        this.symbolNoTree = ".";
        this.symbolTree = "#";
        this.markNoTree = "O";
        this.markTree = "X"
        this.hitTrees = 0;
        this.hitNoTrees = 0;
        this.extendedPatternTimes = 0;

        this.addPattern = this.addPattern.bind(this);
    }

    addPattern(): Array<string> {
        this.extendedPatternTimes++;
        return this.field = this.field.map((line, index) => line + this.basePattern[index]);
    }
    parseTrees(): number {
        const filtered = this.field.filter((line: any) => line.includes(this.markTree));
        return filtered.length;
    }
    isOnMap(pos: Array<number>): boolean {
        const [x, y] = pos;
        if (y >= this.field.length) return false;

        const char = this.field[y].split("")[x];
        if (char === undefined) return false;
        return true;
    }
    handleTreeOrNoTree(char: string): string {
        let returnChar = "";
        switch (char) {
            case "#":
                this.hitTrees++;
                // console.log("this.hitTrees", this.hitTrees)
                returnChar = "X";
                break;
            case ".":
                this.hitNoTrees++;
                // console.log("this.hitNoTrees", this.hitNoTrees)
                returnChar = "O";
                break;
            default:
                break;
        }
        return returnChar;
    }

    followSlope(): () => any {
        // if(this.temp == 20) return this.finalize(this.field);
        if (!this.slope) throw new Error("No slope set.");
        const [posX, posY] = this.pos;
        const [dX, dY] = this.slope;
        const potentialCoords = [posX + dX, posY + dY];
        const [potX, potY] = potentialCoords;
        // console.table({ posX, posY, dX, dY, potX, potY })

        // Validate Reached Bottom
        if (potY >= this.field.length) return this.finalize(this.field);

        // Extend Map Upon "POTENTIALLY" Reaching Out Of Bounds
        if (!this.isOnMap(potentialCoords)) this.addPattern();

        // Mark The Stop
        const char = this.field[potY][potX];
        let workingLine = [...this.field[potY]];
        workingLine[potX] = this.handleTreeOrNoTree(char);
        this.field[potY] = workingLine.join("");

        // Change Pos
        this.pos = potentialCoords;

        // Go Again
        return this.followSlope();
    }

    finalize(retVal: any): any {
        const table = {
            extendedPatternTimes: this.extendedPatternTimes,
            hitTrees: this.hitTrees,
            hitNoTrees: this.hitNoTrees
        }
        console.table(table);
        return retVal;
    }
    resetField(): void {
        this.field = [...this.basePattern];
    }
    resetStats(): void {
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

const field = new Field(rawInput);
const hitTreesPerSlope = slopesToTest.map((slope) => {
    field.slope = slope;
    field.followSlope();
    const hitTrees = field.hitTrees;
    field.resetField();
    field.resetStats();
    return hitTrees;
});

const reduced = hitTreesPerSlope.reduce((prev, accumolator) => prev * accumolator);
console.log(`Answer: ${reduced}`);
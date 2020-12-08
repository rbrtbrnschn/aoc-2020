import rawInput from "./input";
const copyRawInput = [...rawInput];
const isDebugging = false;
let currentLine = 0;
let accumulator = 0;
let history: Array<number> = [];
let changes: Array<number> = [];
let lastChangedIndex: number = 0;

const nop = (): null => null;
const jmp = (num: number): number => currentLine += num - 1;
const acc = (num: number): number => accumulator += num;
const sln = (): number => history.push(currentLine);
const log = (...params: any): void => isDebugging ? console.log(...params) : null;
const rst = (): void => {
    currentLine = 0;
    accumulator = 0;
    history = [];
}

function run(input: string[] = rawInput) {
    const reachedBottom = currentLine >= input.length;
    while (!reachedBottom) {
        log("[CWL]:", currentLine);

        //! Validate Finished
        if (currentLine >= input.length) {
            log("[FINISHED]");
            break;
        }

        // On New Iteration
        const reIteration = history.includes(currentLine)
        if (reIteration) {
            console.log("[REITERATION]:", currentLine);

            const formerChanges = changes.length > 1;
            if (formerChanges) {
                //! UNDO LAST CHANGE
                undoLastChange(input);
            }
            //! SWAP LASTLINE
            swapLastLine(input);

            // Retry
            rst();
            if (changes.length > 50) break;
            log(`Running #${changes.length}`);
            continue;
        }

        // Read Line
        const line = input[currentLine];
        const [cmd, args] = line.split(" ");

        // Run Command
        const _args = parseInt(args);
        sln();
        switch (cmd) {
            case "nop":
                nop();
                break;
            case "jmp":
                jmp(_args);
                break;
            case "acc":
                acc(_args);
                break
            default:
            // throw new Error(`unhandled operation: ${line}, ${cmd}, ${_args}`)
        }
        currentLine++;
    }
}

function swapLastLine(input: Array<string>) {
    const lastLineIndex = history[history.length - 1];
    const lastLine = input[lastLineIndex];

    const [cmd, args] = lastLine.split(" ");
    let swappedLine = `${cmd} ${args}`;

    // Switch LastLine Operand
    switch (cmd) {
        case "nop":
            swappedLine = `jmp ${args}`
            break;
        case "jmp":
            swappedLine = `nop ${args}`
            break;
        default:
            delete history[history.length - 1];
            history = history.filter((h) => h !== null);
            swapLastLine(input);
            break;
    }
    input[lastLineIndex] = swappedLine;
    lastChangedIndex = lastLineIndex;
    changes.push(lastLineIndex);
}
function undoLastChange(input: Array<string>): any {
    const lastLineIndex = lastChangedIndex;
    const lastLine = input[lastLineIndex];
    const [cmd, args] = lastLine.split(" ");
    let swappedLine = `${cmd} ${args}`;


    // Switch LastLine Operand
    switch (cmd) {
        case "nop":
            swappedLine = `jmp ${args}`
            break;
        case "jmp":
            swappedLine = `nop ${args}`
            break;
        default:
            break;
    }
    input[lastLineIndex] = swappedLine;
}
run(rawInput)
console.log(accumulator);
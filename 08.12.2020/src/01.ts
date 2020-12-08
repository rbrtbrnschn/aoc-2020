import input from "./input";
let currentLine = 0;
let accumulator = 0;
let history: Array<number> = [];

const nop = (): null => null;
const jmp = (num: number): number => currentLine += num - 1;
const acc = (num: number): number => accumulator += num;
const sln = (): number => history.push(currentLine);

while (!history.includes(currentLine)) {
    const line = input[currentLine];
    const [cmd, args] = line.split(" ");

    const _args = parseInt(args);
    console.log(cmd, args, accumulator)
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
            throw new Error("unhandled operation")
    }
    sln();
    currentLine++;
}
console.log(accumulator);
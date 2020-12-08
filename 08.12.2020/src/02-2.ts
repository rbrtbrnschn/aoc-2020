import input from "./input";
let accumulator = 0;
let line = 0;
let previousLines: Array<number> = [];
let changedIndex: number = 0;

const jmp = (args: number) => line += args - 1; // TODO -1
const nop = (...params: any): null => null;
const acc = (args: number) => accumulator += args;
const rst = () => { accumulator = 0; line = 0; previousLines = []; }

function testMap(map: Array<string>): boolean {
    let isTrue = true;
    while (true) {
        try {
            if (line in previousLines) throw new Error("reiteration started");
            if (line === map.length) break;

            const [cmd, args] = map[line].split(" ");
            handleCmd(cmd, args, accumulator, line, previousLines);

            line++;
            previousLines.push(line);
        }
        catch (err) {
            isTrue = false;
            break
        }
    }
    return isTrue;
}

function handleCmd(cmd: string, args: string, _acc: number, line: number, previousLines: Array<any>): void {
    const parsedArgs = parseInt(args);
    switch (cmd) {
        case "jmp":
            jmp(parsedArgs);
            break;
        case "acc":
            acc(parsedArgs);
            break;
        case "nop":
            nop(parsedArgs);
            break;
        default:
            throw new Error(`Unknown Command: ${cmd} ${args}`);
    }
}

function createMap(defaultMap: Array<string>): Array<string> {
    const newMap = [...defaultMap]
    newMap[changedIndex] = swapCommand(defaultMap);
    return newMap;
}

function swapCommand(map: Array<string>): string {
    const line = map[changedIndex];
    const [cmd, args] = line.split(" ");
    let newCmd;
    switch (cmd) {
        case "jmp":
            newCmd = "nop";
            break;
        case "nop":
            newCmd = "jmp";
            break;
        case "acc":
            return `${cmd} ${args}`;
        default:
            throw new Error(`swapCommand, wrong cmd: ${cmd}`);
    }
    return `${newCmd} ${args}`;
}
for (let i = 0; i < input.length; i++) {
    const map = createMap(input);
    changedIndex++;
    const isProperMap = testMap(map);
    if (isProperMap) {
        console.log(accumulator);
        break;
    }
    rst();
}
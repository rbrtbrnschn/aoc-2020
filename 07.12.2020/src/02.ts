import rawInput from "./input";
const splitInput = rawInput.split("\n").map((line) => line.split(" contain "));
let history: Array<string> = [];

function createEnum(input: Array<Array<string>>): Record<string, Record<string, number>> {
    let dict: Record<string, Record<string, number>> = {};
    input.forEach((line: Array<string>) => {
        const key = line[0];
        let temp = {} as any;
        line[1].split(", ").forEach((entry) => {
            const num = parseInt(entry[0]);
            if (isNaN(num)) return temp;

            let bagType = entry.slice(2, entry.length);
            const expression = bagType[bagType.length - 1] == ".";
            if (expression) bagType = bagType.slice(0, bagType.length - 1);
            if (bagType[bagType.length - 1] === "g") bagType += "s";
            temp[bagType] = num;
        });
        dict[key] = temp;
    })
    return dict;
}

const dict = createEnum(splitInput);

function getBagsNeededForBagType(type: string = "shiny gold bags"): number {
    if (type === undefined || type === null || !type) {
        console.log(type);
        throw new Error("Misspelled getBagsNeededForBagType @RequestParam type: string");
    }
    const mostOutterBag = dict[type] as any;
    let history: Array<string> = [];
    let currentAmmount = 1;
    sub(mostOutterBag);

    function sub(mostOutterBag: Record<string, number>): void {
        const subEntries = Object.entries(mostOutterBag);
        if (!subEntries.length) return
        subEntries.forEach(([key, amount], k) => {
            const subKey = dict[key];

            currentAmmount = (currentAmmount) * amount;
            if (!key) return
            else sub(subKey);
        })
    }
    return currentAmmount;
}
console.log(dict)
console.log(getBagsNeededForBagType());
// part 1 - 222
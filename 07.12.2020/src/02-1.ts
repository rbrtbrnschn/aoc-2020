import input from "./input";
const bagReg = /\bbag\b/;
const perLine = input.split("\n");
const minusPoint = perLine.map((value, index) => value.slice(0, value.length - 1))
const replacedBag = minusPoint.map((value, index) => {
    // console.log(bagReg.test(value))
    return value.replace(new RegExp(bagReg, "gm"), "bags");
})
const kvPairs = replacedBag.map((value, index) => value.split(" contain "));
const vPairs = kvPairs.map((value, index) => value.join(", ").split(", "));

function writeMap(input: string[][]): Map<string, Record<string, number>> {
    const map = new Map()
    input.forEach((value, index) => {
        let temp = {} as Record<any, any>;
        value.forEach((value, index) => {
            if (index === 0) return;

            let num = parseInt(value);
            const isNum = !isNaN(num);
            if (!isNum) num = 0;

            const sliceStart = num === 0 ? 0 : num.toString().length;
            const text = value.slice(sliceStart, value.length).trim();
            temp[text] = num;
        })
        map.set(value.shift(), temp);
    })
    return map;
}


function llooper(map: Map<string, Record<string, number>>, bagType: string) {
    const mainBag: any = map.get(bagType);
    Object.entries(mainBag).forEach(([key, amount]: any, k: any) => {
        if (amount === 0) return;
        baggageClaim.push(key);
        llooper(map, key)
    });
}
const map = writeMap(vPairs);
const baggageClaim = ["shiny gold bags"]
llooper(map, "shiny gold bags");

let newArr = 1;
let total = 0;
baggageClaim.map((value, index) => {
    const bag = map.get(value);
    const entries = Object.entries(bag);
    entries.forEach(([key, amount], index) => {

        total += newArr * amount;
        newArr = newArr * amount;
    })
})
console.log(total);
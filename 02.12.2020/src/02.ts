import aocInput from "./input";
const isTesting = false;
const sampleInput = `2-5 h: cphhbhh
2-3 v: vhfv
7-14 r: zrqmcfrvsrfrrvmr
1-2 b: zrdtblbbb
8-9 q: qssqqxqqcqqgkzbq
3-8 m: tmmmmmmmmmmmj
4-5 f: mmcfxtk`.split("\n");
const input = isTesting ? sampleInput : aocInput;

let validPasswords = 0;
for (let line of input) {
    if (!line) continue;

    const [first, pass] = line.split(": ");
    const [rangeString, validator] = first.split(" ");
    const range = rangeString.split("-").map((num) => parseInt(num));

    const booze = range.map((num) => pass[num - 1] === validator)

    const onlyTruce = booze.filter((boo) => boo);
    if (onlyTruce.length !== 1) continue;
    validPasswords++;
}
console.log(validPasswords);
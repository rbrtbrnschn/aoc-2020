import input from "./input";
let validPasswords = 0;

const performanceStart = new Date().getMilliseconds();
for (let line of input) {
    // Loop from @dinroRunner
    const [check, pass] = line.split(": ");

    const [times, validator] = check.split(" ");

    const [min, max] = times.split("-");

    const temp = pass.split(validator);

    const hasMin = temp.length - 1 >= parseInt(min);
    const overMax = temp.length - 1 > parseInt(max);

    if (hasMin && !overMax) validPasswords++;
}
const performanceEnd = new Date().getMilliseconds();
const timeBetween = Math.abs(performanceStart - performanceEnd);
console.log(`Took: ${timeBetween}ms`)
console.log(`Valid passwords:${validPasswords}`);
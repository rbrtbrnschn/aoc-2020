import input from "./input";
let validPasswords = 0;

console.time("performance");
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

console.timeEnd("performance")
console.log(`Valid passwords:${validPasswords}`);
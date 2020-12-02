"use strict";
exports.__esModule = true;
var input_1 = require("./input");
var validPasswords = 0;
console.time("performance");
for (var _i = 0, input_2 = input_1["default"]; _i < input_2.length; _i++) {
    var line = input_2[_i];
    // Loop from @dinroRunner
    var _a = line.split(": "), check = _a[0], pass = _a[1];
    var _b = check.split(" "), times = _b[0], validator = _b[1];
    var _c = times.split("-"), min = _c[0], max = _c[1];
    var temp = pass.split(validator);
    var hasMin = temp.length - 1 >= parseInt(min);
    var overMax = temp.length - 1 > parseInt(max);
    if (hasMin && !overMax)
        validPasswords++;
}
console.timeEnd("performance");
console.log("Valid passwords:" + validPasswords);

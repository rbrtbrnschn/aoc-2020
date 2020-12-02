"use strict";
exports.__esModule = true;
var input_1 = require("./input");
var isTesting = false;
var sampleInput = "2-5 h: cphhbhh\n2-3 v: vhfv\n7-14 r: zrqmcfrvsrfrrvmr\n1-2 b: zrdtblbbb\n8-9 q: qssqqxqqcqqgkzbq\n3-8 m: tmmmmmmmmmmmj\n4-5 f: mmcfxtk".split("\n");
var input = isTesting ? sampleInput : input_1["default"];
var validPasswords = 0;
var _loop_1 = function (line) {
    if (!line)
        return "continue";
    var _a = line.split(": "), first = _a[0], pass = _a[1];
    var _b = first.split(" "), rangeString = _b[0], validator = _b[1];
    var range = rangeString.split("-").map(function (num) { return parseInt(num); });
    var booze = range.map(function (num) { return pass[num - 1] === validator; });
    var onlyTruce = booze.filter(function (boo) { return boo; });
    if (onlyTruce.length !== 1)
        return "continue";
    validPasswords++;
};
for (var _i = 0, input_2 = input; _i < input_2.length; _i++) {
    var line = input_2[_i];
    _loop_1(line);
}
console.log(validPasswords);

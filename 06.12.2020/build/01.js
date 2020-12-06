"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const input_1 = __importDefault(require("./input"));
const groupInput = input_1.default.map((group) => group.split("\n"));
const groupStrings = groupInput.map((group) => group.join(""));
const groupYesses = groupStrings.map((str) => (new Set(str.split(""))).size);
const amountOfYesses = groupYesses.reduce((prev, acc) => prev + acc);
console.log(amountOfYesses);

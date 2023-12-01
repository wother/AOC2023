import input from "./input.json" assert { type: "json" };

const firstNumberRegex = /\d/;
const lastNumberRegex = /(\d)(?=\D*$)/;

export function day1part1() {
    let result = 0;
    console.log(`input.length: ${input.length}`);
    for (let i = 0; i < input.length; i++) {
        result += parseInt(parseLine(input[i]));
    }
    return result;
}

function parseLine(inputString) {
    const firstNumber = firstNumberFromString(inputString);
    const lastNumber = lastNumberFromString(inputString);
    return firstNumber + lastNumber
}

function firstNumberFromString(inputString) {
    return inputString.match(firstNumberRegex)[0];
}

function lastNumberFromString(inputString) {
    return inputString.match(lastNumberRegex)[1];
}
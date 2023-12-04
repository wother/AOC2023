import { readFile } from 'node:fs';

export function day2part1() {
    readFile('./day2/input.txt', 'utf8', (err, source) => {
        if (err) {
            console.error(err);
        } else {
            console.log(parseFile(source));
        }
      });
    return "day2part1";
}

function parseFile(inputFile) {
    const result = [];
    const lines = inputFile.split("\n");
    lines.forEach(line => {
        result.push(parseLine(line));
    });
    return result;
}

// Example line: <Game index>: <pull>; <pull>; <pull>; <pull>
function parseLine(inputLine) {
    let index = inputLine.split(":")[0];
    let pulls = inputLine.split(":")[1].split(";");
    return `${index}: ${parsePulls(pulls)}`;
}

/**
 * looking for only 12 red cubes, 13 green cubes, and 14 blue cubes.
 * @param {Array<string>} inputPull 
 * @returns boolean
 */
function parsePulls(inputPull) {
    let count = 0;
    let pullObject = {};
    inputPull.forEach((pull) => {
        pullObject = countPull(pull);
    });
    // this gonna be nasty... hold onto your butts
    if (pullObject.red == 12 && pullObject.green == 13 && pullObject.blue == 14) {
        return true;
    } else {
        return false;
    }
}

/**
 * example input: 2 green, 7 blue, 2 red
 * @param {String} inputPullString 
 * @returns 
 */
function countPull(inputPullString) {
    const pullArray = inputPullString.split(",");
    const result = {
        red: 0,
        green: 0,
        blue: 0
    };
    pullArray.forEach(pull => {
        const colorCount = countColor(pull);
        result[colorCount.color] = colorCount.count;
    });
    return result;
}

function countColor(inputColor) {
    // format is ## COLOR
    const color = inputColor.split(" ")[1];
    const count = inputColor.split(" ")[0];
    return {
        color: color,
        count: count
    };
}
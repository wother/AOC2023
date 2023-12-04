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
        if (!!parseLine(line)) {
            result.push(parseLine(line));
        }
    });
    let total = 0;
    result.forEach((game) => {
        let gameNumber = game.split(" ")[1];
        total += parseInt(gameNumber);
    });
    return total;
}

function sumGameNumbers(inputArray) {

}

// Example line: <Game index>: <pull>; <pull>; <pull>; <pull>
function parseLine(inputLine) {
    let index = inputLine.split(":")[0];
    let pulls = inputLine.split(":")[1].split(";");
    if (parsePulls(pulls)) {
        return index;
    }
}

/**
 * looking for only 12 red cubes, 13 green cubes, and 14 blue cubes.
 * @param {Array<string>} inputPull 
 * @returns boolean
 */
function parsePulls(inputPull) {
    let gameCounts = {
        red: 0,
        green: 0,
        blue: 0
    };
    inputPull.forEach((pull) => {
        const pullObj = countPull(pull);
        gameCounts.red = (gameCounts.red < pullObj.red) ? pullObj.red : gameCounts.red;
        gameCounts.green = (gameCounts.green < pullObj.green) ? pullObj.green : gameCounts.green;
        gameCounts.blue = (gameCounts.blue < pullObj.blue) ? pullObj.blue : gameCounts.blue;
    });
    // this gonna be nasty... hold onto your butts
    if (gameCounts.red <= 12 &&
        gameCounts.green <= 13 &&
        gameCounts.blue <= 14) {
        return true;
    } else {
        return false;
    }
}

function gameStats(inputPull) {
    let output = {
        maxRed: 0,
        maxGreen: 0,
        maxBlue: 0,
        totalPull: 0
    };

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
        result[colorCount.color] = parseInt(colorCount.count);
    });
    return result;
}

function countColor(inputColor) {
    // trim leading whitespace
    inputColor = inputColor.trim();
    // format is ## COLOR
    const color = inputColor.split(" ")[1];
    if (color.endsWith("/r")) {
        color = color.substring(0, color.length - 2);
    }
    const count = inputColor.split(" ")[0];
    return {
        color: color,
        count: count
    };
}
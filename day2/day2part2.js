import { readFile } from 'node:fs';
import { countPull } from './day2part1.js';

export function day2part2() {
    readFile('./day2/input.txt', 'utf8', (err, source) => {
        if (err) {
            console.error(err);
        } else {
            console.log(parseFile(source));
        }
      });
    return "day2part2";
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
        let gameNumber = game.split(":")[1].trim();
        total += parseInt(gameNumber);
    });
    return total;
}

function parseLine(inputLine) {
    let index = inputLine.split(":")[0];
    let pulls = inputLine.split(":")[1].split(";");
    return `${index}: ${parsePulls(pulls)}`
}

/**
 * looking for only 12 red cubes, 13 green cubes, and 14 blue cubes.
 * @param {Array<string>} inputPull 
 * @returns {Number} power
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
    return (gameCounts.red * gameCounts.green * gameCounts.blue);
}
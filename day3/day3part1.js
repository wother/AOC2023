import { readFile } from 'node:fs';

export function day3part1() {
    readFile('./day3/input.txt', 'utf8', (err, source) => {
        if (err) {
            console.error(err);
        } else {
            console.log(parseInput(source));
        }
      });
    return "day3part1";
}

function parseInput(inputFile) { 
    let lines = inputFile.split("\n");
    let map = [];
    lines.forEach(line => {
        map.push(line.split(""));
    });
    return getNumbersOnX(map, 0, 0);
}

// ugg... matrix stuff
function getMapValue(map, x, y) {
    let mapWidth = map[0].length;
    let mapHeight = map.length;
    let xPosition = x % mapWidth;
    let yPosition = y % mapHeight;
    return map[yPosition][xPosition];
}

function getNeighbors(map, x, y) {
    let neighbors = [];
    neighbors.push(getMapValue(map, x-1, y-1));
    neighbors.push(getMapValue(map, x, y-1));
    neighbors.push(getMapValue(map, x+1, y-1));
    neighbors.push(getMapValue(map, x-1, y));
    neighbors.push(getMapValue(map, x+1, y));
    neighbors.push(getMapValue(map, x-1, y+1));
    neighbors.push(getMapValue(map, x, y+1));
    neighbors.push(getMapValue(map, x+1, y+1));
    return neighbors;
}

function getNumbersOnX(map, x, y) {
    let numberOnYAxis = [];
    let row = map[x];
    row.forEach((elt, i) => {
        if (!!parseInt(elt)) {
            const numFirst = elt;
            const numSecond = (row[i + 1] === ".")?"":row[i + 1];
            const numThird = (row[i + 2] === ".")?"":row[i + 2];
            // judge me for this
            const numNum = numFirst + numSecond + numThird;
            numberOnYAxis.push(numNum.trim());
        }
    })
    return numberOnYAxis;
}

// I need a function that get's the whole number out of the matrix x,y. So, it will need to ONLY look left/right till it finds a . then kick out that number.

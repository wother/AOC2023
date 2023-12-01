import input from "./input.json" assert { type: "json" };

// Note: when I say int I mean Number type. When I say Numeral I mean a string that represents a number.

const firstMatchRegEx = /(?:\D+)?(\d+|(one|two|three|four|five|six|seven|eight|nine|zero))(?:\D+|$)/i;
const lastMatchRegEx = /(?:\D+)?(\d+|(one|two|three|four|five|six|seven|eight|nine|zero))(?:\D+|$)/ig;

const numeralToIntMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0
};
const justStringNumerals = Object.keys(numeralToIntMap);
// const pattern = new RegExp(`(${Object.keys(wordToNumberMap).join('|')})`, 'ig');

const testinput = [
    "8six1ninezjsix", // 8,6
    "6threezjmclknqcztwocfiveninextpdq1", // 6,1
    "gsdsr2seven51", // 2,1
    "vtgdx5", // 5,5
];

export function day1part2() {
    let result = 0;
    console.log(`input.length: ${testinput.length}`);
    for (let i = 0; i < testinput.length; i++) {
        result += parseInt(parseLine(testinput[i]));
    }
    return result;
}

function parseLine(inputString) {
    let result = 0;
    let tempArray = [];
    let fuckYouArray = explodeString(inputString);
    fuckYouArray.forEach(partString => {
        if (!!parseInt(partString) || !!numeralToIntMap[partString]) {
            tempArray.push(partString);
        }
    });
    result = tempArray[0].toString() + tempArray.pop();
    return result;
}

function explodeString(inputString) {
    let result = [];
    let charArray = inputString.split("");
    charArray.forEach((letter, i) => {
        const item = inputString.substring(0, i + 1);
        result.push(item);
    });
    return result;
}
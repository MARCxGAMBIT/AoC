const fs = require('fs');
const input = fs.readFileSync('./day1_input.txt', 'utf-8').split('\n');

const regexBegin = /.*?(\d)/;
const regexEnd = /.*(\d)/;

const firstDigit = input
    .map((line) => line.match(regexBegin))
    .map(([, a]) => a);

const lastDigit = input
    .map((line) => line.match(regexEnd))
    .map(([, a]) => a);

const sum = firstDigit
    .map((a, i) => a + lastDigit[i])
    .map(Number)
    .reduce((acc, cur) => acc + cur, 0);


console.log(sum);


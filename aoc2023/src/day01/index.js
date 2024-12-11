import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const regexBegin = /.*?(\d)/;
  const regexEnd = /.*(\d)/;

  let sum = 0;

  for (let line of input) {
    let first = line.match(regexBegin);
    let last = line.match(regexEnd);
    sum += Number(first[1]) * 10 + Number(last[1]);
  }

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const regexBegin =
    /.*?(\d|one|two|three|four|five|six|seven|eight|nine|zero)/;
  const regexEnd = /.*(\d|one|two|three|four|five|six|seven|eight|nine|zero).*/;

  const numMap = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
    zero: 0,
  };

  let sum = 0;

  for (let line of input) {
    let first = line.match(regexBegin);
    let last = line.match(regexEnd);
    let firstDigit = numMap[first[1]] ?? Number(first[1]);
    let lastDigit = numMap[last[1]] ?? Number(last[1]);
    sum += firstDigit * 10 + lastDigit;
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `one2three`,
        expected: 22,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `eighthree`,
        expected: 83,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

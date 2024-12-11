import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const calories = input
    .map((line) => line.trim())
    .reduce(
      (acc, curr) => {
        if (curr === "") {
          acc.push(0);
        } else {
          acc[acc.length - 1] += parseInt(curr, 10);
        }
        return acc;
      },
      [0],
    )
    .sort((a, b) => b - a);

  return calories[0];
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const calories = input
    .map((line) => line.trim())
    .reduce(
      (acc, curr) => {
        if (curr === "") {
          acc.push(0);
        } else {
          acc[acc.length - 1] += parseInt(curr, 10);
        }
        return acc;
      },
      [0],
    )
    .sort((a, b) => b - a);

  const sum = calories.slice(0, 3).reduce((acc, curr) => acc + curr);

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `1000
              2000
              3000
              
              4000
              
              5000
              6000
              
              7000
              8000
              9000
              
              10000`,
        expected: 24000,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1000
                2000
                3000
                
                4000
                
                5000
                6000
                
                7000
                8000
                9000
                
                10000`,
        expected: 45000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const configs = [
  { limit: 12, pattern: /(\d+) red/g },
  { limit: 13, pattern: /(\d+) green/g },
  { limit: 14, pattern: /(\d+) blue/g },
];

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  let sum = 0;

  for (let [i, line] of input.entries()) {
    for (let config of configs) {
      if ([...line.matchAll(config.pattern)].some(([_, value]) =>  value > config.limit)) {
        sum += i + 1;
        break;
      }
    }
  }
  return input.length * (input.length + 1) / 2 - sum
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  let sum = 0;

  for (let [i, line] of input.entries()) {
    let power = 1;
    for (let config of configs) {
      const maxCubes = Math.max(...[...line.matchAll(config.pattern)].map(([_, value]) =>  value))
      power *= maxCubes;
    }
    sum += power;

  }
  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 8,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
        Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
        Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
        Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
        Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`,
        expected: 2286,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

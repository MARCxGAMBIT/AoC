import run from "aocrunner";
import { parseInput, sum, splitAt } from "../utils/index.js";

const mulRegex = /mul\((\d+,\d+)\)/gs;
const replaceRegex = /(don't\(\)).*?(do\(\))|(don't\(\)).*?$/g;

/**
 * Calculate the solution of part 1
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return input
    .flatMap(line => [...line.matchAll(mulRegex)])
    .map(match => match[1])
    .map(splitAt(","))
    .map(([a, b]) => a * b)
    .reduce(sum);
};

/**
 * Calculate the solution of part 2
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const inputLine = input.join("");

  return [
    ...inputLine
      .replaceAll(replaceRegex, "")
      .matchAll(mulRegex)
  ]
    .map(match => match[1])
    .map(splitAt(","))
    .map(([a, b]) => a * b)
    .reduce(sum);
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))
`,
        expected: 161,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
`,
        expected: 48,
      },
      {
        input: `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))
        mul(2,2)abcdon't()mul(2,5)don't()
        mul(3,3)do()
        mul(4,4)do()
        mul(4,3)don't()mul(4,5)
`,
        expected: 80,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
import run from "aocrunner";
import {
  parseInput,
  parseGroupedInput,
  parseMatrix,
  parseTable,
  ascending,
  sum,
} from "../utils/index.js";

const calculateJoltageForBatterySize = (input, size = 2) => {
  const batteries = input
    .map((line) => [...line].map(Number))
    .map((line) => {
      const result = [];

      for (let i = 0; i < size; i++) {
        const max = line
          .slice(0, -size + 1 + i || undefined)
          .toSorted()
          .at(-1);
        const maxIdx = line.indexOf(max);
        line.splice(0, maxIdx + 1);

        result.push(max);
      }
      return result.reduce(
        (accu, curr, idx, arr) => accu + curr * 10 ** (arr.length - idx - 1),
        0,
      );
    });

  return batteries.reduce(sum);
};

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return calculateJoltageForBatterySize(input);
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return calculateJoltageForBatterySize(input, 12);
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 357,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `987654321111111
811111111111119
234234234234278
818181911112111`,
        expected: 3121910778619,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

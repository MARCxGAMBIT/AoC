import run from "aocrunner";
import {
  parseInput,
  parseGroupedInput,
  parseMatrix,
  parseTable,
  ascending,
  sum,
} from "../utils/index.js";

const directions = [
  [-1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
  [1, 0],
  [1, -1],
  [0, -1],
  [-1, -1],
];

const removableCount = (input) => {
  let count = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] !== "@") {
        continue;
      }

      const neighbors = directions
        .map(([dirRow, dirCol]) => input[row + dirRow]?.[col + dirCol])
        .filter((type) => type === "@");

      if (neighbors.length < 4) count++;
    }
  }
  return count;
};

const remove = (input) => {
  let removed = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] !== "@") {
        continue;
      }

      const neighbors = directions
        .map(([dirRow, dirCol]) => input[row + dirRow]?.[col + dirCol])
        .filter((type) => type === "@");

      if (neighbors.length < 4) {
        input[row][col] = ".";
        removed++;
      }
    }
  }
  return removed;
};

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseMatrix(rawInput);
  return removableCount(input);
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const input = parseMatrix(rawInput);
  let removed = 0;
  while (removableCount(input) > 0) {
    removed += remove(input);
  }

  return removed;
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `..@@.@@@@.
@@@.@.@.@@
@@@@@.@.@@
@.@@@@..@.
@@.@@@@.@@
.@@@@@@@.@
.@.@.@.@@@
@.@@@.@@@@
.@@@@@@@@.
@.@.@@@.@.`,
        expected: 13,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: ``,
        expected: 0,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

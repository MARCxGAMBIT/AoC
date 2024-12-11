import run from "aocrunner";
import { parseInput, cache, sum } from "../utils/index.js";

const countStones = cache((n, depth) => {
  if (depth === 0) {
    return 1;
  }
  if (n === "0") {
    return countStones("1", depth - 1);
  }
  if (n.length % 2) {
    return countStones(`${n * 2024}`, depth - 1);
  }
  return (
    countStones(n.slice(0, n.length / 2), depth - 1) +
    countStones(`${Number(n.slice(n.length / 2))}`, depth - 1)
  );
});

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const stones = parseInput(rawInput)[0].split(" ");
  return (
    stones
      .map((n) => countStones(n, 25))
      .reduce(sum)
  );
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const stones = parseInput(rawInput)[0].split(" ");
  return (
    stones
      .map((n) => countStones(n, 75))
      .reduce(sum)
  );
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `125 17`,
        expected: 65601038650482,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

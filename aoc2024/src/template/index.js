import run from "aocrunner";
import { parseInput, parseGroupedInput, parseMatrix, parseTable, ascending, sum } from "../utils/index.js";

/**
 * Calculate the solution of part 1
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

/**
 * Calculate the solution of part 2
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

/**
 * AoC Runner
 */
run({
  part1: {
      tests: [
          {
              input: ``,
              expected: 0,
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
  onlyTests: true,
});
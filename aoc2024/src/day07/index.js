import run from "aocrunner";
import { parseInput, sum } from "../utils/index.js";


const valid = (nums, targetResult, ops, tempResult = nums[0], depth = 1) => {
  if (depth === nums.length) {
    return tempResult === targetResult;
  }

  return ops.some(op => valid(nums, targetResult, ops, op(tempResult, nums[depth]), depth + 1));
}

/**
 * Calculate the solution of part 1
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
*/
const part1 = (rawInput) => {
  const ops = [
    (a, b) => a + b,
    (a, b) => a * b
  ];

  return parseInput(rawInput)
    .map(line => line.split(": "))
    .filter(([testVal, equation]) => valid(equation.split(" ").map(Number), +testVal, ops))
    .map(([testVal]) => testVal)
    .map(Number)
    .reduce(sum);
};

/**
 * Calculate the solution of part 2
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const ops = [
    (a, b) => a + b,
    (a, b) => a * b,
    (a, b) => +(`${a}${b}`),
  ];

  return parseInput(rawInput)
    .map(line => line.split(": "))
    .filter(([testVal, equation]) => valid(equation.split(" ").map(Number), +testVal, ops))
    .map(([testVal]) => testVal)
    .map(Number)
    .reduce(sum);
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
import run from "aocrunner";
import { parseInput, sum } from "../utils/index.js";

const valid = (nums, tempResult, considerCon, depth = 0) => {
  if (depth === nums.length - 1) {
    return tempResult === nums[nums.length - 1];
  }

  const curr = nums[depth];

  const addValid = subtractable(tempResult, curr);
  const mulValid = divisable(tempResult, curr);
  const conValid = considerCon && endsWith(tempResult, curr);

  return (
    (addValid && valid(nums, tempResult - curr, considerCon, depth + 1)) ||
    (mulValid && valid(nums, tempResult / curr, considerCon, depth + 1)) ||
    (conValid &&
      valid(
        nums,
        (tempResult - curr) / 10 ** (Math.floor(Math.log10(curr)) + 1),
        considerCon,
        depth + 1,
      ))
  );
};

const endsWith = (a, b) => a.toString().endsWith(b);
const divisable = (a, b) => a % b === 0;
const subtractable = (a, b) => a >= b;
/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  return (
    parseInput(rawInput)
      .map((line) => line.split(": "))
      .filter(([testVal, equation]) =>
        valid(equation.split(" ").map(Number).reverse(), +testVal, false),
      )
      .map(([testVal]) => testVal)
      .map(Number)
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
  return (
    parseInput(rawInput)
      .map((line) => line.split(": "))
      .filter(([testVal, equation]) =>
        valid(equation.split(" ").map(Number).reverse(), +testVal, true),
      )
      .map(([testVal]) => testVal)
      .map(Number)
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

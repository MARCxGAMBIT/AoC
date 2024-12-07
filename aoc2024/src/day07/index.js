import run from "aocrunner";
import { parseInput, sum } from "../utils/index.js";


const valid1 = (nums, tempResult, depth = 0) => {
  if (depth === nums.length - 1) {
    return tempResult === nums[nums.length - 1];
  }

  const curr = nums[depth];

  const addValid = subtractable(tempResult, curr);
  const mulValid = divisable(tempResult, curr);

  return addValid && valid1(nums, tempResult - curr, depth + 1)
    || mulValid && valid1(nums, tempResult / curr, depth + 1)
}

const valid2 = (nums, tempResult, depth = 0) => {
  if (depth === nums.length - 1) {
    return tempResult === nums[nums.length - 1];
  }

  const curr = nums[depth];

  const addValid = subtractable(tempResult, curr);
  const mulValid = divisable(tempResult, curr);
  const conValid = endsWith(tempResult, curr);

  return addValid && valid2(nums, tempResult - curr, depth + 1)
    || mulValid && valid2(nums, tempResult / curr, depth + 1)
    || conValid && valid2(nums, (tempResult - curr) / Math.pow(10, Math.floor(Math.log10(curr)) + 1), depth + 1)
}

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
  const ops = [
    (a, b) => a + b,
    (a, b) => a * b
  ];

  return parseInput(rawInput)
    .map(line => line.split(": "))
    .filter(([testVal, equation]) => valid1(equation.split(" ").map(Number).reverse(), +testVal))
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
    // .filter(([testVal, equation]) => valid(equation.split(" ").map(Number), +testVal, ops))
    .filter(([testVal, equation]) => valid2(equation.split(" ").map(Number).reverse(), +testVal))
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
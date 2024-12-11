import run from "aocrunner";
import { parseTable } from "../utils/index.js";

class Solver {
  isPos = (num) => (num > 0) & (num < 4);
  isNeg = (num) => (num < 0) & (num > -4);

  isIncreasing = (nums) => nums.every(this.isPos);
  isDecreasing = (nums) => nums.every(this.isNeg);

  calcDiff = (nums) =>
    nums
      .map((curr, i) => curr - nums[i + 1])
      .slice(0, -1);

  isSafe = (nums) => this.applyChecks(this.calcDiff(nums));
  isNotSafe = (nums) => !this.isSafe(nums);
  applyChecks = (diffs) => this.isIncreasing(diffs) || this.isDecreasing(diffs);
  // applyChecks = (diffs) => [this.isIncreasing, this.isDecreasing].some(fn => fn(diffs));

  constructor(rawInput) {
    this.rawInput = rawInput;
  }

  parseInput() {
    this.table = parseTable(this.rawInput);
    return this;
  }

  determineGoodReports() {
    this.goodReports = this.table.filter(this.isSafe);
    return this;
  }

  determineBadReports() {
    this.badReports = this.table.filter(this.isNotSafe);
    return this;
  }

  determineFixableReports() {
    this.fixableReports = this.badReports
      .filter((nums) =>
        nums
          .map((_, i) => nums.toSpliced(i, 1))
          .some(this.isSafe),
      );

    return this;
  }

  calculateSafeReports() {
    return this.goodReports.length + (this.fixableReports?.length ?? 0);
  }
}

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) =>
  new Solver(rawInput)
    .parseInput()
    .determineGoodReports()
    .calculateSafeReports();

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) =>
  new Solver(rawInput)
    .parseInput()
    .determineGoodReports()
    .determineBadReports()
    .determineFixableReports()
    .calculateSafeReports();

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `7 6 4 2 1
1 2 7 8 9
9 7 6 2 1
1 3 2 4 5
8 6 4 4 1
1 3 6 7 9`,
        expected: 4,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

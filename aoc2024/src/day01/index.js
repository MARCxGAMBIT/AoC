import run from "aocrunner";
import { parseTable, sum } from "../utils/index.js";

/**
 * Helper Class
 */
class Solver {
  constructor(rawInput) {
    this.rawInput = rawInput;
  }

  parseInput() {
    this.table = parseTable(this.rawInput);
    return this;
  }

  separateIdsIntoTwoLists() {
    this.twoLists = this.table
      .reduce(
        ([listA, listB], [eleA, eleB]) => [[...listA, eleA], [...listB, eleB]],
        [[], []]
      );
    return this;
  }

  sortListAscending() {
    this.sortedLists = this.twoLists.map(list => list.sort());
    return this;
  }

  calculateDistance() {
    const [first, second] = this.sortedLists;

    return first
      .map((id, i) => Math.abs(id - second[i]))
      .reduce(sum);
  }

  calculateOccurences() {
    const [first, second] = this.twoLists;

    const occ = second.reduce((acc, curr) => {
      acc[curr] = (acc[curr] ?? 0) + 1;
      return acc;
    }, {});

    return first
      .map(a => a * (occ[a] ?? 0))
      .reduce(sum);
  }

}

/**
 * Calculate the solution of part 1
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => new Solver(rawInput)
  .parseInput()
  .separateIdsIntoTwoLists()
  .sortListAscending()
  .calculateDistance();

/**
 * Calculate the solution of part 2
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => new Solver(rawInput)
  .parseInput()
  .separateIdsIntoTwoLists()
  .calculateOccurences();


/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 11,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `3   4
4   3
2   5
1   3
3   9
3   3`,
        expected: 31,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

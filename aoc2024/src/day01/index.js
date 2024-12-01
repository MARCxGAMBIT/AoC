import run from "aocrunner";
import { parseTable, ascending, sum } from "../utils/index.js";

class Solver {
  constructor(rawInput) {
    this.rawInput = rawInput;
  }

  parseInput() {
    this.table = parseTable(this.rawInput);
    return this;
  }

  separateIdsIntoTwoLists() {
    this.twoLists = this.table.reduce((acc, [a, b]) => {
      acc[0].push(a);
      acc[1].push(b);
      return acc;
    }, [[], []]);
    return this;
  }

  sortListAscending() {
    this.sortedLists = this.twoLists.map(list => list.sort(ascending));
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
      .reduce(sum)
  }

}

const part1 = (rawInput) => {
  const solver = new Solver(rawInput);

  return solver
    .parseInput()
    .separateIdsIntoTwoLists()
    .sortListAscending()
    .calculateDistance();
};

const part2 = (rawInput) => {
  const solver = new Solver(rawInput);

  return solver
    .parseInput()
    .separateIdsIntoTwoLists()
    .calculateOccurences();
};

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

import run from "aocrunner";
import {
  parseInput,
  parseGroupedInput,
  parseNumMatrix,
  parseTable,
  ascending,
  sum,
} from "../utils/index.js";

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const coordsValid =
  (map) =>
  ([row, col]) =>
    row >= 0 && row < map.length && col >= 0 && col < map[row].length;

const coordsReachable =
  (map, prevHeight) =>
  ([row, col]) =>
    map[row][col] === prevHeight + 1;

const dfs = (map, visited, currRow, currCol, prevRow, prevCol) => {
  if (map[currRow][currCol] === 9) {
    visited.add(`${currRow},${currCol}`);
    return 1;
  }

  const neighbors = dirs
    .map(([row, col]) => [currRow + row, currCol + col])
    .filter(([row, col]) => row !== prevRow || col !== prevCol)
    .filter(coordsValid(map))
    .filter(coordsReachable(map, map[currRow][currCol]));

  if (neighbors.length === 0) {
    return 0;
  }

  return (
    neighbors
      .map(([row, col]) => dfs(map, visited, row, col, currRow, currCol))
      .reduce(sum)
  );
};
/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const map = parseNumMatrix(rawInput);
  let counter = 0;
  for (let row = 0; row < map.length; ++row) {
    for (let col = 0; col < map[row].length; ++col) {
      const height = map[row][col];
      if (height === 0) {
        const visited = new Set();
        dfs(map, visited, row, col, height);
        counter += visited.size;
      }
    }
  }
  return counter;
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const map = parseNumMatrix(rawInput);
  let counter = 0;
  for (let row = 0; row < map.length; ++row) {
    for (let col = 0; col < map[row].length; ++col) {
      const height = map[row][col];
      if (height === 0) {
        const visited = new Set();
        counter += dfs(map, visited, row, col, height);
      }
    }
  }
  return counter;
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 36,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `89010123
78121874
87430965
96549874
45678903
32019012
01329801
10456732`,
        expected: 81,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

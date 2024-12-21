import run from "aocrunner";
import { parseMatrix, sum } from "../utils/index.js";

const findStart = (matrix, symbol) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === symbol) {
        return [row, col];
      }
    }
  }
};

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const findPath = (matrix, current, path) => {
  let [row, col] = current;

  do {
    const neighbors = dirs.map(([r, c]) => [row + r, col + c]);
    for (let [r, c] of neighbors) {
      if (path[[r, c]] === undefined && matrix[r][c] !== "#") {
        path[[r, c]] = current;
        row = r;
        col = c;
        break;
      }
    }
  } while (matrix[row][col] !== "E");

  return path;
};

const manhattenDistance = (from, to) => {
  return Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);
};

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseMatrix(rawInput);

  const start = findStart(input, "S");
  const path = findPath(input, start, { [start]: null });

  return (
    Object
      .keys(path)
      .map((key) => key.split(",").map(Number))
      .map(
        ([row, col], i, pathCoords) =>
          pathCoords.slice(i)
            .filter(([r, c], ni) => {
              const d = manhattenDistance([row, col], [r, c]);
              return d === 2 && ni - d >= 100;
            }).length,
      )
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
  const input = parseMatrix(rawInput);

  const start = findStart(input, "S");

  const path = findPath(input, start, { [start]: null });
  return (
    Object
      .keys(path)
      .map((key) => key.split(",").map(Number))
      .map(
        ([row, col], i, pathCoords) =>
          pathCoords.slice(i)
            .filter(([r, c], ni) => {
              const d = manhattenDistance([row, col], [r, c]);
              return d <= 20 && ni - d >= 100;
            }).length,
      )
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
        input: `###############
#...#...#.....#
#.#.#.#.#.###.#
#S#...#.#.#...#
#######.#.#.###
#######.#.#...#
#######.#.###.#
###..E#...#...#
###.#######.###
#...###...#...#
#.#####.#.###.#
#.#...#.#.#...#
#.#.#.#.#.#.###
#...#...#...###
###############`,
        expected: 0,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      //       {
      //         input: `###############
      // #...#...#.....#
      // #.#.#.#.#.###.#
      // #S#...#.#.#...#
      // #######.#.#.###
      // #######.#.#...#
      // #######.#.###.#
      // ###..E#...#...#
      // ###.#######.###
      // #...###...#...#
      // #.#####.#.###.#
      // #.#...#.#.#...#
      // #.#.#.#.#.#.###
      // #...#...#...###
      // ###############`,
      //         expected: 0,
      //       },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

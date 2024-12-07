import run from "aocrunner";
import { parseMatrix } from "../utils/index.js";

const findStart = matrix => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === "^") {
        return [row, col];
      }
    }
  }
}

const traverseToExit = (matrix, [row, col]) => {
  const visited = new Set();
  visited.add(`${row},${col}`);

  let dir = 0;
  let [maxRow, maxCol] = [matrix.length - 1, matrix[0].length - 1];

  while (row > 0 && row < maxRow && col > 0 && col < maxCol) {
    const tempRow = row + dirs[dir][0];
    const tempCol = col + dirs[dir][1];

    if (matrix[tempRow][tempCol] === "#") {
      dir = (dir + 1) % dirs.length;
    } else {
      row = tempRow;
      col = tempCol;
      visited.add(`${row},${col}`);
    }
  }
  return visited;
}

const hasLoopWithObstacle = (matrix, [obsRow, obsCol], [row, col]) => {
  const copy = structuredClone(matrix);
  copy[obsRow][obsCol] = "#";

  let dir = 0;
  const visited = new Set();
  visited.add(`${row},${col},${dir}`);

  let [maxRow, maxCol] = [copy.length - 1, copy[0].length - 1];

  while (row > 0 && row < maxRow && col > 0 && col < maxCol) {
    const tempRow = row + dirs[dir][0];
    const tempCol = col + dirs[dir][1];

    const tempKey = `${tempRow},${tempCol},${dir}`;

    if (visited.has(tempKey)) {
      return true;
    } else if (copy[tempRow][tempCol] === "#") {
      dir = (dir + 1) % dirs.length;
    } else {
      row = tempRow;
      col = tempCol;
      visited.add(tempKey);
    }
  }
  return false;
}


const dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];

/**
 * Calculate the solution of part 1
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const matrix = parseMatrix(rawInput);
  const start = findStart(matrix);
  return traverseToExit(matrix, start).size
};

/**
 * Calculate the solution of part 2
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const matrix = parseMatrix(rawInput);
  const start = findStart(matrix);
  const visited = traverseToExit(matrix, start);

  return [...visited.keys()]
    .slice(1)
    .map(key => key.split(","))
    .filter(coords => hasLoopWithObstacle(matrix, coords, start))
    .length;
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 41,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
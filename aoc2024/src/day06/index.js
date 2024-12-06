import run from "aocrunner";
import { parseInput, parseGroupedInput, parseMatrix, parseTable, ascending, sum, rotateClockwise } from "../utils/index.js";

const findStart = matrix => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === "^") {
        return [row, col];
      }
    }
  }
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

  const visited = new Set();

  let [row, col] = findStart(matrix);
  let [maxRow, maxCol] = [matrix.length - 1, matrix[0].length - 1];
  let dir = 0;

  visited.add(`${row}, ${col}`);
  while (row !== 0 && row !== maxRow && col !== 0 && col !== maxCol) {
    const tempRow = row + dirs[dir][0];
    const tempCol = col + dirs[dir][1];

    if (matrix[tempRow][tempCol] === "#") {
      dir = (dir + 1) % dirs.length;
    } else {
      row = tempRow;
      col = tempCol;
      visited.add(`${row}, ${col}`);
    }
  }

  return visited.size;
};

/**
 * Calculate the solution of part 2
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const matrix = parseMatrix(rawInput);

  const visited = {};

  let [row, col] = findStart(matrix);
  let [maxRow, maxCol] = [matrix.length - 1, matrix[0].length - 1];
  let dir = 0;
  let counter = 0;

  visited[`${row},${col},${dir}`] = counter;

  while (row !== 0 && row !== maxRow && col !== 0 && col !== maxCol) {
    const tempRow = row + dirs[dir][0];
    const tempCol = col + dirs[dir][1];

    if (matrix[tempRow][tempCol] === "#") {
      dir = (dir + 1) % dirs.length;
    } else {
      counter++;
      row = tempRow;
      col = tempCol;
      visited[`${row},${col},${dir}`] = counter;
    }
  }


  const todo = Object.keys(visited).reverse();

  return todo.map((key, i) => {
    const todoKey = todo[i+1];
    // console.log("process next todo: ", todoKey);
    if (!todoKey) {
      return 0;
    }

    const visitedSim = new Set();
    let counter = visited[todoKey];
    let [row, col, dir] = todoKey.split(",").map(Number);
    dir = (dir + 1) % dirs.length;

    visitedSim.add([row, col, dir].join(","))
    
    while (row !== 0 && row !== maxRow && col !== 0 && col !== maxCol) {
      const tempRow = row + dirs[dir][0];
      const tempCol = col + dirs[dir][1];

      if (matrix[tempRow][tempCol] === "#") {
        dir = (dir + 1) % dirs.length;
      } else {
        row = tempRow;
        col = tempCol;

        if (visited[[row, col, dir].join(",")] < counter || visitedSim.has([row, col, dir].join(","))) {
          return 1;
        }

        visitedSim.add([row, col, dir].join(","))
      }
    }
    return 0;
  }).reduce(sum);

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
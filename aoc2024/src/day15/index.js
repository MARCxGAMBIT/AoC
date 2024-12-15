import run from "aocrunner";
import { parseGroupedInput } from "../utils/index.js";

const dirs = {
  "^": [-1, 0],
  "v": [1, 0],
  "<": [0, -1],
  ">": [0, 1],
};

const replacements = {
  "#": "##",
  "O": "[]",
  "@": "@.",
  ".": "..",
};

const replacer = (char) => replacements[char];

const findStart = (matrix, symbol) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === symbol) {
        return [row, col];
      }
    }
  }
};

const calcScore = (matrix) => {
  let score = 0;
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === "O" || matrix[row][col] === "[") {
        score += col + 100 * row;
      }
    }
  }
  return score;
};

const buildSections = (row) => {
  const sections = [];
  let begin = -1;
  for (const [i, pos] of row.entries()) {
    if (["[", "]"].includes(pos)) {
      if (begin === -1) {
        begin = i;
      }
    } else {
      if (begin !== -1) {
        sections.push([begin, i - 1]);
        begin = -1;
      }
    }
  }
  if (begin !== -1) {
    sections.push([begin, row.length - 1]);
  }
  return sections;
};

const swap = (currRow, nextRow, fromCol, toCol) => {
  for (let i = fromCol; i <= toCol; i++) {
    const temp = nextRow[i];
    nextRow[i] = currRow[i];
    currRow[i] = temp;
  }
};

const canMoveVertically = (matrix, row, fromCol, toCol, dir) => {
  const currRow = matrix[row];
  const nextRow = matrix[row + dir[0]];

  fromCol -= currRow[fromCol] === "]" ? 1 : 0;
  toCol += currRow[toCol] === "[" ? 1 : 0;

  const sliced = nextRow.slice(fromCol, toCol + 1);

  if (sliced.every((pos) => pos === ".")) {
    return true;
  }
  if (sliced.some((pos) => pos === "#")) {
    return false;
  }

  const sections = buildSections(sliced);

  let canMoveNext = true;
  for (const [begin, end] of sections) {
    canMoveNext =
      canMoveNext &&
      canMoveVertically(
        matrix,
        row + dir[0],
        fromCol + begin,
        fromCol + end,
        dir,
      );
  }
  return canMoveNext;
};

const moveVertically = (matrix, row, fromCol, toCol, dir) => {
  const currRow = matrix[row];
  const nextRow = matrix[row + dir[0]];

  fromCol -= currRow[fromCol] === "]" ? 1 : 0;
  toCol += currRow[toCol] === "[" ? 1 : 0;

  const sliced = nextRow.slice(fromCol, toCol + 1);

  if (sliced.some((pos) => pos !== ".")) {
    const sections = buildSections(sliced);
    for (const [begin, end] of sections) {
      moveVertically(matrix, row + dir[0], fromCol + begin, fromCol + end, dir);
    }
  }
  swap(currRow, nextRow, fromCol, toCol);
};

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  let [map, instructions] = parseGroupedInput(rawInput);
  map = map.map((line) => line.split(""));
  instructions = instructions.join("");

  let [row, col] = findStart(map, "@");

  for (let instruction of instructions) {
    const tempRow = row + dirs[instruction][0];
    const tempCol = col + dirs[instruction][1];

    if (map[tempRow][tempCol] !== "#") {
      if (map[tempRow][tempCol] === ".") {
        map[tempRow][tempCol] = "@";
        map[row][col] = ".";
        row = tempRow;
        col = tempCol;
      } else {
        let [pointerRow, pointerCol] = [tempRow, tempCol];
        while (map[pointerRow][pointerCol] !== "#") {
          pointerRow += dirs[instruction][0];
          pointerCol += dirs[instruction][1];

          if (map[pointerRow][pointerCol] === ".") {
            map[pointerRow][pointerCol] = "O";
            map[row][col] = ".";
            map[tempRow][tempCol] = "@";
            row = tempRow;
            col = tempCol;
            break;
          }
        }
      }
    }
  }

  return calcScore(map);
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  let [map, instructions] = parseGroupedInput(rawInput);
  map = map.map((line) => line.replaceAll(/./g, replacer).split(""));
  instructions = instructions.join("");

  let [row, col] = findStart(map, "@");

  for (let instruction of instructions) {
    const dir = dirs[instruction];
    const tempRow = row + dir[0];
    const tempCol = col + dir[1];

    if (map[tempRow][tempCol] !== "#") {
      if (map[tempRow][tempCol] === ".") {
        map[tempRow][tempCol] = "@";
        map[row][col] = ".";
        row = tempRow;
        col = tempCol;
      } else {
        if (instruction === "<" || instruction === ">") {
          let pointerCol = tempCol;
          while (map[row][pointerCol] !== "#") {
            pointerCol += dirs[instruction][1];

            if (map[row][pointerCol] === ".") {
              const spliced = map[row].splice(pointerCol, 1);
              map[row].splice(col, 0, ...spliced);
              row = tempRow;
              col = tempCol;
              break;
            }
          }
        } else {
          const canMove = canMoveVertically(map, row, col, col, dir);
          if (canMove) {
            moveVertically(map, row, col, col, dir);
            row = tempRow;
            col = tempCol;
          }
        }
      }
    }
  }

  return calcScore(map);
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `##########
      #..O..O.O#
      #......O.#
      #.OO..O.O#
      #..O@..O.#
      #O#..O...#
      #O..O..O.#
      #.OO.O.OO#
      #....O...#
      ##########

      <vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
      vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
      ><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
      <<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
      ^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
      ^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
      >^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
      <><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
      ^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
      v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`,
        expected: 10092,
      },
      {
        input: `########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<`,
        expected: 2028,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `##########
      #..O..O.O#
      #......O.#
      #.OO..O.O#
      #..O@..O.#
      #O#..O...#
      #O..O..O.#
      #.OO.O.OO#
      #....O...#
      ##########

      <vv>^<v^>v>^vv^v>v<>v^v<v<^vv<<<^><<><>>v<vvv<>^v^>^<<<><<v<<<v^vv^v>^
      vvv<<^>^v^^><<>>><>^<<><^vv^^<>vvv<>><^^v>^>vv<>v<<<<v<^v>^<^^>>>^<v<v
      ><>vv>v^v^<>><>>>><^^>vv>v<^^^>>v^v^<^^>v^^>v^<^v>v<>>v^v^<v>v^^<^^vv<
      <<v<^>>^^^^>>>v^<>vvv^><v<<<>^^^vv^<vvv>^>v<^^^^v<>^>vvvv><>>v^<<^^^^^
      ^><^><>>><>^^<<^^v>>><^<v>^<vv>>v>>>^v><>^v><<<<v>>v<v<v>vvv>^<><<>^><
      ^>><>^v<><^vvv<^^<><v<<<<<><^v<<<><<<^^<v<^^^><^>>^<v^><<<^>>^v<v^v<v^
      >^>>^v>vv>^<<^v<>><<><<v<<v><>v<^vv<<<>^^v^>^^>>><<^v>>v^v><^^>>^<>vv^
      <><^^>^^^<><vvvvv^v<v<<>^v<v>v<<^><<><<><<<^^<<<^<<>><<><^^^>^^<>^>v<>
      ^^>vv<^v^v<vv>^<><v<^v>^^^>>>^^vvv^>vvv<>>>^<^>>>>>^<<^v>^vvv<>^<><<v>
      v^^>>><<^^<>>^v^<v^vv<>v^<<>^<^v^v><^<<<><<^<v><v<>vv>>v><v^<vv<>v^<<^`,
        expected: 9021,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

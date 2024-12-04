import run from "aocrunner";
import { parseInput, parseGroupedInput, parseMatrix, parseTable, ascending, sum, transpose } from "../utils/index.js";

/**
 * Calculate the solution of part 1
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const lineLength = rawInput.indexOf("\n");
  // 0: get horizontal, 
  // lineLength: get vertical, 
  // lineLength - 1: get diagonal
  // lineLength + 1: get anti-diagonal
  const lengths = [0, lineLength - 1, lineLength, lineLength + 1];

  return lengths
    .map(length => new RegExp(`(?=X.{${length}}M.{${length}}A.{${length}}S|S.{${length}}A.{${length}}M.{${length}}X)`, "gs"))
    .map(regex => rawInput.match(regex))
    .map(matches => matches.length)
    .reduce(sum);
}

/**
 * Calculate the solution of part 2
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const input = parseMatrix(rawInput);

  let counter = 0;

  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < input.length; j++) {

      if (input[i][j] === "A") {
        const isMAS1 = input[i - 1]?.[j - 1] === "M"
          && input[i + 1]?.[j + 1] === "S";

        const isSAM1 = input[i - 1]?.[j - 1] === "S"
          && input[i + 1]?.[j + 1] === "M";

        const isMAS2 = input[i + 1]?.[j - 1] === "M"
          && input[i - 1]?.[j + 1] === "S";

        const isSAM2 = input[i + 1]?.[j - 1] === "S"
          && input[i - 1]?.[j + 1] === "M";

        if ((isMAS1 || isSAM1) && (isMAS2 || isSAM2)) {
          counter++;
        }
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
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 18,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`,
        expected: 9,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
import run from "aocrunner";
import { parseGroupedInput, rotateCounterClockwise } from "../utils/index.js";

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseGroupedInput(rawInput);

  const keys = input
    .filter(
      (schema) => !schema.at(0).includes("#") && !schema.at(-1).includes("."),
    )
    .map((lock) => rotateCounterClockwise(lock.map((row) => row.split(""))))
    .map((lock) => lock.map((row) => row.filter((c) => c === "#").length - 1))
    .map((lock) => lock.reverse());

  const locks = input
    .filter(
      (schema) => !schema.at(0).includes(".") && !schema.at(-1).includes("#"),
    )
    .map((lock) => rotateCounterClockwise(lock.map((row) => row.split(""))))
    .map((lock) => lock.map((row) => row.filter((c) => c === "#").length - 1))
    .map((lock) => lock.reverse());

  let counter = 0;
  for (let lock of locks) {
    for (let key of keys) {
      if (
        lock[0] + key[0] <= 5 &&
        lock[1] + key[1] <= 5 &&
        lock[2] + key[2] <= 5 &&
        lock[3] + key[3] <= 5 &&
        lock[4] + key[4] <= 5
      ) {
        counter++;
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
        input: `#####
.####
.####
.####
.#.#.
.#...
.....

#####
##.##
.#.##
...##
...#.
...#.
.....

.....
#....
#....
#...#
#.#.#
#.###
#####

.....
.....
#.#..
###..
###.#
###.#
#####

.....
.....
.....
#....
#.#..
#.#.#
#####`,
        expected: 3,
      },
    ],
    solution: part1,
  },
  trimTestInputs: true,
  onlyTests: false,
});

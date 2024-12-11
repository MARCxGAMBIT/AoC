import run from "aocrunner";
import { parseInput, cache } from "../utils/index.js";

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseInput(rawInput)[0].split(" ");

  let stones = input;

  for (let i = 0; i < 25; i++) {
    stones = stones.flatMap((n) =>
      n == 0 ? "1"
      : n.length % 2 == 0 ?
        [n.substring(0, n.length / 2), n.substring(n.length / 2).toString()]
      : (n * 2024).toString(),
    );
  }

  return stones.length;
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const input = parseInput(rawInput)[0].split(" ");

  let stones = input;

  for (let i = 0; i < 1; i++) {
    stones = stones.flatMap((n) =>
      n == 0 ? "1"
      : n.length % 2 == 0 ?
        [
          n.substring(0, n.length / 2),
          BigInt(n.substring(n.length / 2)).toString(),
        ]
      : BigInt(n * 2024).toString(),
    );
  }

  const a = input
.join("")
.split("")
.join("")
.split("");

  console.log(stones);

  return stones.length;
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `125 17`,
        expected: 55312,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `0`,
        expected: 0,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

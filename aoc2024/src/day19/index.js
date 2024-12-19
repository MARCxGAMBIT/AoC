import run from "aocrunner";
import { parseGroupedInput, cache } from "../utils/index.js";

const backtrack = (patterns, design, partialDesign) => {
  if (partialDesign.length === 0) {
    return 1;
  }
  let found = 0;
  for (let pattern of patterns) {
    if (partialDesign.indexOf(pattern) === 0) {
      found = backtrack(patterns, design, partialDesign.slice(pattern.length));
    }
    if (found) {
      break;
    }
  }
  return found;
};

const backtrack2 = cache((patterns, design, partialDesign) => {
  if (partialDesign.length === 0) {
    return 1;
  }
  let found = 0;
  for (let pattern of patterns) {
    if (partialDesign.indexOf(pattern) === 0) {
      found += backtrack2(
        patterns,
        design,
        partialDesign.slice(pattern.length),
      );
    }
  }
  return found;
});

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  let [patterns, designs] = parseGroupedInput(rawInput);
  patterns = patterns[0].split(", ");

  let counter = 0;
  for (let design of designs) {
    counter += backtrack(patterns, design, design);
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
  let [patterns, designs] = parseGroupedInput(rawInput);
  patterns = patterns[0].split(", ");

  let counter = 0;
  for (let design of designs) {
    counter += backtrack2(patterns, design, design);
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
        input: `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `r, wr, b, g, bwu, rb, gb, br

brwrr
bggr
gbbr
rrbgbr
ubwu
bwurrg
brgr
bbrgwb`,
        expected: 16,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

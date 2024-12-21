import run from "aocrunner";
import { cache, parseInput, parseMatrix, sum } from "../utils/index.js";

const numpad = parseMatrix(`789
456
123
.0A`);

const numCoords = numpad.reduce((acc, row, r) => {
  row.forEach((num, c) => {
    acc[num] = [r, c];
  });
  return acc;
}, {});

const dirpad = parseMatrix(`.^A
<v>`);

const dircoords = dirpad.reduce((acc, row, r) => {
  row.forEach((dir, c) => {
    acc[dir] = [r, c];
  });
  return acc;
}, {});

const findPathOnDirpad = cache((current, target, depth) => {
  if (depth === 0) {
    return target;
  }
  const [r, c] = dircoords[current];
  const [tr, tc] = dircoords[target];
  const rDiff = Math.abs(r - tr);
  const cDiff = Math.abs(c - tc);

  let horizontal = tc > c ? ">".repeat(cDiff) : "<".repeat(cDiff);
  let vertical = tr > r ? "v".repeat(rDiff) : "^".repeat(rDiff);

  let commands = "";
  // current row doesn't contain empty space => go horizontal first
  if (dirpad[r][tc] !== ".") {
    commands = horizontal + vertical + "A";
  } else {
    commands = vertical + horizontal + "A";
  }

  return [...commands]
    .map((cmd, i) => findPathOnDirpad(commands[i - 1] ?? "A", cmd, depth - 1))
    .join("");
});

const findPathOnNumpad = (current, target) => {
  const [r, c] = numCoords[current];
  const [tr, tc] = numCoords[target];
  const rDiff = Math.abs(r - tr);
  const cDiff = Math.abs(c - tc);

  let horizontal = tc > c ? ">".repeat(cDiff) : "<".repeat(cDiff);
  let vertical = tr > r ? "v".repeat(rDiff) : "^".repeat(rDiff);

  let commands = "";
  // current row doesn't contain empty space => go horizontal first
  if (numpad[r][tc] !== ".") {
    commands = horizontal + vertical + "A";
  } else {
    commands = vertical + horizontal + "A";
  }

  return [...commands]
    .map((cmd, i) => findPathOnDirpad(commands[i - 1] ?? "A", cmd, 2))
    .join("");
};

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseMatrix(rawInput);

  const instructions = input
    .map((row) => {
      const nestedInstruction = row
        .map((num, i) => findPathOnNumpad(row[i - 1] ?? "A", num))
        .join("");

      const num = Number(row.slice(0, -1).join(""));

      return nestedInstruction.length * num;
    })
    .reduce(sum);

  return instructions;
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `029A
980A
179A
456A
379A`,
        expected: 126384,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: ``,
        expected: 0,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

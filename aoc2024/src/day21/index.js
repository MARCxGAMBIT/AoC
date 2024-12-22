import run from "aocrunner";
import { cache, parseMatrix, stringPermutations, sum } from "../utils/index.js";

const dirs = {
  "v": [1, 0],
  "^": [-1, 0],
  ">": [0, 1],
  "<": [0, -1],
};

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

const filterPermutationsFor = (pad, r, c) => (path) => {
  let tempR = r;
  let tempC = c;
  for (let cmd of path) {
    [tempR, tempC] = [tempR + dirs[cmd][0], tempC + dirs[cmd][1]];
    if (pad[tempR][tempC] === ".") {
      return false;
    }
  }
  return true;
};

const findPathOnDirpad = cache((current, target, depth) => {
  if (depth === 0) {
    return 1;
  }
  const [r, c] = dircoords[current];
  const [tr, tc] = dircoords[target];
  const rDiff = r - tr;
  const cDiff = c - tc;

  let horizontal = tc > c ? ">".repeat(-cDiff) : "<".repeat(cDiff);
  let vertical = tr > r ? "v".repeat(-rDiff) : "^".repeat(rDiff);

  let baseCommands = horizontal + vertical;
  const permutations = stringPermutations(baseCommands);

  const commandVariants = permutations.filter(filterPermutationsFor(dirpad, r, c))
    .map((path) => `${path}A`);

  return Math.min(
    ...commandVariants.map((commands) =>
      [...commands]
        .map((cmd, i) =>
          findPathOnDirpad(commands[i - 1] ?? "A", cmd, depth - 1),
        )
        .reduce(sum),
    ),
  );
});

const findPathOnNumpad = (current, target, depth) => {
  const [r, c] = numCoords[current];
  const [tr, tc] = numCoords[target];
  const rDiff = r - tr;
  const cDiff = c - tc;

  let horizontal = tc > c ? ">".repeat(-cDiff) : "<".repeat(cDiff);
  let vertical = tr > r ? "v".repeat(-rDiff) : "^".repeat(rDiff);

  let baseCommands = horizontal + vertical;
  const permutations = stringPermutations(baseCommands);

  const commandVariants = permutations.filter(filterPermutationsFor(numpad, r, c))
    .map((path) => `${path}A`);

  return Math.min(
    ...commandVariants.map((commands) =>
      [...commands]
        .map((cmd, i) => findPathOnDirpad(commands[i - 1] ?? "A", cmd, depth))
        .reduce(sum),
    ),
  );
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
        .map((num, i) => findPathOnNumpad(row[i - 1] ?? "A", num, 2))
        .reduce(sum);

      const num = Number(row.slice(0, -1).join(""));

      return nestedInstruction * num;
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
  const input = parseMatrix(rawInput);

  const instructions = input
    .map((row) => {
      const nestedInstruction = row
        .map((num, i) => findPathOnNumpad(row[i - 1] ?? "A", num, 25))
        .reduce(sum);

      const num = Number(row.slice(0, -1).join(""));

      return nestedInstruction * num;
    })
    .reduce(sum);

  return instructions;
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
      // {
      //   input: ``,
      //   expected: 0,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

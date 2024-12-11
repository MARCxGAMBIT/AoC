import run from "aocrunner";
import { parseInput, sum, prod } from "../utils/index.js";

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const diskMap = [...parseInput(rawInput)[0]];

  const discSpace = diskMap.flatMap((x, i) => {
    return i % 2 === 0 ? Array(+x).fill(i / 2) : Array(+x).fill(".");
  });

  for (let i = discSpace.length - 1; i >= 0; --i) {
    if (discSpace[i] !== ".") {
      const emptyIdx = discSpace.indexOf(".");
      if (emptyIdx > i) {
        break;
      }
      const tmp = discSpace[i];
      discSpace[i] = discSpace[emptyIdx];
      discSpace[emptyIdx] = tmp;
    }
  }

  const usedSpace = discSpace.slice(0, discSpace.indexOf("."));
  return usedSpace.map(prod).reduce(sum);
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const diskMap = [...parseInput(rawInput)[0]];

  const diskSpace = diskMap.flatMap((x, i) => {
    return {
      len: +x,
      val: i % 2 === 0 ? (i / 2).toString() : ".",
    };
  });

  for (let i = diskSpace.length - 1; i > 0; --i) {
    const entry = diskSpace[i];
    if (entry.val !== ".") {
      const emptyIdx = diskSpace.findIndex(
        (e) => e.val === "." && e.len >= entry.len,
      );
      if (emptyIdx > i) {
        continue;
      }
      if (emptyIdx < 0) {
        continue;
      }
      diskSpace[emptyIdx].len -= entry.len;
      diskSpace.splice(i, 1);
      diskSpace.splice(i, 0, { len: entry.len, val: "." });
      diskSpace.splice(emptyIdx, 0, entry);
    }
  }

  return (
    diskSpace
      .filter((e) => e.len)
      .flatMap((e) => Array(e.len).fill(e.val))
      .map((n, i) => (n === "." ? 0 : +n * i))
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
        input: `2333133121414131402`,
        expected: 1928,
      },
      {
        input: `12345432101234543210`,
        expected: 1495,
      },
      {
        input: `012345012345012345`,
        expected: 708,
      },
      {
        input: `543210543210543210`,
        expected: 1443,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `2333133121414131402`,
        expected: 2858,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

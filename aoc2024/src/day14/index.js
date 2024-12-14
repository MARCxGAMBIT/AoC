import run from "aocrunner";
import { parseInput, prod } from "../utils/index.js";

const regex = /p=(-?\d+),(-?\d+) v=(-?\d+),(-?\d+)/gm;

const mod = (value, length) => {
  return ((value % length) + length) % length;
};

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const seconds = 100;

  const cols = rawInput.includes("test") ? 11 : 101; // x
  const rows = rawInput.includes("test") ? 7 : 103; // y
  const ignoreCol = Math.floor(cols / 2);
  const ignoreRow = Math.floor(rows / 2);

  const quadrants = parseInput(rawInput)
    .map((line) => line.matchAll(regex))
    .map((match) => [...match][0].slice(1, 5).map(Number))
    .map(([px, py, vx, vy]) => [
      mod(px + vx * seconds, cols),
      mod(py + vy * seconds, rows),
    ])
    .filter(([x, y]) => x !== ignoreCol && y !== ignoreRow)
    .reduce((acc, [x, y]) => {
      (acc[`${x < ignoreCol}${y < ignoreRow}`] ??= []).push([x, y]);
      return acc;
    }, {});

  return (
    Object.values(quadrants)
      .map((q) => q.length)
      .reduce(prod)
  );
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const cols = rawInput.includes("test") ? 11 : 101;
  const rows = rawInput.includes("test") ? 7 : 103;

  const coords = parseInput(rawInput)
    .map((line) => line.matchAll(regex))
    .map((match) => [...match][0].slice(1, 5).map(Number));

  let seconds = 0;

  while (true) {
    let occupied = new Set();

    for (const [px, py, vx, vy] of coords) {
      const x = mod(px + vx * seconds, cols);
      const y = mod(py + vy * seconds, rows);
      occupied.add(`${x},${y}`);
    }

    if (occupied.size === coords.length) {
      return seconds;
    }
    seconds++;
  }
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `testp=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
p=2,4 v=2,-3
p=9,5 v=-3,-3`,
        expected: 12,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

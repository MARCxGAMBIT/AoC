import run from "aocrunner";
import { parseInput, ascending, sum } from "../utils/index.js";

const mod = (a, b) => ((a % b) + b) % b;

const evolve = (secret) => {
  secret ^= secret * 64;
  secret = mod(secret, 16777216);
  secret ^= Math.floor(secret / 32);
  secret = mod(secret, 16777216);
  secret ^= secret * 2048;
  secret = mod(secret, 16777216);
  return secret;
};

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return (
    input.map(Number)
      .map((secret) => {
        for (let i = 0; i < 2000; i++) {
          secret = evolve(secret);
        }
        return secret;
      })
      .reduce(sum)
  );
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const trackers = input
    .map(Number)
    .map((secret) => {
      let prev1 = Infinity;
      let prev2 = Infinity;
      let prev3 = Infinity;
      let prev4 = Infinity;

      let price = mod(secret, 10);

      const tracker = {};

      for (let i = 0; i < 2000; i++) {
        secret = evolve(secret);

        prev4 = prev3;
        prev3 = prev2;
        prev2 = prev1;
        prev1 = price;
        price = mod(secret, 10);

        if (
          prev1 !== Infinity &&
          prev2 !== Infinity &&
          prev3 !== Infinity &&
          prev4 !== Infinity
        ) {
          const key = `${prev3 - prev4},${prev2 - prev3},${prev1 - prev2},${price - prev1}`;
          tracker[key] ??= price;
        }
      }
      return tracker;
    });

  const sequences = trackers.slice(1).reduce((acc, tracker) => {
    Object.entries(tracker).forEach(([key, value]) => {
      acc[key] = (acc[key] ?? 0) + value;
    });
    return acc;
  }, trackers[0]);

  return Object.values(sequences).sort(ascending).pop();
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `1
10
100
2024`,
        expected: 37327623,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `1
2
3
2024`,
        expected: 23,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

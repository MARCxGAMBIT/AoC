import run from "aocrunner";
import { parseGroupedInput, sum } from "../utils/index.js";

const regex = /X.(\d+), Y.(\d+)/gm;
/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseGroupedInput(rawInput);

  const conv = input
    .map((group) =>
      group.map((line) => {
        const [_, x, y] = [...line.matchAll(regex)][0];
        return [Number(x), Number(y)];
      }),
    )
    .map((group) => {
      const [a, b, prize] = group;
      const [ax, ay] = a;
      const [bx, by] = b;
      const [px, py] = prize;

      const aValue = (px * by - py * bx) / (ax * by - ay * bx);

      if (aValue % 1 === 0) {
        const bVal = (px - ax * aValue) / bx;

        if (bVal % 1 === 0) {
          return [aValue, bVal];
        }
      }
      return undefined;
    })
    .filter(Boolean)
    .map((pushes) => 3 * pushes[0] + 1 * pushes[1])
    .reduce(sum);

  return conv;
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const input = parseGroupedInput(rawInput);

  const conv = input
    .map((group) => {
      return group.map((line) => {
        const [_, x, y] = [...line.matchAll(regex)][0];
        return [Number(x), Number(y)];
      });
    })
    .map((group) => {
      const [a, b, prize] = group;
      const [ax, ay] = a;
      const [bx, by] = b;
      let [px, py] = prize;
      px += 10000000000000;
      py += 10000000000000;

      const aVal = (px * by - py * bx) / (ax * by - ay * bx);
      const aValid = aVal % 1 === 0;

      if (aValid) {
        const bVal = (px - ax * aVal) / bx;
        const bValid = bVal % 1 === 0;

        if (bValid) {
          return [aVal, bVal];
        }
      }
      return undefined;
    })
    .filter(Boolean)
    .map((x) => 3 * x[0] + 1 * x[1])
    .reduce(sum);

  return conv;
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
        expected: 480,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

Button A: X+26, Y+66
Button B: X+67, Y+21
Prize: X=12748, Y=12176

Button A: X+17, Y+86
Button B: X+84, Y+37
Prize: X=7870, Y=6450

Button A: X+69, Y+23
Button B: X+27, Y+71
Prize: X=18641, Y=10279`,
        expected: 875318608908,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

import run from "aocrunner";
import { parseInput, parseGroupedInput, parseMatrix, parseTable, ascending, sum } from "../utils/index.js";

/**
 * Calculate the solution of part 1
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
*/
const part1 = (rawInput) => {
  const ops = ["+", "*"];
  const input = parseInput(rawInput).map(line => line.split(": "));

  return input
    .filter(([testVal, equation]) => {

      const nums = equation.split(" ");
      const opCount = nums.length - 1;
      const permCount = parseInt("1".repeat(opCount), 2) + 1;

      const perms = Array
        .from({ length: permCount }, (_, i) => i.toString(2).padStart(opCount, "0"))
        .map(perm => perm.replaceAll(/0|1/g, (matched) => ops[matched]))
        .map(perm => perm.split(""));

      return perms
        .map(permOps => {
          return nums
            .reduce((accu, curr, i) => {
              if (i === 0) {
                accu.push("(".repeat(nums.length))
              }
              accu.push(curr);
              accu.push(")")
              if (permOps[i]) {
                accu.push(permOps[i]);
              }
              return accu;
            }, [])
        })
        .map(eq => eval(eq.join("")))
        .some(solution => solution == testVal)

    })
    .map(([testVal]) => testVal)
    .map(Number)
    .reduce(sum);
};

/**
 * Calculate the solution of part 2
 * 
 * @param {string} rawInput 
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const ops = ["+", "*", "|"];
  const input = parseInput(rawInput).map(line => line.split(": "));

  return input
    .filter(([testVal, equation]) => {

      const nums = equation.split(" ");
      const opCount = nums.length - 1;
      const permCount = parseInt("2".repeat(opCount), 3) + 1;

      const perms = Array
        .from({ length: permCount }, (_, i) => i.toString(3).padStart(opCount, "0"))
        .map(perm => perm.replaceAll(/0|1|2/g, (matched) => ops[matched]))
        .map(perm => perm.split(""));

      return perms
        .map(permOps => {
          return nums
            .reduce((accu, curr, i) => {
              if (i === 0) {
                accu.push("(+".repeat(nums.length))
              }
              const prevOp = permOps[i-1];
              const op = permOps[i];
              accu.push(prevOp === "|" ? `'${curr}'`: curr);
              accu.push(")")
              if (op) {
                accu.push(op === "|" ? "+" : op);
              }
              return accu;
            }, [])
        })
        .map(eq => eq.join(""))
        .some(eq => eval(eq) == testVal)
    })
    .map(([testVal]) => testVal)
    .map(Number)
    .reduce(sum);
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 3749,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `190: 10 19
3267: 81 40 27
83: 17 5
156: 15 6
7290: 6 8 6 15
161011: 16 10 13
192: 17 8 14
21037: 9 7 18 13
292: 11 6 16 20`,
        expected: 11387,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});
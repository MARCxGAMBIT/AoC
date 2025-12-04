/**
 * Root for your util libraries.
 *
 * You can import them in the src/template/index.js,
 * or in the specific file.
 *
 * Note that this repo uses ES Modules, so you have to explicitly specify
 * .js extension (yes, .js not .ts - even for TypeScript files)
 * for imports that are not imported from node_modules.
 *
 * For example:
 *
 *   correct:
 *
 *     import _ fro 'lodash
 *     import myLib from '../utils/myLib.js'
 *     import { myUtil } from '../utils/index.js'
 *
 *   incorrect:
 *
 *     import _ fro 'lodash
 *     import myLib from '../utils/myLib'
 *     import { myUtil } from '../utils'
 */

export const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.trim());

export const parseTable = (rawInput) =>
  rawInput.split("\n").map((line) => line.trim().split(/\s+/));

export const parseMatrix = (rawInput) =>
  rawInput.split("\n").map((line) => line.trim().split(""));

export const parseNumMatrix = (rawInput) =>
  rawInput.split("\n").map((line) => line.trim().split("").map(Number));

export const parseGroupedInput = (rawInput) =>
  rawInput
    .split("\n\n")
    .map((group) => group.split("\n").map((line) => line.trim()));

export const transpose = (matrix) =>
  matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));

export const rotateClockwise = (matrix) =>
  matrix[0].map((val, index) => matrix.map((row) => row[index]).reverse());

export const rotateCounterClockwise = (matrix) =>
  matrix[0].map((val, index) =>
    matrix.map((row) => row[row.length - 1 - index]),
  );

export const ascending = (a, b) => a - b;

export const descending = (a, b) => b - a;

export const sum = (a, b) => a + b;

export const prod = (a, b) => a * b;

export const splitAt = (delimiter) => (message) => message.split(delimiter);

export const cache = (fn) => {
  const mem = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (mem.has(key)) {
      return mem.get(key);
    }

    const result = fn.apply(this, args);
    mem.set(key, result);
    return result;
  };
};

export const findSymbol = (matrix, symbol) => {
  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] === symbol) {
        return [row, col];
      }
    }
  }
};

export const stringPermutations = (str) =>
  str.length <= 1
    ? [str]
    : [...str].flatMap((char, i) =>
        stringPermutations(str.slice(0, i) + str.slice(i + 1)).map(
          (p) => char + p,
        ),
      );

export const listPermutations = (arr) =>
  arr.length <= 1
    ? [arr]
    : arr.flatMap((val, i) =>
        listPermutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((p) => [
          val,
          ...p,
        ]),
      );

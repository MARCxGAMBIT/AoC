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

export function parseInput(rawInput) {
    return rawInput.split("\n").map((line) => line.trim());
}

export function parseTable(rawInput) {
    return rawInput.split("\n").map(line => line.trim().split(/\s+/));
}

export function parseMatrix(rawInput) {
    return rawInput.split("\n").map((line) => line.trim().split(""));
}

export function parseGroupedInput(rawInput) {
    return rawInput.split("\n\n").map((group) => group.split("\n").map((line) => line.trim()));
}

export function transpose(matrix) {
    return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export function ascending(a, b) {
    return a - b;
}

export function descending(a, b) {
    return b - a;
}

export function sum(a, b) {
    return a + b;
}

export function prod(a, b) {
    return a * b;
}
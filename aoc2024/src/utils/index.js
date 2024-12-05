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

export const parseInput =
    (rawInput) => rawInput.split("\n").map((line) => line.trim())

export const parseTable = (rawInput) =>
    rawInput
        .split("\n")
        .map(line => line.trim().split(/\s+/))

export const parseMatrix = (rawInput) =>
    rawInput
        .split("\n")
        .map((line) => line.trim().split(""))

export const parseGroupedInput = (rawInput) =>
    rawInput
        .split("\n\n")
        .map((group) => group.split("\n")
            .map((line) => line.trim()))

export const transpose = (matrix) => matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));

export const ascending = (a, b) => a - b

export const descending = (a, b) => b - a

export const sum = (a, b) => a + b

export const prod = (a, b) => a * b

export const splitAt = (delimiter) => (message) => message.split(delimiter)

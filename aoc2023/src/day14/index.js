import run from "aocrunner";
import { parseInput } from "../utils/index.js";

// a function that rotates a matrix clockwise 90 degrees with a focus on performance
const rotateClockwise = (matrix) => {
    const height = matrix.length;
    const halfHeight = height >> 1;
    const isOdd = height % 2 !== 0;

    for (let row = 0; row < halfHeight; row++) {
        const lastRow = height - 1 - row;

        for (let col = 0; col < halfHeight + isOdd; col++) {
            const lastCol = height - 1 - col;

            const temp = matrix[row][col];
            matrix[row][col] = matrix[lastCol][row];
            matrix[lastCol][row] = matrix[lastRow][lastCol];
            matrix[lastRow][lastCol] = matrix[col][lastRow];
            matrix[col][lastRow] = temp;
        }
    }
};

const calcWeight = (matrix) => matrix
    .map(row => row.filter(cell => cell === "O").length)
    .reduce((a, b, i) => a + b * (matrix[0].length - i), 0);


const tilt = (matrix) => {
    const height = matrix[0].length;
    const matrixLength = matrix.length;

    for (let col = 0; col < height; col++) {
        let maxStone = height;

        for (let row = 0; row < matrixLength; row++) {
            const cell = matrix[row][col];
            if (cell === "#") {
                maxStone = height - row - 1;
            } else if (cell === "O") {
                matrix[row][col] = ".";
                matrix[height - maxStone][col] = "O";
                maxStone--;
            }
        }
    }
};

const part1 = (rawInput) => {
    const input = parseInput(rawInput);

    const matrix = input.map(line => line.split(""));
    tilt(matrix);
    return calcWeight(matrix);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);
    let matrix = input.map(line => line.split(""));
    const weights = new Map();
    for (let i = 0; i < 1000000000; i++) {
        for (let j = 0; j < 4; j++) {
            tilt(matrix);
            rotateClockwise(matrix);
        }
        const weight = calcWeight(matrix);
        const key = matrix.toString();
        if (weights.has(key)) {
            const { i: index } = weights.get(key);
            const cycle = i - index;
            const relevantIndex = (1000000000 - index) % cycle + index - 1;
            const weightList = Array.from(weights);
            return weightList[relevantIndex][1].weight;
        }
        weights.set(key, { weight, i });
    }
};

run({
    part1: {
        tests: [
            {
                input: `O....#....
                O.OO#....#
                .....##...
                OO.#O....O
                .O.....O#.
                O.#..O.#.#
                ..O..#O..O
                .......O..
                #....###..
                #OO..#....`,
                expected: 136,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `O....#....
                O.OO#....#
                .....##...
                OO.#O....O
                .O.....O#.
                O.#..O.#.#
                ..O..#O..O
                .......O..
                #....###..
                #OO..#....`,
                expected: 64,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

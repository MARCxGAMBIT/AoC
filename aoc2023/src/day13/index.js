import run from "aocrunner";
import { transpose, parseGroupedInput } from "../utils/index.js";

const diffBetweenRows = (a, b) => {
    let diffs = 0;
    for (let i = 0; i < a.length; i++) {
        a[i] !== b[i] && diffs++;
    }
    return diffs;
}

const findReflection = (matrix, tolerance) => {
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i + 1] && diffBetweenRows(matrix[i], matrix[i + 1]) <= tolerance) {
            let diffCounter = 0;
            let reflIdx = 0
            for (let j = i; (j >= 0) && ((reflIdx = 2 * i - j + 1) < matrix.length); j--) {
                diffCounter += diffBetweenRows(matrix[j], matrix[reflIdx]);
                if (diffCounter > tolerance) {
                    break;
                }
                if ((j === 0 || reflIdx === matrix.length - 1) && diffCounter === tolerance) {
                    return i + 1;
                }
            }
        }
    }
    return 0;
}

const part1 = (rawInput) => {
    const input = parseGroupedInput(rawInput);

    let sum = 0;
    for (const group of input) {
        const matrix = group.map(line => line.split(""));
        const transposed = transpose(matrix);

        sum += 100 * findReflection(matrix, 0) + findReflection(transposed, 0);
    }

    return sum;
};

const part2 = (rawInput) => {
    const input = parseGroupedInput(rawInput);
    
    let sum = 0;
    for (const group of input) {
        const matrix = group.map(line => line.split(""));
        const transposed = transpose(matrix);

        sum += 100 * findReflection(matrix, 1) + findReflection(transposed, 1);
    }

    return sum;
};

run({
    part1: {
        tests: [
            {
                input: `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`,
                expected: 405,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`,
                expected: 400,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

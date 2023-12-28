import run from "aocrunner";
import { parseInput, parseGroupedInput, parseMatrix } from "../utils/index.js";

const overlaps = ([a,b]) => a[0] <= b[0] && a[1] >= b[1] || a[0] >= b[0] && a[1] <= b[1];
const overlapsPartially = ([a,b]) => a[0] <= b[0] && a[1] >= b[0] || a[0] >= b[0] && a[0] <= b[1];

const part1 = (rawInput) => {
    const input = parseInput(rawInput);

    const ranges = input
        .map((line) => line.split(",").map(range => range.split("-").map(Number)));

    return ranges.filter(overlaps).length;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    const ranges = input
        .map((line) => line.split(",").map(range => range.split("-").map(Number)));

    return ranges.filter(([a,b]) => overlapsPartially([a,b])).length;
};

run({
    part1: {
        tests: [
            {
                input: `2-4,6-8
              2-3,4-5
              5-7,7-9
              2-8,3-7
              6-6,4-6
              2-6,4-8`,
                expected: 2,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `2-4,6-8
                2-3,4-5
                5-7,7-9
                2-8,3-7
                6-6,4-6
                2-6,4-8`,
                expected: 4,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

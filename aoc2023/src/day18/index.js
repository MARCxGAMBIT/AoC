import run from "aocrunner";
import { parseInput } from "../utils/index.js";

const dirMap = {
    R: [0, 1],
    D: [1, 0],
    L: [0, -1],
    U: [-1, 0],
}

const calcInnerArea = (coords) => {
    let area = 0;

    for (let i = 0; i < coords.length; i++) {
        const [x1, y1] = coords[i];
        const [x2, y2] = coords[(i + 1) % coords.length];

        area += x1 * y2 - x2 * y1
    }

    return Math.abs(area) / 2;
}

const calcTotalArea = (instructions) => {
    const coords = [[0, 0]];
    let perimeter = 0;

    for (const [direction, distance] of instructions) {
        perimeter += distance;
        const [prevRow, prevCol] = coords.at(-1);
        const newRow = prevRow + dirMap[direction][0] * distance;
        const newCol = prevCol + dirMap[direction][1] * distance;
        coords.push([newRow, newCol]);
    }

    return calcInnerArea(coords) + (perimeter >> 1) + 1;
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);

    const instructions = input
        .map((line) => line.split(" "))
        .map((line) => [line[0], Number(line[1])]);

    return calcTotalArea(instructions);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);
    const directions = Object.keys(dirMap);

    const instructions = input
        .map((line) => line.split("#")[1])
        .map((hex) => [directions[hex.at(-2)], parseInt(hex.slice(0, -2), 16)]);

    return calcTotalArea(instructions);
};

run({
    part1: {
        tests: [
            {
                input: `R 6 (#70c710)
                D 5 (#0dc571)
                L 2 (#5713f0)
                D 2 (#d2c081)
                R 2 (#59c680)
                D 2 (#411b91)
                L 5 (#8ceee2)
                U 2 (#caa173)
                L 1 (#1b58a2)
                U 2 (#caa171)
                R 2 (#7807d2)
                U 3 (#a77fa3)
                L 2 (#015232)
                U 2 (#7a21e3)`,
                expected: 62,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `R 6 (#70c710)
                D 5 (#0dc571)
                L 2 (#5713f0)
                D 2 (#d2c081)
                R 2 (#59c680)
                D 2 (#411b91)
                L 5 (#8ceee2)
                U 2 (#caa173)
                L 1 (#1b58a2)
                U 2 (#caa171)
                R 2 (#7807d2)
                U 3 (#a77fa3)
                L 2 (#015232)
                U 2 (#7a21e3)`,
                expected: 952408144115,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

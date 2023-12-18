import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((line) => line.trim());

function calculateArea(coords) {
    let area = 0;

    for (let i = 0; i < coords.length; i++) {
        const [x1, y1] = coords[i];
        const [x2, y2] = coords[(i + 1) % coords.length];

        area += x1 * y2 - x2 * y1
    }

    return Math.abs(area) / 2;
}

const directions = ["R", "D", "L", "U"];
const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const calcAreaFromInstructions = (instructions) => {
    const coords = instructions.reduce((acc, [direction, distance], i) => {
        const [nextDirection] = instructions.at((i + 1) % instructions.length);
        const [prevDirection] = instructions.at(i - 1);

        let newDistance = distance;

        const dirIdx = directions.indexOf(direction);
        const a = directions.at(dirIdx - 1);
        const b = directions.at((dirIdx + 1) % directions.length);

        if (a === prevDirection && b === nextDirection) {
            newDistance += 1;
        } else if (a === nextDirection && b === prevDirection) {
            newDistance -= 1;
        }

        const coordChangeIdx = dirs.at(dirIdx);
        const [prevRow, prevCol] = acc.at(-1);
        const newRow = prevRow + coordChangeIdx[0] * newDistance;
        const newCol = prevCol + coordChangeIdx[1] * newDistance;
        acc.push([newRow, newCol]);
        return acc;
    }, [[0, 0]]);

    return calculateArea(coords);
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    const instructions = input
        .map((line) => line.split(" "))
        .map((line) => [line[0], Number(line[1])]);
    return calcAreaFromInstructions(instructions);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);
    const instructions = input
    .map(line => line.split("#")[1].replace(")", ""))
    .map(hex => [directions[hex.at(-1)], parseInt(hex.slice(0, -1), 16)]);

    return calcAreaFromInstructions(instructions);
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

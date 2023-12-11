import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((line) => line.trim().split(""));

const transpose = (universe) => universe[0].map((_, colIndex) => universe.map((row) => row[colIndex]));
const expand = (universe) => universe.flatMap(row => row.every(c => c === ".") ? [row, row] : [row]);

const diffBetweenCoords = (a, b) => Math.abs(a.row - b.row) + Math.abs(a.col - b.col);

const sum = (a, b) => a + b;

const part1 = (rawInput) => {
    const input = parseInput(rawInput);

    const emptyRows = input.map((row, i) => row.every(c => c === ".") ? i : -1).filter(i => i > -1);
    const emptyCols = transpose(input).map((col, i) => col.every(c => c === ".") ? i : -1).filter(i => i > -1);

    console.log({emptyRows, emptyCols});

    const expandedInput = expand(transpose(expand(transpose(input))));

    const coords = [];
    for (let row = 0; row < expandedInput.length; row++) {
        for (let col = 0; col < expandedInput[row].length; col++) {
            if (expandedInput[row][col] === "#") {
                coords.push({ row, col });
            }
        }
    }

    console.log(coords);
    return coords.reduce((acc, coord, i, array) => {
        const otherCoords = array.slice(i + 1);
        const diff = otherCoords.map(otherCoord => diffBetweenCoords(coord, otherCoord)).reduce(sum, 0);
        return acc + diff;
    }, 0);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    return;
};

run({
    part1: {
        tests: [
            {
                input: `...#......
                .......#..
                #.........
                ..........
                ......#...
                .#........
                .........#
                ..........
                .......#..
                #...#.....`,
                expected: 374,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: ``,
                expected: 0,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: true,
});

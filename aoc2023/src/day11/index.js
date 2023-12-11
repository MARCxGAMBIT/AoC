import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((line) => line.trim().split(""));

const transpose = (universe) => universe[0].map((_, colIndex) => universe.map((row) => row[colIndex]));

const diffBetweenCoords = (a, b, emptyRows, emptyCols, expansion) => {
    const [minRow, maxRow] = [Math.min(a.row, b.row), Math.max(a.row, b.row)];
    const [minCol, maxCol] = [Math.min(a.col, b.col), Math.max(a.col, b.col)];
    const expandedRows = emptyRows.filter(row => row > minRow && row < maxRow).length;
    const expandedCols = emptyCols.filter(col => col > minCol && col < maxCol).length;
    return Math.abs(a.row - b.row) + Math.abs(a.col - b.col) + (expandedRows + expandedCols) * (expansion - 1);
}

const indexIfEmpty = (row, i) => row.every(c => c === ".") ? i : -1;
const notEmpty = i => i > -1;
const sum = (a, b) => a + b;

const shortestDistances = (universe, expansion) => {
    const emptyRows = universe
        .map(indexIfEmpty)
        .filter(notEmpty);

    const emptyCols = transpose(universe)
        .map(indexIfEmpty)
        .filter(notEmpty);

    const coords = [];
    for (let row = 0; row < universe.length; row++) {
        for (let col = 0; col < universe[row].length; col++) {
            if (universe[row][col] === "#") {
                coords.push({ row, col });
            }
        }
    }
    return coords
        .map((coord, i, array) =>
            array.slice(i + 1)
                .map(other => diffBetweenCoords(coord, other, emptyRows, emptyCols, expansion))
                .reduce(sum, 0)
        )
        .reduce(sum, 0);
}

const part1 = (rawInput) => {
    const universe = parseInput(rawInput);
    return shortestDistances(universe, 2);
};

const part2 = (rawInput) => {
    const universe = parseInput(rawInput);
    // 100 for the testcase, 1000000 for the real input
    return shortestDistances(universe, 1000000);
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
                expected: 8410,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

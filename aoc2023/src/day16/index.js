import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((line) => line.trim().split(""));

const uniqeCoords = (cache) => {
    return new Set(Array.from(cache).map(x => x.split(",").slice(0, -1).join(","))).size;
}

const fsDirs = {
    E: ["N"],
    N: ["E"],
    S: ["W"],
    W: ["S"],
}

const bsDirs = {
    E: ["S"],
    S: ["E"],
    N: ["W"],
    W: ["N"],
}

const pipeDirs = {
    N: ["N"],
    S: ["S"],
    W: ["N", "S"],
    E: ["N", "S"],
}

const dashDirs = {
    E: ["E"],
    W: ["W"],
    N: ["W", "E"],
    S: ["W", "E"],
}

const symbolMap = {
    "/": fsDirs,
    "\\": bsDirs,
    "|": pipeDirs,
    "-": dashDirs,
}

const dirMap = {
    E: [0, 1],
    W: [0, -1],
    N: [-1, 0],
    S: [1, 0],
}

const newDirection = (currentDirection, symbol) => {
    return symbolMap[symbol]?.[currentDirection] ?? [currentDirection];
}

const walk = (map, row, col, direction, cache) => {
    const key = `${row},${col},${direction}`;
    if (cache.has(key)) {
        return;
    }
    cache.add(key);

    const symbol = map[row][col];
    const newDirections = newDirection(direction, symbol);

    for (const newDir of newDirections) {
        const [dRow, dCol] = dirMap[newDir];
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (newRow >= 0 && newRow < map.length && newCol >= 0 && newCol < map[0].length) {
            walk(map, newRow, newCol, newDir, cache);
        }
    }
    return cache;
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    const cache = walk(input, 0, 0, "E", new Set());

    return uniqeCoords(cache);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    const energized = [];

    for (let row = 0; row < input.length; row++) {
        const cacheEast = walk(input, row, 0, "E", new Set());
        const cacheWest = walk(input, row, input[0].length - 1, "W", new Set());
        energized.push(uniqeCoords(cacheEast));
        energized.push(uniqeCoords(cacheWest));
    }

    for (let col = 0; col < input[0].length; col++) {
        const cacheSouth = walk(input, 0, col, "S", new Set());
        const cacheNorth = walk(input, input.length - 1, col, "N", new Set());
        energized.push(uniqeCoords(cacheSouth));
        energized.push(uniqeCoords(cacheNorth));
    }

    return Math.max(...energized);
};

run({
    part1: {
        tests: [
            {
                input: String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`,
                expected: 46,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: String.raw`.|...\....
|.-.\.....
.....|-...
........|.
..........
.........\
..../.\\..
.-.-/..|..
.|....-|.\
..//.|....`,
                expected: 51,
            },
        ],
        solution: part2,
    },
    trimTestInputs: false,
    onlyTests: false,
});

import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((line) => line.trim());

const m = {
    "|": "┃",
    "-": "━",
    "L": "┗",
    "J": "┛",
    "F": "┏",
    "7": "┓",
    "S": "╋",
    ".": "•"
}

const printInput = (input) => input.map(line => line.replaceAll(/./g, (x) => m[x])).join("\n");

const dirMap = {
    "E": [0, 1],
    "W": [0, -1],
    "N": [-1, 0],
    "S": [1, 0],
}

const neighborMap = {
    "|": ["N", "S"],
    "-": ["E", "W"],
    "L": ["N", "E"],
    "J": ["N", "W"],
    "F": ["S", "E"],
    "7": ["S", "W"],
    "S": ["E", "W", "N", "S"],
    ".": [],
}

const conv = {
    "|": "x",
    "F": "x",
    "7": "x",
}

const convPipe = (input) => conv[input] ?? input;

const getUnvisitedNeighbors = (input, row, col, visited) => {
    const neighbors = [];
    for (const dir of neighborMap[input[row][col]]) {
        const [dRow, dCol] = dirMap[dir];
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (newRow >= 0 && newRow < input.length && newCol >= 0 && newCol < input[0].length && input[newRow][newCol] !== "." && !visited[newRow][newCol]) {
            neighbors.push([newRow, newCol]);
        }
    }
    return neighbors;
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    console.log(printInput(input));

    const startRow = input.findIndex(line => line.includes("S"));
    const startCol = input[startRow].indexOf("S");

    // create a 2d array the same size as input but filled with 0s
    const visited = Array.from({ length: input.length }, () => Array.from({ length: input[0].length }, () => 0));

    visited[startRow][startCol] = 1;

    let [neighbor] = getUnvisitedNeighbors(input, startRow, startCol, visited);
    let steps = 1;
    while (neighbor) {
        const [row, col] = neighbor;
        visited[row][col] = 1;
        [neighbor] = getUnvisitedNeighbors(input, row, col, visited)
        steps++;
    }

    return steps / 2;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    // code assumes that you manually modify the S to be the correct pipe
    // const startRow = 0;
    const startRow = 50;
    // const startCol = 4;
    const startCol = 39;

    const visited = Array.from({ length: input.length }, () => Array.from({ length: input[0].length }, () => 0));

    let [neighbor] = getUnvisitedNeighbors(input, startRow, startCol, visited);
    while (neighbor) {
        const [row, col] = neighbor;
        visited[row][col] = convPipe(input[row][col]);
        [neighbor] = getUnvisitedNeighbors(input, row, col, visited)
    }

    return visited
        .map(row => row.filter(cell => cell.toString() === "0" || cell === "x").join(""))
        .map(line => line.replaceAll("xx", ""))
        .map(line => [...line.matchAll(/x(0+)x/g)])
        .filter(line => line.length > 0)
        .flatMap(line => line.map(match => match[1].length))
        .reduce((acc, cur) => acc + cur, 0);
};

run(
    {
    // part1: {
    //     tests: [
    //         {
    //             input: `.....
    //             .S-7.
    //             .|.|.
    //             .L-J.
    //             .....`,
    //             expected: 4,
    //         },
    //         {
    //             input: `..F7.
    //             .FJ|.
    //             SJ.L7
    //             |F--J
    //             LJ...`,
    //             expected: 8,
    //         },
    //     ],
    //     solution: part1,
    // },
    part2: {
        tests: [
            // {
            //     input: `.F----7F7F7F7F-7....
            //     .|F--7||||||||FJ....
            //     .||.FJ||||||||L7....
            //     FJL7L7LJLJ||LJ.L-7..
            //     L--J.L7...LJS7F-7L7.
            //     ....F-J..F7FJ|L7L7L7
            //     ....L7.F7||L7|.L7L7|
            //     .....|FJLJ|FJ|F7|.LJ
            //     ....FJL-7.||.||||...
            //     ....L---J.LJ.LJLJ...`,
            //     expected: 8,
            // },
            // {
            //     input: `FF7FSF7F7F7F7F7F---7
            //     L|LJ||||||||||||F--J
            //     FL-7LJLJ||||||LJL-77
            //     F--JF--7||LJLJ7F7FJ-
            //     L---JF-JLJ.||-FJLJJ7
            //     |F|F-JF---7F7-L7L|7|
            //     |FFJF7L7F-JF7|JL---7
            //     7-L-JL7||F7|L7F-7F7|
            //     L.L7LFJ|||||FJL7||LJ
            //     L7JLJL-JLJLJL--JLJ.L`,
            //     expected: 10,
            // },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});
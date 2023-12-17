import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((line) => line.trim().split("").map(Number));

const getNeighbors = (current, input, came_from) => {
    const [row, col] = current;
    const neighbors = [];
    const prev = came_from[current];
    // const prev2 = came_from[prev1];
    // const prev3 = came_from[prev2];
    // const validPredecessor = [prev1, prev2, prev3].filter(Boolean);

    if (row > 0) {
        neighbors.push([row - 1, col]);
    }
    if (row < input.length - 1) {
        neighbors.push([row + 1, col]);
    }
    if (col > 0) {
        neighbors.push([row, col - 1]);
    }
    if (col < input[0].length - 1) {
        neighbors.push([row, col + 1]);
    }

    return neighbors.filter(([row, col]) => row !== prev?.[0] && col !== prev?.[1]);
};

const part1 = (rawInput) => {
    const input = parseInput(rawInput);

    const queue = [];
    const start = [0, 0];
    const goal = [input.length - 1, input[0].length - 1];

    queue.push(start);
    const came_from = { [start]: null };

    while (queue.length > 0) {
        const current = queue.shift();

        if (current.toString() === goal) {
            break;
        }

        const neighbors = getNeighbors(current, input, came_from);
        for (const neighbor of neighbors) {
            if (!(neighbor in came_from)) {
                queue.push(neighbor);
                came_from[neighbor] = current;
            }
        }
    }


    console.log(came_from);


    return;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);
    return;
};

run({
    part1: {
        tests: [
            {
                input: `2413432311323
                3215453535623
                3255245654254
                3446585845452
                4546657867536
                1438598798454
                4457876987766
                3637877979653
                4654967986887
                4564679986453
                1224686865563
                2546548887735
                4322674655533`,
                expected: 102,
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

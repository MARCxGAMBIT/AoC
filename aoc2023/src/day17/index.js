import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((line) => line.trim().split("").map(Number));

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    push(item, priority) {
        this.elements.push({ item, priority });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    shift() {
        return this.elements.shift().item;
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const getNeighbors = (current, input, came_from) => {
    const [row, col] = current;
    const previous = came_from[current];
    const neighbors = [];

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

    return neighbors.filter(ele => ele.toString() !== previous?.toString());
};

const part1 = (rawInput) => {
    const input = parseInput(rawInput);

    const queue = new PriorityQueue();

    const start = [0, 0];
    const goal = [input.length - 1, input[0].length - 1];

    queue.push(start, 0);
    const came_from = { [start]: null };
    const costs = { [start]: input[start[0]][start[1]] };

    while (!queue.isEmpty()) {
        const current = queue.shift();

        // if (current.toString() === goal.toString()) {
        //     break;
        // }

        const neighbors = getNeighbors(current, input, came_from);
        for (const next of neighbors) {
            const new_cost = costs[current] + input[next[0]][next[1]];
            if (!(next in costs) || new_cost < costs[next]) {
                came_from[next] = current;
                costs[next] = new_cost;
                queue.push(next, new_cost);
            }
        }
    }

    let current = goal;
    const path = [];
    while (current && current.toString() !== start.toString()) {
        path.push(current);
        current = came_from[current];
    }
    path.push(start);
    path.reverse();
    const p = path.map(x => x.toString())

    // create array the same size as input filled with 0
    const output = Array.from({ length: input.length }, () => Array.from({ length: input[0].length }, () => 0));
    Object.entries(costs).forEach(([key, value]) => {
        const [row, col] = key.split(",").map(Number);
        output[row][col] = value;
        if (p.includes(key)) {
            output[row][col] += "!";
        }
    });

    console.table(output);



    return costs[goal];
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

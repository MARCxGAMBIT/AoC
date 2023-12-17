import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((line) => line.trim().split("").map(Number));

class PriorityQueue {
    constructor() {
        this.elements = [];
    }

    push(item, priority, direction) {
        this.elements.push({ item, priority, direction });
        this.elements.sort((a, b) => a.priority - b.priority);
    }

    shift() {
        return this.elements.shift();
    }

    isEmpty() {
        return this.elements.length === 0;
    }
}

const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];

const isCoordValid = ([row, col], input) => row >= 0 && row < input.length && col >= 0 && col < input[0].length;

const findMinimalHeatloss = (input, minSteps, maxSteps) => {
    const queue = new PriorityQueue();

    const start = [0, 0];
    const goal = [input.length - 1, input[0].length - 1];

    queue.push(start, 0, -5);
    const costs = { [[...start, -5]]: 0 };

    while (!queue.isEmpty()) {
        const { item, direction } = queue.shift();
        const currentKey = [...item, direction];

        if (item.toString() === goal.toString()) {
            break;
        }

        for (let dir = 0; dir < dirs.length; dir++) {
            if (dir === direction || dir === (direction + 2) % 4) {
                continue;
            }

            let costIncrease = 0;

            for (let distance = 1; distance <= maxSteps; distance++) {
                const nextRow = item[0] + dirs[dir][0] * distance;
                const nextCol = item[1] + dirs[dir][1] * distance;
                const nextCoord = [nextRow, nextCol];

                if (isCoordValid(nextCoord, input)) {
                    costIncrease += input[nextRow][nextCol];

                    if (distance < minSteps) {
                        continue;
                    }
                    const next_cost = costs[currentKey] + costIncrease;
                    const next_key = [...nextCoord, dir];
                    if (!(next_key in costs) || next_cost < costs[next_key]) {
                        costs[next_key] = next_cost;
                        queue.push(nextCoord, next_cost, dir);
                    }
                }
            }
        }
    }

    return Math.min(costs[[...goal, 0]] ?? Infinity, costs[[...goal, 1]] ?? Infinity);
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);

    return findMinimalHeatloss(input, 1, 3);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);
    return findMinimalHeatloss(input, 4, 10);
};

run({
    part1: {
        tests: [
            {
                input: `112999
                911111`,
                expected: 7,
            },
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
                expected: 94,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

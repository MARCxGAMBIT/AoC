import run from "aocrunner";
import { parseInput } from "../utils/index.js";

const simulateFall = (snapshot) => {
    const heights = Array.from({ length: 10 }, () => Array.from({ length: 10 }, () => 0));

    for (let i = 0; i < snapshot.length; i++) {
        const brick = snapshot[i];
        const [x1, y1, z1, x2, y2, z2] = brick;
        let peaks = [];
        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                peaks.push(heights[x][y]);
            }
        }
        const maxPeak = Math.max(...peaks);
        const height = z2 - z1 + 1;
        for (let x = x1; x <= x2; x++) {
            for (let y = y1; y <= y2; y++) {
                heights[x][y] = maxPeak + height;
            }
        }
        brick[2] = maxPeak + 1;
        brick[5] = maxPeak + height;
    }
}

const countDiff = (a, b) => {
    let counter = 0;
    for (let i = 0; i < a.length; i++) {
        (a[i] !== b[i]) && counter++;
    }
    return counter;
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);

    const snapshot = input
        .map(line => line.split(/~|,/).map(Number))
        .sort((a, b) => a[2] - b[2]);

    simulateFall(snapshot);

    let counter = 0;
    for (let i = 0; i < snapshot.length; i++) {
        const copy = JSON.parse(JSON.stringify(snapshot.slice(0, i).concat(snapshot.slice(i + 1))));
        const originalZ = copy.map(brick => brick[2]);
        simulateFall(copy);
        const droppedZ = copy.map(brick => brick[2]);
        if (countDiff(originalZ, droppedZ) === 0) {
            counter++;
        }
    }

    return counter;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    const snapshot = input
        .map(line => line.split(/~|,/).map(Number))
        .sort((a, b) => a[2] - b[2]);

    simulateFall(snapshot);

    let counter = 0;
    for (let i = 0; i < snapshot.length; i++) {
        const copy = JSON.parse(JSON.stringify(snapshot.slice(0, i).concat(snapshot.slice(i + 1))));
        const originalZ = copy.map(brick => brick[2]);
        simulateFall(copy);
        const droppedZ = copy.map(brick => brick[2]);
        counter += countDiff(originalZ, droppedZ)
    }

    return counter;
};

run({
    part1: {
        tests: [
            {
                input: `1,0,1~1,2,1
0,0,2~2,0,2
0,2,3~2,2,3
0,0,4~0,2,4
2,0,5~2,2,5
0,1,6~2,1,6
1,1,8~1,1,9`,
                expected: 5,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `1,0,1~1,2,1
                0,0,2~2,0,2
                0,2,3~2,2,3
                0,0,4~0,2,4
                2,0,5~2,2,5
                0,1,6~2,1,6
                1,1,8~1,1,9`,
                expected: 7,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

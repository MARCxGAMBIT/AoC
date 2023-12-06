import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    const [timeLine, distancesLine] = input.map(line => line.split(":")[1].trim().split(/\s+/).map(Number));

    let prod = 1;
    for (let time of timeLine) {
        const recordTime = Math.floor(time / 2);
        const recordDistance = distancesLine[timeLine.indexOf(time)];

        let i = 0;
        let minTime = recordTime;
        while (recordTime / 2 ** i > 1) {
            i++;
            const change = Math.ceil(recordTime / 2 ** i);
            const newTime = minTime - change;
            const newDistance = newTime * (time - newTime);
            if (newDistance > recordDistance) {
                minTime = newTime;
            }
        }
        prod *= (recordTime - minTime + 1) * 2 - (time + 1) % 2;
    }

    return prod;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);
    const [time, recordDistance] = input.map(line => +line.split(":")[1].trim().split(/\s+/).join(""));

    let prod = 1;
    const recordTime = Math.floor(time / 2);

    let i = 0;
    let minTime = recordTime;
    while (recordTime / 2 ** i > 1) {
        i++;
        const change = Math.ceil(recordTime / 2 ** i);
        const newTime = minTime - change;
        const newDistance = newTime * (time - newTime);
        if (newDistance > recordDistance) {
            minTime = newTime;
        }
    }
    prod *= (recordTime - minTime + 1) * 2 - (time + 1) % 2;

    return prod;
};

run({
    part1: {
        tests: [
            {
                input: `Time:      7  15   30
                Distance:  9  40  200`,
                expected: 288,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `Time:      7  15   30
                Distance:  9  40  200`,
                expected: 71503,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

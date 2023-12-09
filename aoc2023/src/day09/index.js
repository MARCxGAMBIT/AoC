import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n").map((line) => line.trim());

const diffNums = (nums) => {
    const diffs = [];
    for (let i = 0; i < nums.length - 1; i++) {
        diffs.push(nums[i + 1] - nums[i]);
    }
    return diffs;
};

const recCalcNext = (nums) => {
    if (nums.every(n => n === 0)) {
        return 0;
    }
    return recCalcNext(diffNums(nums)) + nums.pop();
}

const recCalcPrev = (nums) => {
    if (nums.every(n => n === 0)) {
        return 0;
    }
    return -recCalcPrev(diffNums(nums)) + nums.shift();
}

const sum = (acc, cur) => acc + cur;

const extractNums = line => line.match(/-?\d+/g).map(Number);

const part1 = (rawInput) => {
    const input = parseInput(rawInput);

    const d = input
        .map(extractNums)
        .map(recCalcNext)
        .reduce(sum);

    return d;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    return input
        .map(extractNums)
        .map(recCalcPrev)
        .reduce(sum);
};

run({
    part1: {
        tests: [
            {
                input: `0 3 6 9 12 15
                1 3 6 10 15 21
                10 13 16 21 30 45`,
                expected: 114,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `0 3 6 9 12 15
                1 3 6 10 15 21
                10 13 16 21 30 45`,
                expected: 2,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

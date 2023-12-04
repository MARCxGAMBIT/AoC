import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
    const lines = parseInput(rawInput)

    return lines.map((line) => line.split(" "))
        .map(([opponent, me]) => [opponent.charCodeAt(0) - 64, me.charCodeAt(0) - 87])
        .reduce((acc, [opponent, me]) => {
            if (opponent === me) {
                acc += 3;
            } else if ((opponent - me + 3) % 3 === 2) {
                acc += 6;
            }
            acc += me;
            return acc;
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
                input: `A X
                A Y
                A Z
                B X
                B Y
                B Z
                C X
                C Y
                C Z`,
                expected: 45,
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
    onlyTests: false,
});

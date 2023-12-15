import run from "aocrunner";
import { parseInput, sum } from "../utils/index.js";

const focusingPower = (acc, focalLength, i) => acc + Number(focalLength) * (i + 1);
const totalFocusingPower = (acc, [boxnum, lenses]) => acc + (Number(boxnum) + 1) * Object.values(lenses).reduce(focusingPower, 0);

const step = (accu, char) => (accu + char.charCodeAt(0)) * 17 % 256;
const hash = (string) => [...string].reduce(step, 0);

const part1 = (rawInput) => {
    const input = parseInput(rawInput)[0];

    return input
        .split(",")
        .map(hash)
        .reduce(sum);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput)[0];

    const hashmap = input.split(",")
        .reduce((accu, instruction) => {
            const [label, focalLength] = instruction.split(/=|-/);
            const boxnum = hash(label);
            if (focalLength) {
                const box = accu[boxnum] ?? {};
                box[label] = focalLength;
                accu[boxnum] = box;
            } else {
                delete accu[boxnum]?.[label];
            }
            return accu;
        }, {});

    return Object.entries(hashmap)
        .reduce(totalFocusingPower, 0);
};

run({
    part1: {
        tests: [
            {
                input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
                expected: 1320,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`,
                expected: 145,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

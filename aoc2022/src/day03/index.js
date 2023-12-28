import run from "aocrunner";
import { parseInput, sum } from "../utils/index.js";

const getIntersection = (a, b) => {
    const intersection = new Set();
    for (const el of a) {
        if (b.includes(el)) {
            intersection.add(el);
        }
    }
    return intersection;
}

const getIntersection2 = (a, b, c) => {
    const intersection = new Set();
    for (const el of a) {
        if (b.includes(el) && c.includes(el)) {
            intersection.add(el);
        }
    }
    return intersection;
}

const getPriority = (set) => {
    let priority = 0;
    for (const el of set) {
        let value = el.charCodeAt(0) - 38;
        if (value > 58) {
            value -= 58
        }
        priority += value;
    }
    return priority;
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    return input
        .map((line) => getIntersection(line.slice(0, line.length / 2), line.slice(line.length / 2)))
        .map((set) => getPriority(set))
        .reduce(sum, 0);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    return input
        .reduce((acc, line, i) => {
            if (i % 3 === 0) {
                acc.push([]);
            }
            acc.at(-1).push(line);
            return acc;
        }, [])
        .map(([a, b, c]) => getIntersection2(a, b, c))
        .map((set) => getPriority(set))
        .reduce(sum, 0);
};

run({
    part1: {
        tests: [
            {
                input: `vJrwpWtwJgWrhcsFMMfFFhFp
              jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
              PmmdzqPrVvPwwTWBwg
              wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
              ttgJtRGJQctTZtZT
              CrZsJsPPZsGzwwsLwLmpwMDw`,
                expected: 157,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `vJrwpWtwJgWrhcsFMMfFFhFp
                jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
                PmmdzqPrVvPwwTWBwg
                wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
                ttgJtRGJQctTZtZT
                CrZsJsPPZsGzwwsLwLmpwMDw`,
                expected: 70,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

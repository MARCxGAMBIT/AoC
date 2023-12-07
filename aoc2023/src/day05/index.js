import run from "aocrunner";

import {
    Worker,
    isMainThread
} from "worker_threads";

const __dirname = new URL('.', import.meta.url).pathname;

const parseInput = (rawInput) => rawInput.split("\n");

const extractSourceAndDestinationInfo = (acc, curr) => {
    if (curr.includes("map")) {
        acc.push([])
    } else if (curr !== "") {
        acc[acc.length - 1].push(curr.trim().split(" ").map(Number))
    }
    return acc
}

const generateMappingFunctions = categoryRanges =>
    (input) => {
        const isInputInRange = ([_, source, len]) => source <= input && input <= source + len - 1
        const range = categoryRanges
            .find(isInputInRange);
        if (!range) {
            return input;
        }
        const [destination, source] = range;
        return input - source + destination;
    }

const convertMatchToNumber = ([v]) => Number(v);

const findNumbersInString = (str) => [...str.matchAll(/\d+/g)]
    .map(convertMatchToNumber);

const findLocation = (mapping) =>
    (seed) => mapping.reduce((acc, func) => func(acc), seed);


const part1 = (rawInput) => {
    const input = parseInput(rawInput);
    const [seedsInfo, ...rest] = input;

    const mapping = rest
        .reduce(extractSourceAndDestinationInfo, [])
        .map(generateMappingFunctions);

    const convertSeedToLocation = (seed) => findLocation(mapping)(seed);

    const locations = findNumbersInString(seedsInfo)
        .map(convertSeedToLocation)

    return Math.min(...locations)
};

const part2 = async (rawInput) => {
    const input = parseInput(rawInput);
    const [seedsLine, ...rest] = input;
    const seedsInfo = findNumbersInString(seedsLine).reduce((acc, curr, i) => {
        if (i % 2 === 0) {
            acc.push([curr])
        } else {
            acc[acc.length - 1].push(curr)
        }
        return acc;
    }, []);

    const minLocation = await new Promise((resolve, reject) => {
        const threads = new Set();
        const locations = [];
        for (const [i, workerData] of seedsInfo.entries()) {
            const worker = new Worker('./src/day05/worker.js', {
                workerData
            });
            threads.add(worker);
            worker.on('message', (msg) => {
                if (msg.min) {
                    locations.push(msg.min);
                    console.log(`Worker ${i} has found a location ${msg.min}`)
                } else if (msg.i) {
                    console.log(`Worker ${i} has processed ${msg.i} seeds`)
                }
            });
            worker.on('error', console.error);
            worker.on('exit', (code) => {
                threads.delete(worker);
                if (threads.size === 0) {
                    resolve(Math.min(...locations));
            }
            });
        }
    });

    return minLocation;
};


run({
    part1: {
        tests: [
            {
                input: `seeds: 79 14 55 13

                seed-to-soil map:
                50 98 2
                52 50 48
                
                soil-to-fertilizer map:
                0 15 37
                37 52 2
                39 0 15
                
                fertilizer-to-water map:
                49 53 8
                0 11 42
                42 0 7
                57 7 4
                
                water-to-light map:
                88 18 7
                18 25 70
                
                light-to-temperature map:
                45 77 23
                81 45 19
                68 64 13
                
                temperature-to-humidity map:
                0 69 1
                1 0 69
                
                humidity-to-location map:
                60 56 37
                56 93 4`,
                expected: 35,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `seeds: 79 14 55 13

                seed-to-soil map:
                50 98 2
                52 50 48
                
                soil-to-fertilizer map:
                0 15 37
                37 52 2
                39 0 15
                
                fertilizer-to-water map:
                49 53 8
                0 11 42
                42 0 7
                57 7 4
                
                water-to-light map:
                88 18 7
                18 25 70
                
                light-to-temperature map:
                45 77 23
                81 45 19
                68 64 13
                
                temperature-to-humidity map:
                0 69 1
                1 0 69
                
                humidity-to-location map:
                60 56 37
                56 93 4`,
                expected: 46,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

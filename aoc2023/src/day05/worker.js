import { isMainThread, parentPort, workerData } from "node:worker_threads";
import fs from "node:fs/promises";

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

const findLocation = (mapping) =>
    (seed) => mapping.reduce((acc, func) => func(acc), seed);

if (!isMainThread) {
    const rawInput = await fs.readFile("./src/day05/input.txt", "utf-8");

    const [seedIdx, seedLength] = workerData;


    const input = parseInput(rawInput);
    const [_, ...rest] = input;

    const mapping = rest
        .reduce(extractSourceAndDestinationInfo, [])
        .map(generateMappingFunctions);

    const convertSeedToLocation = (seed) => findLocation(mapping)(seed);

    let min = Number.MAX_SAFE_INTEGER;

    for (let i = 0; i < seedLength; i++) {
        const location = convertSeedToLocation(seedIdx + i);
        if (location < min) {
            min = location;
        }
        if (i % 10000000 === 0) {
            parentPort.postMessage({i})
        }
    }
    parentPort.postMessage({min});
}

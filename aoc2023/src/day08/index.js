import run from "aocrunner";
import lcm from "compute-lcm";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.trim());

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const [instructions, _, ...nodes] = input;

  const map = nodes.reduce((acc, curr) => {
    const [key, value] = curr.split(" = ");
    const targets = value.match(/(\w+)/g);
    acc[key] = targets;
    return acc;
  }, {});

  let i = 0;
  const max = instructions.length;
  let currentNode = "AAA";
  const lastNode = "ZZZ";

  while (true) {
    const instruction = instructions[i++ % max];
    currentNode = map[currentNode][instruction === "R" ? 1 : 0];
    if (currentNode === lastNode) {
      return i;
    }
  }
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  const [instructions, _, ...nodes] = input;

  const map = nodes.reduce((acc, curr) => {
    const [key, value] = curr.split(" = ");
    const targets = value.match(/(\w+)/g);
    acc[key] = targets;
    return acc;
  }, {});

  const startingNodes = Object.keys(map).filter((key) => key.endsWith("A"));

  const distances = startingNodes.map((node) => {
    let i = 0;
    const max = instructions.length;
    let currentNode = node;

    while (true) {
      const instruction = instructions[i++ % max];
      currentNode = map[currentNode][instruction === "R" ? 1 : 0];
      if (currentNode.endsWith("Z")) {
        return i;
      }
    }
  });

  return lcm(...distances);
};

run({
  part1: {
    tests: [
      {
        input: `RL

                AAA = (BBB, CCC)
                BBB = (DDD, EEE)
                CCC = (ZZZ, GGG)
                DDD = (DDD, DDD)
                EEE = (EEE, EEE)
                GGG = (GGG, GGG)
                ZZZ = (ZZZ, ZZZ)`,
        expected: 2,
      },
      {
        input: `LLR

                AAA = (BBB, BBB)
                BBB = (AAA, ZZZ)
                ZZZ = (ZZZ, ZZZ)`,
        expected: 6,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `LR

                11A = (11B, XXX)
                11B = (XXX, 11Z)
                11Z = (11B, XXX)
                22A = (22B, XXX)
                22B = (22C, 22C)
                22C = (22Z, 22Z)
                22Z = (22B, 22B)
                XXX = (XXX, XXX)`,
        expected: 6,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

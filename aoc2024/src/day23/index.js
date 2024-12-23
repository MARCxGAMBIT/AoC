import run from "aocrunner";
import { parseInput } from "../utils/index.js";

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const connections = {};
  const computers = new Set();

  input.forEach((line) => {
    const [from, to] = line.split("-");
    computers.add(from);
    computers.add(to);

    (connections[from] ??= new Set()).add(to);
    (connections[to] ??= new Set()).add(from);
  });

  const threeways = {};

  for (let mainComp of computers) {
    const mainConnections = connections[mainComp];
    for (let secondComp of mainConnections) {
      const secondaryConnections = connections[secondComp];
      for (let thirdComp of secondaryConnections) {
        if (mainConnections.has(thirdComp)) {
          const threeway = [mainComp, secondComp, thirdComp];
          if (threeway.some((comp) => comp.startsWith("t"))) {
            threeways[threeway.sort()] = true;
          }
        }
      }
    }
  }

  return Object.keys(threeways).length;
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const connections = {};
  const computers = new Set();

  input.forEach((line) => {
    const [from, to] = line.split("-");
    computers.add(from);
    computers.add(to);

    (connections[from] ??= new Set()).add(to);
    (connections[to] ??= new Set()).add(from);
  });

  const threeways = {};

  for (let mainComp of computers) {
    const mainConnections = connections[mainComp];
    for (let secondComp of mainConnections) {
      const secondaryConnections = connections[secondComp];
      for (let thirdComp of secondaryConnections) {
        if (mainConnections.has(thirdComp)) {
          const threeway = [mainComp, secondComp, thirdComp];
          if (threeway.some((comp) => comp.startsWith("t"))) {
            threeways[threeway.sort()] = true;
          }
        }
      }
    }
  }

  // loop at triplets
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`,
        expected: 7,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `kh-tc
qp-kh
de-cg
ka-co
yn-aq
qp-ub
cg-tb
vc-aq
tb-ka
wh-tc
yn-cg
kh-ub
ta-co
de-co
tc-td
tb-wq
wh-td
ta-ka
td-qp
aq-cg
wq-ub
ub-vc
de-ta
wq-aq
wq-vc
wh-yn
ka-de
kh-ta
co-tc
wh-qp
tb-vc
td-yn`,
        expected: "co,de,ka,ta",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

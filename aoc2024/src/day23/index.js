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
  const graph = {};

  input.forEach((line) => {
    const [from, to] = line.split("-");

    (graph[from] ??= new Set()).add(to);
    (graph[to] ??= new Set()).add(from);
  });

  const computers = Object.keys(graph);
  const threeways = {};

  for (let mainComp of computers) {
    const neighbors = graph[mainComp];
    for (let secondComp of neighbors) {
      const secondaryNeighbors = graph[secondComp];
      for (let thirdComp of secondaryNeighbors) {
        if (neighbors.has(thirdComp)) {
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
  const graph = {};

  input.forEach((line) => {
    const [from, to] = line.split("-");

    (graph[from] ??= new Set()).add(to);
    (graph[to] ??= new Set()).add(from);
  });

  const computers = Object.keys(graph);
  const threeways = new Set();

  for (let mainComp of computers) {
    const mainConnections = graph[mainComp];
    for (let secondComp of mainConnections) {
      const secondaryConnections = graph[secondComp];
      for (let thirdComp of secondaryConnections) {
        if (mainConnections.has(thirdComp)) {
          const threeway = [mainComp, secondComp, thirdComp];
          threeways.add(threeway.sort().join(","));
        }
      }
    }
  }

  const occurencesInThreeways = (comp) => ({
    comp,
    len: [...threeways].filter((t) => t.includes(comp)).length,
  });
  const descending = (a, b) => b.len - a.len;
  const addToClique = (clique, { comp }) => (
    clique.every((c) => graph[c].has(comp)) ? clique.push(comp) : 0, clique
  );

  return (
    computers
      .map(occurencesInThreeways)
      .sort(descending)
      .reduce(addToClique, [])
      .sort()
      .join(",")
  );
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

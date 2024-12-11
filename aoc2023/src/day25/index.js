import run from "aocrunner";
import { writeFile } from "node:fs/promises";
import { Graph, Edge, kargerMinCut } from "./karger.js";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.trim());

const parseGraph = (input) => {
  const nodes = [];
  const edges = [];

  const add = (node) => {
    const idx = nodes.indexOf(node);
    if (idx === -1) {
      nodes.push(node);
      return nodes.length - 1;
    }
    return idx;
  };

  for (const line of input) {
    const [source, targets] = line.split(": ");
    const srcIdx = add(source);
    targets.split(" ").forEach((target) => {
      const tgtIdx = add(target);
      edges.push([srcIdx, tgtIdx]);
    });
  }

  return { nodes, edges };
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const { nodes, edges } = parseGraph(input);

  const V = nodes.length;
  const E = edges.length;
  const graph = new Graph(
    V,
    E,
    edges.map(([src, dest]) => new Edge(src, dest)),
  );

  let i = 0;
  let cutedges;
  let components;
  while (i++ < 100) {
    [cutedges, components] = kargerMinCut(graph);
    if (cutedges === 3) break;
  }

  let list = {};
  components.forEach((c) => {
    if (!(c in list)) list[c] = 0;
    list[c]++;
  });

  return Object.values(list).reduce((acc, cur) => acc * cur, 1);
};

run({
  part1: {
    tests: [
      {
        input: `jqt: rhn xhk nvd
rsh: frs pzl lsr
xhk: hfx
cmg: qnr nvd lhk bvb
rhn: xhk bvb hfx
bvb: xhk hfx
pzl: lsr hfx nvd
qnr: nvd
ntq: jqt hfx bvb xhk
nvd: lhk
lsr: lhk
rzs: qnr cmg lsr rsh
frs: qnr lhk lsr`,
        expected: 54,
      },
    ],
    solution: part1,
  },
  trimTestInputs: true,
  onlyTests: false,
});

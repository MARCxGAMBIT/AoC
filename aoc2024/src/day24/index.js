import run from "aocrunner";
import { parseInput, parseGroupedInput } from "../utils/index.js";

const evalGate = (gate, gateConnections, initValues) => {
  const connection = gateConnections[gate];

  if (typeof connection === "number") {
    return connection;
  }
  if (initValues[gate] !== undefined) {
    return initValues[gate];
  }
  const [op1, op, op2] = connection.split(" ");

  const op1Value = evalGate(op1, gateConnections, initValues);
  const op2Value = evalGate(op2, gateConnections, initValues);

  if (op === "AND") {
    return op1Value & op2Value;
  }
  if (op === "OR") {
    return op1Value | op2Value;
  }
  if (op === "XOR") {
    return op1Value ^ op2Value;
  }
};

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const [initVal, gateCon] = parseGroupedInput(rawInput);

  const initValues = initVal.reduce((acc, line) => {
    const [gate, value] = line.split(": ");
    acc[gate] = Number(value);
    return acc;
  }, {});

  const gateConnections = gateCon.reduce((acc, line) => {
    const [value, gate] = line.split(" -> ");
    acc[gate] = value;
    return acc;
  }, {});

  Object.keys(gateConnections).forEach((gate) => {
    gateConnections[gate] = evalGate(gate, gateConnections, initValues);
  });

  const binary = Object.entries(gateConnections)
    .filter(([gate]) => gate.startsWith("z"))
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([_, value]) => value)
    .join("");

  return parseInt(binary, 2);
};

const nestedLog = (gateConnections, start, depth = 0) => {
  if (depth > 3) {
    return;
  }
  console.log("  ".repeat(depth), start, gateConnections[start]);
  if (typeof gateConnections[start] === "string") {
    const [op1, _, op2] = gateConnections[start].split(" ");
    nestedLog(gateConnections, op1, depth + 1);
    nestedLog(gateConnections, op2, depth + 1);
  }
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const [initVal, gateCon] = parseGroupedInput(rawInput);

  const initValues = initVal.reduce((acc, line) => {
    const [gate, value] = line.split(": ");
    acc[gate] = Number(value);
    return acc;
  }, {});

  const gateConnections = gateCon.reduce((acc, line) => {
    const [value, gate] = line.split(" -> ");
    acc[gate] = value;
    return acc;
  }, {});

  const originalCons = structuredClone(gateConnections);

  Object.keys(gateConnections).forEach((gate) => {
    gateConnections[gate] = evalGate(gate, gateConnections, initValues);
  });

  const z = Object.entries(gateConnections)
    .filter(
      ([gate]) =>
        gate.startsWith("x") || gate.startsWith("y") || gate.startsWith("z"),
    )
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([_, value]) => value)
    .join("");

  const x = Object.entries(initValues)
    .filter(([gate]) => gate.startsWith("x"))
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([_, value]) => value)
    .join("");

  const y = Object.entries(initValues)
    .filter(([gate]) => gate.startsWith("y"))
    .sort((a, b) => b[0].localeCompare(a[0]))
    .map(([_, value]) => value)
    .join("");

  // use the following logs to debug nodes and find wrong bits
  // do swaps manually in input.txt
  console.log(nestedLog(originalCons, "z15"));
  console.log({ z: parseInt(z, 2), r: parseInt(x, 2) + parseInt(y, 2) });
  console.log({ x, y, z });

  // manually return the correct value
  return "ckj,dbp,fdv,kdf,rpp,z15,z23,z39";
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `x00: 1
x01: 1
x02: 1
y00: 0
y01: 1
y02: 0

x00 AND y00 -> z00
x01 XOR y01 -> z01
x02 OR y02 -> z02`,
        expected: 4,
      },
      {
        input: `x00: 1
x01: 0
x02: 1
x03: 1
x04: 0
y00: 1
y01: 1
y02: 1
y03: 1
y04: 1

ntg XOR fgs -> mjb
y02 OR x01 -> tnw
kwq OR kpj -> z05
x00 OR x03 -> fst
tgd XOR rvg -> z01
vdt OR tnw -> bfw
bfw AND frj -> z10
ffh OR nrd -> bqk
y00 AND y03 -> djm
y03 OR y00 -> psh
bqk OR frj -> z08
tnw OR fst -> frj
gnj AND tgd -> z11
bfw XOR mjb -> z00
x03 OR x00 -> vdt
gnj AND wpb -> z02
x04 AND y00 -> kjc
djm OR pbm -> qhw
nrd AND vdt -> hwm
kjc AND fst -> rvg
y04 OR y02 -> fgs
y01 AND x02 -> pbm
ntg OR kjc -> kwq
psh XOR fgs -> tgd
qhw XOR tgd -> z09
pbm OR djm -> kpj
x03 XOR y03 -> ffh
x00 XOR y04 -> ntg
bfw OR bqk -> z06
nrd XOR fgs -> wpb
frj XOR qhw -> z04
bqk OR frj -> z07
y03 OR x01 -> nrd
hwm AND bqk -> z03
tgd XOR rvg -> z12
tnw OR pbm -> gnj`,
        expected: 2024,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //   input: ``,
      //   expected: 0,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

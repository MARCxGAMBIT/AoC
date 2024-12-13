import run from "aocrunner";
import {
  parseInput,
  parseGroupedInput,
  parseMatrix,
  parseTable,
  ascending,
  sum,
} from "../utils/index.js";

const dirs = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

const explorePlot = (row, col, map, region, regions, visited) => {
  if (visited[row][col]) {
    return;
  }
  visited[row][col] = true;
  const plot = map[row][col];
  const neighbors = dirs
    .map(([r, c]) => [row + r, col + c])
    .filter(([r, c]) => map[r]?.[c] === plot);

  regions[region] ??= { perimeter: 0, area: 0 };
  regions[region].area++;
  regions[region].perimeter += 4 - neighbors.length;

  for (const neighbor of neighbors) {
    explorePlot(...neighbor, map, region, regions, visited);
  }
};

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseMatrix(rawInput);

  const visited = Array.from({ length: input.length }, () =>
    Array.from({ length: input[0].length }, () => false),
  );

  const regions = {};

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (visited[row][col]) {
        continue;
      }
      explorePlot(row, col, input, `${row},${col}`, regions, visited);
    }
  }

  return (
    Object
      .values(regions)
      .map((region) => region.area * region.perimeter)
      .reduce(sum)
  );
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  return;
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `RRRRIICCFF
RRRRIICCCF
VVRRRCCFFF
VVRCCCJFFF
VVVVCJJCFE
VVIVCCJJEE
VVIIICJJEE
MIIIIIJJEE
MIIISIJEEE
MMMISSJEEE`,
        expected: 1930,
      },
      {
        input: `OOOOO
OXOXO
OOOOO
OXOXO
OOOOO`,
        expected: 772,
      },
      {
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 140,
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

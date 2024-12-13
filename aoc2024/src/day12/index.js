import run from "aocrunner";
import { parseMatrix, sum } from "../utils/index.js";

const straightDirs = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
};
const allDirs = {
  N: [-1, 0],
  NE: [-1, 1],
  E: [0, 1],
  SE: [1, 1],
  S: [1, 0],
  SW: [1, -1],
  W: [0, -1],
  NW: [-1, -1],
};

const explorePlot = (row, col, map, region, regions, visited) => {
  if (visited[row][col]) {
    return;
  }
  visited[row][col] = true;
  const plot = map[row][col];
  const neighbors = Object.values(straightDirs)
    .map(([r, c]) => [row + r, col + c])
    .filter(([r, c]) => map[r]?.[c] === plot);

  regions[region] ??= { perimeter: 0, area: 0 };
  regions[region].area++;
  regions[region].perimeter += 4 - neighbors.length;

  for (const neighbor of neighbors) {
    explorePlot(...neighbor, map, region, regions, visited);
  }
};

const explorePlot2 = (row, col, map, region, regions, visited) => {
  if (visited[row][col]) {
    return;
  }
  visited[row][col] = true;
  const plot = map[row][col];
  const neighbors = Object.values(allDirs)
    .map(([r, c]) => [row + r, col + c]);

  const neighborPlots = neighbors.map(([r, c]) =>
    map[r]?.[c] === plot ? plot : ".",
  );

  regions[region] ??= { edges: 0, area: 0 };
  regions[region].area++;

  for (let i = 1; i < neighborPlots.length; i += 2) {
    if (
      neighborPlots[i - 1] !== plot &&
      neighborPlots[(i + 1) % neighborPlots.length] !== plot
    ) {
      regions[region].edges++;
    } else if (
      neighborPlots[i - 1] === plot &&
      neighborPlots[i] !== plot &&
      neighborPlots[(i + 1) % neighborPlots.length] === plot
    ) {
      regions[region].edges++;
    }
  }

  for (const neighbor of neighbors
    .filter((_, i) => i % 2 === 0)
    .filter(([r, c]) => map[r]?.[c] === plot)) {
    explorePlot2(...neighbor, map, region, regions, visited);
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
      if (!visited[row][col]) {
        explorePlot(row, col, input, `${row},${col}`, regions, visited);
      }
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
  const input = parseMatrix(rawInput);

  const visited = Array.from({ length: input.length }, () =>
    Array.from({ length: input[0].length }, () => false),
  );

  const regions = {};

  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (!visited[row][col]) {
        explorePlot2(row, col, input, `${row},${col}`, regions, visited);
      }
    }
  }

  return (
    Object
      .values(regions)
      .map((region) => region.area * region.edges)
      .reduce(sum)
  );
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
        input: `AAAA
BBCD
BBCC
EEEC`,
        expected: 80,
      },
      {
        input: `AAAAAA
AAABBA
AAABBA
ABBAAA
ABBAAA
AAAAAA`,
        expected: 368,
      },
      {
        input: `EEEEE
EXXXX
EEEEE
EXXXX
EEEEE`,
        expected: 236,
      },
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
        expected: 1206,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: true,
});

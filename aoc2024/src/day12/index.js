import run from "aocrunner";
import { parseMatrix, sum } from "../utils/index.js";

const straightDirs = {
  N: [-1, 0],
  E: [0, 1],
  S: [1, 0],
  W: [0, -1],
};

const diagonalDirs = {
  NE: [-1, 1],
  SE: [1, 1],
  SW: [1, -1],
  NW: [-1, -1],
};

const inspectNeighbor =
  (map, row, col) =>
  ([r, c]) => ({
    plot: map[row + r]?.[col + c] ?? ".",
    coords: [row + r, col + c],
  });

const createVisited = (matrix) =>
  Array.from({ length: matrix.length }, () =>
    Array.from({ length: matrix[0].length }, () => false),
  );

const explorePlot = (row, col, map, region, regions, visited) => {
  if (visited[row][col]) {
    return;
  }
  visited[row][col] = true;
  const plot = map[row][col];

  const straightNeighbors = Object
    .values(straightDirs)
    .map(inspectNeighbor(map, row, col));
  const diagonalNeighbors = Object
    .values(diagonalDirs)
    .map(inspectNeighbor(map, row, col));

  regions[region] ??= { edges: 0, area: 0, perimeter: 0 };
  regions[region].area++;
  regions[region].perimeter += 4;

  for (const [i, neighbor] of straightNeighbors.entries()) {
    const diagNeighbor = diagonalNeighbors[i];
    const nextNeighbor = straightNeighbors[(i + 1) % straightNeighbors.length];

    const isOuterEdge = neighbor.plot !== plot && nextNeighbor.plot !== plot;
    const isInnerEdge =
      neighbor.plot === plot &&
      diagNeighbor.plot !== plot &&
      nextNeighbor.plot === plot;

    regions[region].edges += Number(isOuterEdge || isInnerEdge);

    if (neighbor.plot === plot) {
      regions[region].perimeter--;
      explorePlot(...neighbor.coords, map, region, regions, visited);
    }
  }
};

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const matrix = parseMatrix(rawInput);
  const visited = createVisited(matrix);
  const regions = {};

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (!visited[row][col]) {
        explorePlot(row, col, matrix, `${row},${col}`, regions, visited);
      }
    }
  }

  return (
    Object
      .values(regions)
      .map(({ area, perimeter }) => area * perimeter)
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
  const matrix = parseMatrix(rawInput);
  const visited = createVisited(matrix);
  const regions = {};

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (!visited[row][col]) {
        explorePlot(row, col, matrix, `${row},${col}`, regions, visited);
      }
    }
  }

  return (
    Object
      .values(regions)
      .map(({ area, edges }) => area * edges)
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
  onlyTests: false,
});

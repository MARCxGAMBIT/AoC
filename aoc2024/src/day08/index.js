import run from "aocrunner";
import { parseMatrix } from "../utils/index.js";

class Coord {
  /**
   * @param {Number} row
   * @param {Number} col
   */
  constructor(row, col) {
    this.row = row;
    this.col = col;
  }

  getValidAntinodes(coord, bounds, maxDepth) {
    const distance = this.subtract(coord);
    const result = maxDepth < 0 ? [this] : [];
    let counter = 0;
    let antinode = this;
    do {
      antinode = antinode.add(distance);
      if (!antinode.valid(bounds)) {
        break;
      }
      result.push(antinode);
    } while (++counter !== maxDepth);
    return result;
  }

  subtract({ row, col }) {
    return new Coord(this.row - row, this.col - col);
  }

  add({ row, col }) {
    return new Coord(this.row + row, this.col + col);
  }

  valid({ row, col }) {
    return this.row >= 0 && this.row <= row && this.col >= 0 && this.col <= col;
  }

  toString() {
    return `${this.row},${this.col}`;
  }
}

const validAntinodes = (coordA, coordB, bounds, maxDepth = -1) => {
  return [
    ...coordA.getValidAntinodes(coordB, bounds, maxDepth),
    ...coordB.getValidAntinodes(coordA, bounds, maxDepth),
  ];
};

const extractFrequencies = (accu, curr, row) => {
  curr.forEach((antenna, col) => {
    if (antenna !== ".") {
      (accu[antenna] ??= []).push(new Coord(row, col));
    }
  });

  return accu;
};
/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const matrix = parseMatrix(rawInput);
  const bounds = new Coord(matrix.length - 1, matrix[0].length - 1);

  const frequency = matrix.reduce(extractFrequencies, {});

  const antinodes = Object.entries(frequency)
    .map(([_, coords]) => coords)
    .flatMap((coords) =>
      coords
        .slice(0, coords.length - 1)
        .flatMap((coord, i) =>
          coords
            .slice(i + 1)
            .flatMap((tmpCoord) => validAntinodes(coord, tmpCoord, bounds, 1)),
        ),
    )
    .map((coord) => coord.toString());

  return new Set(antinodes).size;
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const matrix = parseMatrix(rawInput);
  const bounds = new Coord(matrix.length - 1, matrix[0].length - 1);

  const frequency = matrix.reduce(extractFrequencies, {});

  const antinodes = Object.entries(frequency)
    .map(([_, coords]) => coords)
    .flatMap((coords) =>
      coords
        .slice(0, coords.length - 1)
        .flatMap((coord, i) =>
          coords
            .slice(i + 1)
            .flatMap((tmpCoord) => validAntinodes(coord, tmpCoord, bounds)),
        ),
    )
    .map((coord) => coord.toString());

  return new Set(antinodes).size;
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 14,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `............
........0...
.....0......
.......0....
....0.......
......A.....
............
............
........A...
.........A..
............
............`,
        expected: 34,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

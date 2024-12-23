import run from "aocrunner";
import { parseMatrix, findSymbol } from "../utils/index.js";

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

class PriorityQueue {
  constructor() {
    this.elements = [];
  }

  push(item, priority, direction, path) {
    const insertAt = this.elements.findIndex((e) => e.priority > priority);
    this.elements.splice(insertAt, 0, { item, priority, direction, path });
  }

  shift() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseMatrix(rawInput);

  const start = findSymbol(input, "S");
  const end = findSymbol(input, "E");

  const queue = new PriorityQueue();

  let currDir = 0;

  queue.push(start, 0, currDir, [start]);
  const costs = { [[...start, currDir]]: 0 };

  while (!queue.isEmpty()) {
    const current = queue.shift();
    const [row, col] = current.item;

    for (const [dir, [dy, dx]] of dirs.entries()) {
      const next = [row + dy, col + dx, dir];
      if (input[next[0]][next[1]] === "#") {
        continue;
      }

      const newCost =
        costs[[...current.item, current.direction]] +
        1 +
        (current.direction !== dir ? 1000 : 0);
      if (!(next in costs) || newCost < costs[next]) {
        costs[next] = newCost;
        queue.push([next[0], next[1]], newCost, dir, [
          ...current.path,
          [next[0], next[1]],
        ]);
      }
    }
  }

  return Math.min(
    costs[[...end, 0]] ?? Infinity,
    costs[[...end, 1]] ?? Infinity,
    costs[[...end, 2]] ?? Infinity,
    costs[[...end, 3]] ?? Infinity,
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

  const start = findSymbol(input, "S");

  const queue = new PriorityQueue();
  const seen = [];
  let best = Infinity;

  let currDir = 0;

  queue.push(start, 0, currDir, [start]);
  const costs = { [[...start, currDir]]: 0 };

  while (!queue.isEmpty()) {
    const current = queue.shift();
    const [row, col] = current.item;

    if (input[row][col] === "E") {
      best = current.priority;
      console.log({ best });
    }

    for (const [dir, [dy, dx]] of dirs.entries()) {
      const next = [row + dy, col + dx, dir];
      if (input[next[0]][next[1]] === "#") {
        continue;
      }

      const newCost =
        costs[[...current.item, current.direction]] +
        1 +
        (current.direction !== dir ? 1000 : 0);
      if (!(next in costs) || newCost < costs[next]) {
        costs[next] = newCost;
        queue.push([next[0], next[1]], newCost, dir, [
          ...current.path,
          [next[0], next[1]],
        ]);
      }
    }
  }

  // return new Set(seen.map(([r,c]) => `${r},${c}`)).size;
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`,
        expected: 7036,
      },
      {
        input: `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`,
        expected: 11048,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `###############
#.......#....E#
#.#.###.#.###.#
#.....#.#...#.#
#.###.#####.#.#
#.#.#.......#.#
#.#.#####.###.#
#...........#.#
###.#.#####.#.#
#...#.....#.#.#
#.#.#.###.#.#.#
#.....#...#.#.#
#.###.#.#.#.#.#
#S..#.....#...#
###############`,
        expected: 45,
      },
      {
        input: `#################
#...#...#...#..E#
#.#.#.#.#.#.#.#.#
#.#.#.#...#...#.#
#.#.#.#.###.#.#.#
#...#.#.#.....#.#
#.#.#.#.#.#####.#
#.#...#.#.#.....#
#.#.#####.#.###.#
#.#.#.......#...#
#.#.###.#####.###
#.#.#...#.....#.#
#.#.#.#####.###.#
#.#.#.........#.#
#.#.#.#########.#
#S#.............#
#################`,
        expected: 64,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

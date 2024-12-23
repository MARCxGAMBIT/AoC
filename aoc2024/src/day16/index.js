import run from "aocrunner";
import { parseMatrix, findSymbol } from "../utils/index.js";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = parseMatrix(rawInput);
  const start = findSymbol(input, "S");

  const queue = new MinPriorityQueue((e) => e.priority);
  queue.enqueue({ item: start, priority: 0, direction: 0 });

  const costs = { [[...start, 0]]: 0 };
  let best = Infinity;

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    const [row, col] = current.item;

    if (input[row][col] === "E") {
      best = Math.min(best, current.priority);
    }

    for (const [direction, [dy, dx]] of dirs.entries()) {
      const next = [row + dy, col + dx, direction];
      if (input[next[0]][next[1]] === "#") {
        continue;
      }

      const priority =
        costs[[...current.item, current.direction]] +
        1 +
        (current.direction !== direction ? 1000 : 0);
      if (!(next in costs) || priority < costs[next]) {
        costs[next] = priority;
        queue.enqueue({ item: [next[0], next[1]], priority, direction });
      }
    }
  }

  return best;
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

  const queue = new MinPriorityQueue((e) => e.priority);
  queue.enqueue({ item: start, priority: 0, direction: 0, path: [start] });

  const costs = { [[...start, 0]]: 0 };
  const seen = {};
  let best = Infinity;

  while (!queue.isEmpty()) {
    const current = queue.dequeue();
    const [row, col] = current.item;

    if (input[row][col] === "E") {
      best = Math.min(current.priority, best);
      (seen[current.priority] ??= []).push(...current.path);
      continue;
    }

    for (const [direction, [dy, dx]] of dirs.entries()) {
      const next = [row + dy, col + dx, direction];
      if (input[next[0]][next[1]] === "#") {
        continue;
      }

      const priority =
        costs[[...current.item, current.direction]] +
        1 +
        (current.direction !== direction ? 1000 : 0);
      if (!(next in costs) || priority <= costs[next]) {
        costs[next] = priority;
        queue.enqueue({
          item: [next[0], next[1]],
          priority,
          direction,
          path: [...current.path, [next[0], next[1]]],
        });
      }
    }
  }

  return new Set(seen[best].map(([r, c]) => `${r},${c}`)).size;
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
      {
        input: `################
####.........#E#
###..#######.#.#
###.##...###.#.#
###.##.#.###.#.#
#......#.#.....#
#.#.####.#.#.###
#.#.####...#.###
#.#..#######.###
#S##.........###
################`,
        expected: 62,
      },
      {
        input: `#########################################################################################################################
#.........#.......#...#.........#.......#...............#...............................#.......#.....#.......#.....#..E#
###########.#.###.#.#.#.#####.###.#.#####.#####.#.#####.#####.###.#.###.#.#.#####.#.#.#.#.#.#####.#.###.#.#####.#.#####.#
#...#.......#.#.....#.#.....#.....#...#...#.....#.#...#...#...#...#.......#.......#.....#.#.......#.#...#.......#.#.....#
#.#.#.#######.#######.#.###.#.#######.#.###.###.#.#.#.###.#.###.#####.#.#########.#.###.#.#########.#.###########.#.#.###
#.#.#.#...#...#.....#...#...#.#...#...#...#.......#.#.....#.#...#...#.#...#...#.......................#.....#...#...#...#
###.#.#.#.#.#.#.###.###.#.###.#.#.#.#.###.#.###.#########.#.#.###.#.#.#.#.#.#.#.###.#.###.#######.#.#.#.###.#.#.#######.#
#.#.....#.#.#.#.#.#.#...#.#...#.#.......................#.....#...#.#...#...#...#...#.....#...................#.......#.#
#.#########.#.#.#.#.#.#.#.#.###.#.#.#.#.###.#.#.#######.#####.#.###.###.#.###.###.#######.#.###.#.#.#.#.#.#.#.#######.#.#
#...........#.#.#.#.#.....#.....#.#.#.#.#.......#.....#.....#...#.#...#.#.....#...#.........#...#.#.....#...#...#...#.#.#
#####.#.#.#.#.#.#.#.#.#.#####.#####.###.#.#.###.#.###.###.#.#####.###.#.#.#####.###.#####.###.#####.#####.#####.#.#.#.#.#
#.....#.#...#.#.#.#.......#...#.....#...#.#.#...#.#.#...#.#...#...#...#.#.....#.#.#...#.......#.....#.........#.#.#.....#
#S###.#.#######.#.#.#####.#####.#####.###.###.###.#.###.#####.###.#.###.#####.#.#.###.#.#.#####.###.###########.#######.#
#########################################################################################################################`,
        expected: 245,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

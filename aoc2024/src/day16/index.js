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

  push(item, priority, direction) {
    const insertAt = this.elements.findIndex((e) => e.priority > priority);
    this.elements.splice(insertAt, 0, { item, priority, direction });
  }

  shift() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

const getSiblings = (current, costs) => {
  const [row, col, dir] = current;
  const currentCost = costs[current];
  const otherDirs = dirs.map((_, i) => i).filter((i) => i !== dir);
  return otherDirs
    .map((i) => [row, col, i])
    .filter((sibling) => costs[sibling] <= currentCost + 1000);
};

const backtrack = (start, current, costs, came_from, visited) => {
  if (current.slice(0, 2).toString() === start.toString()) {
    return;
  }

  let todos = [came_from[current]];
  if (Object.keys(visited).length > 1) {
    todos.push(
      ...getSiblings(current, costs).map((sibling) => came_from[sibling]),
    );
  }

  for (let todo of todos) {
    let [row, col] = todo;
    if (visited[[row, col]]) {
      continue;
    }

    visited[[row, col]] = true;
    backtrack(start, todo, costs, came_from, visited);
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

  const start = findSymbol(input, "S");
  const end = findSymbol(input, "E");

  const queue = new PriorityQueue();

  let currDir = 0;

  queue.push(start, 0, currDir);
  const came_from = { [start]: null };
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
        came_from[next] = current;
        queue.push([next[0], next[1]], newCost, dir);
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
  const end = findSymbol(input, "E");

  const queue = new PriorityQueue();

  let currDir = 0;

  queue.push(start, 0, currDir);
  const came_from = { [start]: null };
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
        came_from[next] = [...current.item, current.direction];
        queue.push([next[0], next[1]], newCost, dir);
      }
    }
  }

  let min = Infinity;
  let minDir = -1;
  for (let i = 0; i < dirs.length; ++i) {
    if (costs[[...end, i]] < min) {
      min = costs[[...end, i]];
      minDir = i;
    }
  }

  let node = [...end, minDir];
  let visited = { [end]: true };
  backtrack(start, node, costs, came_from, visited);

  const copy = structuredClone(input);
  for (let coord of Object.keys(visited)) {
    const [row, col] = coord.split(",").map(Number);
    copy[row][col] = "O";
  }
  return Object.keys(visited).length;
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

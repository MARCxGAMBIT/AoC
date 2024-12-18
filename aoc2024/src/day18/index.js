import run from "aocrunner";
import { parseInput } from "../utils/index.js";

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

  push(item, priority) {
    const insertAt = this.elements.findIndex((e) => e.priority > priority);
    this.elements.splice(insertAt, 0, { item, priority });
  }

  shift() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

const dijkstra = (start, grid) => {
  const queue = new PriorityQueue();

  queue.push(start, 0);
  const came_from = { [start]: null };
  const costs = { [[...start]]: 0 };

  while (!queue.isEmpty()) {
    const current = queue.shift();
    const [row, col] = current.item;

    for (const [dir, [dy, dx]] of dirs.entries()) {
      const next = [row + dy, col + dx];
      if (grid[next[0]]?.[next[1]] === ".") {
        const newCost = costs[[...current.item]] + 1;
        if (!(next in costs) || newCost < costs[next]) {
          costs[next] = newCost;
          came_from[next] = current;
          queue.push([next[0], next[1]], newCost, dir);
        }
      }
    }
  }
  return costs;
};

const convertToBytes = (coords) => {
  const max = coords.reduce((acc, [x, y]) => Math.max(acc, x, y), 0);
  const grid = Array.from({ length: max + 1 }, () => Array(max + 1).fill("."));

  coords.forEach(([x, y]) => {
    grid[y][x] = "#";
  });

  return grid;
};

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const coords = parseInput(rawInput)
    .map((line) => line.split(",").map(Number));

  const initialCoords = coords.splice(0, coords.length < 30 ? 12 : 1024);
  const grid = convertToBytes(initialCoords);

  const start = [0, 0];
  const end = [grid.length - 1, grid.length - 1];

  const costs = dijkstra(start, grid);
  return costs[end];
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const coords = parseInput(rawInput)
    .map((line) => line.split(",").map(Number));

  const initialCoords = coords.splice(0, coords.length < 30 ? 12 : 1024);
  const start = [0, 0];

  // todo: binary search
  return coords
    .find((coord, i) => {
      const grid = convertToBytes([
        ...initialCoords,
        ...coords.slice(0, i + 1),
      ]);
      const end = [grid.length - 1, grid.length - 1];

      const costs = dijkstra(start, grid);

      return costs[end] === undefined;
    })
    .join(",");
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`,
        expected: 22,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `5,4
4,2
4,5
3,0
2,1
6,3
2,4
1,5
0,6
3,3
2,6
5,1
1,2
5,5
2,5
6,5
1,4
0,4
6,4
1,1
6,1
1,0
0,5
1,6
2,0`,
        expected: "6,1",
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

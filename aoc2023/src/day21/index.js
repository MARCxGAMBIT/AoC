import run from "aocrunner";
import { parseMatrix } from "../utils/index.js";

const findStart = (input) => {
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[row].length; col++) {
      if (input[row][col] === "S") {
        return [row, col];
      }
    }
  }
};

const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

const magic = (n, a, b, c) =>
  a + n * (b - a + Math.floor(((n - 1) * (c - b - b + a)) / 2));

const part1 = (rawInput) => {
  const input = parseMatrix(rawInput);

  const queue = [findStart(input)];

  for (let i = 0; i < 64; i++) {
    const nextIter = new Set();
    while (queue.length > 0) {
      const [row, col] = queue.shift();
      for (let dir of dirs) {
        const [dRow, dCol] = dir;
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (input[newRow]?.[newCol] && input[newRow][newCol] !== "#") {
          nextIter.add([newRow, newCol].toString());
        }
      }
    }
    queue.push(...[...nextIter].map((str) => str.split(",").map(Number)));
  }

  return queue.length;
};

const part2 = (rawInput) => {
  const input = parseMatrix(rawInput);

  let queue = { [findStart(input).toString()]: true };

  const width = input[0].length;
  const height = input.length;

  const done = [];
  for (let i = 0; i < 3 * 110; i++) {
    if (i % 131 === 65) {
      done.push(Object.keys(queue).length);
    }
    const tempQueue = {};
    for (const ele in queue) {
      const [row, col] = ele.split(",").map(Number);
      for (let dir of dirs) {
        const [dRow, dCol] = dir;
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (
          input[((newRow % height) + height) % height]?.[
            ((newCol % width) + width) % width
          ] !== "#"
        ) {
          tempQueue[[newRow, newCol].toString()] = true;
        }
      }
    }
    queue = tempQueue;
  }

  const n = Math.floor(26501365 / 131);

  return magic(n, ...done);
};

run({
  part1: {
    tests: [
      {
        input: `...........
                .....###.#.
                .###.##..#.
                ..#.#...#..
                ....#.#....
                .##..S####.
                .##..#...#.
                .......##..
                .##.#.####.
                .##..##.##.
                ...........`,
        expected: 16,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      // {
      //     input: `...........
      //     .....###.#.
      //     .###.##..#.
      //     ..#.#...#..
      //     ....#.#....
      //     .##..S####.
      //     .##..#...#.
      //     .......##..
      //     .##.#.####.
      //     .##..##.##.
      //     ...........`,
      //     expected: 0,
      // },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

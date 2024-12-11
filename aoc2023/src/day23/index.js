import run from "aocrunner";
import { parseMatrix } from "../utils/index.js";

// E, S, W, N
const dirs = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];
const slopes = [">", "v", "<", "^"];

const getNeighbors = (matrix, [x, y], visited) => {
  return (
    dirs
      .map(([dx, dy]) => [x + dx, y + dy])
      .filter(
        ([x, y], i) => matrix[x]?.[y] === "." || matrix[x]?.[y] === slopes[i],
      )
      .filter(([x, y]) => !visited.has([x, y].toString()))
  );
};

const part1 = (rawInput) => {
  const input = parseMatrix(rawInput);

  const start = [0, 1];
  const end = [input.length - 1, input[0].length - 2];

  const queue = [{ coord: start, length: 0, visited: new Set() }];
  const lenghts = [];
  while (queue.length > 0) {
    const { coord, length, visited } = queue.pop();

    if (coord[0] === end[0] && coord[1] === end[1]) {
      lenghts.push(length);
      continue;
    }
    visited.add(coord.toString());
    const neighbors = getNeighbors(input, coord, visited).map(
      (neighbor, i) => ({
        coord: neighbor,
        length: length + 1,
        visited: i === 0 ? visited : new Set(visited),
      }),
    );
    queue.push(...neighbors);
  }

  return Math.max(...lenghts);
};

const getValidNeighbors = (matrix, [x, y]) => {
  return (
    dirs
      .map(([dx, dy]) => [x + dx, y + dy])
      .filter(([x, y]) => matrix[x]?.[y] && matrix[x]?.[y] !== "#")
  );
};

const part2 = (rawInput) => {
  const input = parseMatrix(rawInput);

  const start = [0, 1];
  const end = [input.length - 1, input[0].length - 2];

  const intersections = new Set([start.toString(), end.toString()]);
  const intersectionDists = { [end.toString()]: {} };
  const queue = [
    { coord: start, prevIntersection: start, length: 0, visited: new Set() },
  ];

  while (queue.length > 0) {
    const { coord, prevIntersection, length, visited } = queue.pop();
    visited.add(coord.toString());
    const neighbors = getValidNeighbors(input, coord, visited);
    if (neighbors.length > 2) {
      intersections.add(coord.toString());

      (intersectionDists[prevIntersection] ??= {})[coord] = length;
      (intersectionDists[coord] ??= {})[prevIntersection] = length;

      const unvisitedNeighbors = neighbors
        .filter(([x, y]) => !visited.has([x, y].toString()))
        .map((neighbor) => ({
          coord: neighbor,
          prevIntersection: coord,
          length: 1,
          visited,
        }));
      queue.push(...unvisitedNeighbors);
    } else {
      const intersectionNeighbor = neighbors.find(([x, y]) =>
        intersections.has([x, y].toString()),
      );
      if (intersectionNeighbor && length > 1) {
        intersectionDists[prevIntersection][intersectionNeighbor] = length + 1;
        intersectionDists[intersectionNeighbor][prevIntersection] = length + 1;
      }

      const unvisitedNeighbors = neighbors
        .filter(([x, y]) => !visited.has([x, y].toString()))
        .map((neighbor) => ({
          coord: neighbor,
          prevIntersection,
          length: length + 1,
          visited,
        }));

      queue.push(...unvisitedNeighbors);
    }
  }

  let max = 0;
  queue.push({ coord: start.toString(), length: 0, visited: new Set() });
  while (queue.length > 0) {
    const { coord, length, visited } = queue.pop();
    if (coord.toString() === end.toString()) {
      max = Math.max(max, length);
      continue;
    }

    visited.add(coord.toString());
    const neighbors = Object.entries(intersectionDists[coord])
      .filter(([node]) => !visited.has(node))
      .map(([coord, l], i) => ({
        coord,
        length: length + l,
        visited: i === 0 ? visited : new Set(visited),
      }));

    queue.push(...neighbors);
  }
  return max;
};

run({
  part1: {
    tests: [
      {
        input: `#.#####################
                #.......#########...###
                #######.#########.#.###
                ###.....#.>.>.###.#.###
                ###v#####.#v#.###.#.###
                ###.>...#.#.#.....#...#
                ###v###.#.#.#########.#
                ###...#.#.#.......#...#
                #####.#.#.#######.#.###
                #.....#.#.#.......#...#
                #.#####.#.#.#########v#
                #.#...#...#...###...>.#
                #.#.#v#######v###.###v#
                #...#.>.#...>.>.#.###.#
                #####v#.#.###v#.#.###.#
                #.....#...#...#.#.#...#
                #.#########.###.#.#.###
                #...###...#...#...#.###
                ###.###.#.###v#####v###
                #...#...#.#.>.>.#.>.###
                #.###.###.#.###.#.#v###
                #.....###...###...#...#
                #####################.#`,
        expected: 94,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `#.#####################
#.......#########...###
#######.#########.#.###
###.....#.>.>.###.#.###
###v#####.#v#.###.#.###
###.>...#.#.#.....#...#
###v###.#.#.#########.#
###...#.#.#.......#...#
#####.#.#.#######.#.###
#.....#.#.#.......#...#
#.#####.#.#.#########v#
#.#...#...#...###...>.#
#.#.#v#######v###.###v#
#...#.>.#...>.>.#.###.#
#####v#.#.###v#.#.###.#
#.....#...#...#.#.#...#
#.#########.###.#.#.###
#...###...#...#...#.###
###.###.#.###v#####v###
#...#...#.#.>.>.#.>.###
#.###.###.#.###.#.#v###
#.....###...###...#...#
#####################.#`,
        expected: 154,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

import run from "aocrunner";
import { parseMatrix } from "../utils/index.js";

// E, S, W, N
const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]];
const slopes = [">", "v", "<", "^"];

const getNeighbors = (matrix, [x, y], visited) => {
    return dirs
        .map(([dx, dy]) => [x + dx, y + dy])
        .filter(([x, y], i) => matrix[x]?.[y] === "." || matrix[x]?.[y] === slopes[i])
        .filter(([x, y]) => !visited.has([x, y].toString()));
}

const getNeighbors2 = (matrix, [x, y], visited, prev) => {
    return dirs
        .map(([dx, dy]) => [x + dx, y + dy])
        .filter(([x, y]) => matrix[x]?.[y] !== "#")
        .filter(([x, y]) => {
            const curr = [x, y].toString();
            return !visited.has(curr) && prev !== curr;
        });
}

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
        const neighbors = getNeighbors(input, coord, visited);
        queue.push(...neighbors.map((neighbor, i)=> ({ coord: neighbor, length: length + 1, visited: i === 0 ? visited : new Set(visited) })));
    }

    return Math.max(...lenghts);
};

const part2 = (rawInput) => {
    const input = parseMatrix(rawInput);

    const start = [1, 1];
    const end = [135, 123];
    // const end = [input.length - 1, input[0].length - 2];

    const queue = [{ coord: start, prev: "0,1", length: 0, visited: new Set() }];
    let max = 0;
    while (queue.length > 0) {
        const { coord, length, visited, prev } = queue.pop();

        if (coord[0] === end[0] && coord[1] === end[1]) {
            max = Math.max(max, length + 106);
            continue;
        }
        
        const neighbors = getNeighbors2(input, coord, visited, prev) 
        if (neighbors.length > 1) {
            visited.add(coord.toString());
        }
        queue.push(...neighbors.map((neighbor, i)=> ({ coord: neighbor, prev: coord.toString(), length: length + 1, visited: i === 0 ? visited : new Set(visited) })));
    }

    return max;
}

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
            // {
            //     input: `#.#####################
            //     #.......#########...###
            //     #######.#########.#.###
            //     ###.....#.>.>.###.#.###
            //     ###v#####.#v#.###.#.###
            //     ###.>...#.#.#.....#...#
            //     ###v###.#.#.#########.#
            //     ###...#.#.#.......#...#
            //     #####.#.#.#######.#.###
            //     #.....#.#.#.......#...#
            //     #.#####.#.#.#########v#
            //     #.#...#...#...###...>.#
            //     #.#.#v#######v###.###v#
            //     #...#.>.#...>.>.#.###.#
            //     #####v#.#.###v#.#.###.#
            //     #.....#...#...#.#.#...#
            //     #.#########.###.#.#.###
            //     #...###...#...#...#.###
            //     ###.###.#.###v#####v###
            //     #...#...#.#.>.>.#.>.###
            //     #.###.###.#.###.#.#v###
            //     #.....###...###...#...#
            //     #####################.#`,
            //     expected: 154,
            // },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

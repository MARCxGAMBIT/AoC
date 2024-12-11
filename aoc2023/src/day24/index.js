import run from "aocrunner";

import { init } from "z3-solver";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.trim());

const low = 200000000000000;
const high = 400000000000000;

const getIntersection = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  if ((x1 === x2 && y1 === y2) || (x3 === x4 && y3 === y4)) {
    return false;
  }
  const denominator = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  if (denominator === 0) {
    return false;
  }

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denominator;

  const x = x1 + ua * (x2 - x1);
  const y = y1 + ua * (y2 - y1);

  return { x, y };
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  const hailstones = input.map((line) => line.match(/-?\d+/g).map(Number));

  let intersectionCounter = 0;
  for (let outer = 0; outer < hailstones.length - 1; outer++) {
    const firstHailstone = hailstones[outer];
    const [x1, y1, _, vx1, vy1] = firstHailstone;
    for (let inner = outer + 1; inner < hailstones.length; inner++) {
      const secondHailstone = hailstones[inner];
      const [x2, y2, _, vx2, vy2] = secondHailstone;

      const intersection = getIntersection(
        x1,
        y1,
        x1 + vx1,
        y1 + vy1,
        x2,
        y2,
        x2 + vx2,
        y2 + vy2,
      );
      if (
        intersection.x >= low &&
        intersection.y >= low &&
        intersection.x <= high &&
        intersection.y <= high
      ) {
        if (
          ((vx1 < 0 && intersection.x < x1) ||
            (vx1 > 0 && intersection.x > x1)) &&
          ((vx2 < 0 && intersection.x < x2) || (vx2 > 0 && intersection.x > x2))
        ) {
          intersectionCounter++;
        }
      }
    }
  }
  return intersectionCounter;
};

const part2 = async (rawInput) => {
  const input = parseInput(rawInput);
  const hailstones = input
    .map((line) => line.match(/-?\d+/g).map(Number))
    .slice(0, 3);

  const { Context } = await init();
  const { Solver, Int } = new Context("main");
  const solver = new Solver();
  const x = Int.const("x");
  const y = Int.const("y");
  const z = Int.const("z");
  const dx = Int.const("dx");
  const dy = Int.const("dy");
  const dz = Int.const("dz");
  const t = hailstones.map((_, i) => Int.const(`t${i}`));

  hailstones.forEach((h, i) => {
    solver.add(t[i].mul(h[3]).add(h[0]).sub(x).sub(t[i].mul(dx)).eq(0));
    solver.add(t[i].mul(h[4]).add(h[1]).sub(y).sub(t[i].mul(dy)).eq(0));
    solver.add(t[i].mul(h[5]).add(h[2]).sub(z).sub(t[i].mul(dz)).eq(0));
  });
  await solver.check();

  const result = Number(solver.model().eval(x.add(y).add(z)).value());

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `19, 13, 30 @ -2,  1, -2
                18, 19, 22 @ -1, -1, -2
                20, 25, 34 @ -2, -2, -4
                12, 31, 28 @ -1, -2, -1
                20, 19, 15 @  1, -5, -3`,
        expected: 2,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `19, 13, 30 @ -2,  1, -2
                18, 19, 22 @ -1, -1, -2
                20, 25, 34 @ -2, -2, -4
                12, 31, 28 @ -1, -2, -1
                20, 19, 15 @  1, -5, -3`,
        expected: 47,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

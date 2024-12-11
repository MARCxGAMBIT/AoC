import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.trim());

const analyseMoves = (moves) => {
  return moves
    .map(([opponent, me]) => [
      opponent.charCodeAt(0) - 64,
      me.charCodeAt(0) - 87,
    ])
    .reduce((acc, [opponent, me]) => {
      if (opponent === me) {
        acc += 3;
      } else if ((opponent - me + 3) % 3 === 2) {
        acc += 6;
      }
      acc += me;
      return acc;
    }, 0);
};

const part1 = (rawInput) => {
  const lines = parseInput(rawInput);

  const moves = lines.map((line) => line.split(" "));
  return analyseMoves(moves);
};

const opponentOptions = ["A", "B", "C"];
const myOptions = ["X", "Y", "Z"];
const results = {
  X: -1,
  Y: 0,
  Z: 1,
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  // X lose, Y draw, Z win
  const moves = input
    .map((line) => line.split(" "))
    .map(([opponent, result]) => [
      opponent,
      myOptions[(opponentOptions.indexOf(opponent) + results[result] + 3) % 3],
    ]);

  return analyseMoves(moves);
};

run({
  part1: {
    tests: [
      {
        input: `A Y
                B X
                C Z`,
        expected: 15,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `A Y
                B X
                C Z`,
        expected: 12,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

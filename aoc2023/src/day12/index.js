import run from "aocrunner";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.trim());
const splitAtSpace = (line) => line.split(" ");
const quintuple = ([springs, groups]) => [
  Array(5).fill(springs).join("?"),
  Array(5).fill(groups).join(","),
];
const transform = ([springs, groups]) => [
  (springs += "."),
  groups.split(",").map(Number),
];
const startRecursion = ([springs, groups]) => recursion(0, springs, groups);
const sum = (a, b) => a + b;

const memo = new Map();
const recursion = (hashCount, springs, groups) => {
  const sMapKey = `${hashCount},${springs},${groups}`;

  if (memo.has(sMapKey)) {
    return memo.get(sMapKey);
  }

  // Exit condition 1: We handled all springs and groups => Combination is valid
  if (springs.length === 0 && groups.length === 0) {
    return 1;
  }

  // Exit condition 2: We handled all springs but not all groups => Combination is invalid
  if (springs.length === 0) {
    return 0;
  }

  // Extract the first characters from springs and groups
  const spring = springs[0];
  const group = groups[0];

  // Initialize count variable to keep track of valid combinations
  let count = 0;

  // Case 1: ? or # => Assume that the current spring is damaged and increase the # count
  if (spring === "?" || spring === "#") {
    count += recursion(hashCount + 1, springs.slice(1), groups);
  }
  // Case 2: ? or . => Assume the current spring is undamaged
  if (spring === "." || spring === "?") {
    if (groups.length > 0 && hashCount === group) {
      // Case 2.1: The current group is full and there are still groups remaining => Recurse with the next group and reset # count
      count += recursion(0, springs.slice(1), groups.slice(1));
    } else if (!hashCount) {
      // Case 2.2: The current group is still empty => Reset # count and recurse
      count += recursion(hashCount, springs.slice(1), groups);
    }
  }
  memo.set(sMapKey, count);
  return count;
};

const part1 = (rawInput) => {
  const input = parseInput(rawInput);
  return input.map(splitAtSpace).map(transform).map(startRecursion).reduce(sum);
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);
  return (
    input
      .map(splitAtSpace)
      .map(quintuple)
      .map(transform)
      .map(startRecursion)
      .reduce(sum)
  );
};

run({
  part1: {
    tests: [
      {
        input: `???.### 1,1,3
                .??..??...?##. 1,1,3
                ?#?#?#?#?#?#?#? 1,3,1,6
                ????.#...#... 4,1,1
                ????.######..#####. 1,6,5
                ?###???????? 3,2,1`,
        expected: 21,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `???.### 1,1,3
                .??..??...?##. 1,1,3
                ?#?#?#?#?#?#?#? 1,3,1,6
                ????.#...#... 4,1,1
                ????.######..#####. 1,6,5
                ?###???????? 3,2,1`,
        expected: 525152,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

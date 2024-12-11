import run from "aocrunner";
import { parseGroupedInput, sum, splitAt } from "../utils/index.js";

const buildHashmap = (acc, [key, value]) => (
  (acc[key] ??= []).push(value), acc
);
const filterValidWith = (dict) => (messageNums) =>
  messageNums
    .every((num, i) => (dict[num] ?? []).every(doesRuleApply(messageNums, i)));

const filterBrokenWith = (dict) => (messageNums) =>
  messageNums
    .some((num, i) =>
      dict[num] ? dict[num].some(doesRuleNotApply(messageNums, i)) : false,
    );

const doesRuleApply = (messageNums, i) => (ruleNum) =>
  messageNums.indexOf(ruleNum) > i || messageNums.indexOf(ruleNum) === -1;
const doesRuleNotApply = (messageNums, i) => (ruleNum) =>
  messageNums.indexOf(ruleNum) < i && messageNums.indexOf(ruleNum) !== -1;
const sortWithDict = (dict) => (a, b) =>
  dict[a]?.includes(b) ? -1
  : dict[b]?.includes(a) ? 1
  : 0;
const fixWith = (dict) => (messageNums) => messageNums.sort(sortWithDict(dict));
const pickMiddleElement = (messageNums) =>
  messageNums[~~(messageNums.length / 2)];

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const [rules, messages] = parseGroupedInput(rawInput);

  const dict = rules
    .map(splitAt("|"))
    .reduce(buildHashmap, {});

  return (
    messages.map(splitAt(","))
      .filter(filterValidWith(dict))
      .map(pickMiddleElement)
      .map(Number)
      .reduce(sum)
  );
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const [rules, messages] = parseGroupedInput(rawInput);

  const dict = rules
    .map(splitAt("|"))
    .reduce(buildHashmap, {});

  return (
    messages.map(splitAt(","))
      .filter(filterBrokenWith(dict))
      .map(fixWith(dict))
      .map(pickMiddleElement)
      .map(Number)
      .reduce(sum)
  );
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 143,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`,
        expected: 123,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

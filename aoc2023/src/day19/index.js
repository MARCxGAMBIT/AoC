import run from "aocrunner";
import { parseGroupedInput } from "../utils/index.js";

const ratingRegex = /{x=(?<x>\d+),m=(?<m>\d+),a=(?<a>\d+),s=(?<s>\d+)}/;
const conditionRegex = /(?<cat>\w)(?<op>[<>])(?<limit>\d+):(?<result>\w+)/;

const part1 = (rawInput) => {
  const input = parseGroupedInput(rawInput);
  const [rawWorkflows, rawRatings] = input;

  const ratings = rawRatings
    .map((rating) => rating.match(ratingRegex).slice(1).map(Number))
    .map(([x, m, a, s]) => ({ x, m, a, s }));

  const workflows = rawWorkflows.reduce((acc, workflow) => {
    const [name, rawConditions] = workflow.split("{");
    const conditions = rawConditions.slice(0, -1).split(",");

    acc[name] = conditions;
    return acc;
  }, {});

  const accepted = [];

  main: for (const part of ratings) {
    let wf = "in";
    while (true) {
      if (wf === "A") {
        accepted.push(part);
        continue main;
      }
      if (wf === "R") {
        continue main;
      }

      for (const condition of workflows[wf]) {
        const match = condition.match(conditionRegex);
        if (!match) {
          wf = condition;
          break;
        } else {
          const { cat, op, limit, result } = match.groups;
          const value = part[cat];
          if (op === "<" && value < limit) {
            wf = result;
            break;
          } else if (op === ">" && value > limit) {
            wf = result;
            break;
          }
        }
      }
    }
  }

  const result = accepted.reduce(
    (acc, { x, m, a, s }) => acc + x + m + a + s,
    0,
  );
  return result;
};

const part2 = (rawInput) => {
  const input = parseGroupedInput(rawInput);
  const [rawWorkflows] = input;
  const workflows = rawWorkflows.reduce((acc, workflow) => {
    const [name, rawConditions] = workflow.split("{");
    const conditions = rawConditions.slice(0, -1).split(",");

    acc[name] = conditions;
    return acc;
  }, {});

  const splits = {};
  for (const c of "xmas") {
    splits[c] = [1, 4000];
  }

  const accepted = [];
  const todo = [{ splits, remainingConditions: workflows.in, result: "in" }];

  while (todo.length > 0) {
    const current = todo.shift();

    const currentCondition = current.remainingConditions.shift();

    if (currentCondition === "A") {
      accepted.push(JSON.parse(JSON.stringify(current.splits)));
      continue;
    }
    if (currentCondition === "R") {
      continue;
    }

    const match = currentCondition.match(conditionRegex);

    if (!match) {
      todo.push({
        splits: JSON.parse(JSON.stringify(current.splits)),
        remainingConditions: workflows[currentCondition],
        result: currentCondition,
      });
    } else {
      const { cat, op, limit, result } = match.groups;
      const splits1 = JSON.parse(JSON.stringify(current.splits));
      const splits2 = JSON.parse(JSON.stringify(current.splits));

      if (op === ">") {
        splits1[cat][1] = +limit;
        splits2[cat][0] = +limit + 1;
      } else if (op === "<") {
        splits1[cat][0] = +limit;
        splits2[cat][1] = +limit - 1;
      }

      todo.push(
        {
          splits: splits2,
          remainingConditions:
            ["A", "R"].includes(result) ? [result] : workflows[result],
          result,
        },
        {
          splits: splits1,
          remainingConditions: current.remainingConditions,
          result: current.remainingConditions,
        },
      );
    }
  }
  const result = accepted
    .map(
      ({ x, m, a, s }) =>
        (x[1] - x[0] + 1) *
        (m[1] - m[0] + 1) *
        (a[1] - a[0] + 1) *
        (s[1] - s[0] + 1),
    )
    .reduce((acc, v) => acc + v, 0);

  return result;
};

run({
  part1: {
    tests: [
      {
        input: `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`,
        expected: 19114,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `px{a<2006:qkq,m>2090:A,rfg}
pv{a>1716:R,A}
lnx{m>1548:A,A}
rfg{s<537:gd,x>2440:R,A}
qs{s>3448:A,lnx}
qkq{x<1416:A,crn}
crn{x>2662:A,R}
in{s<1351:px,qqz}
qqz{s>2770:qs,m<1801:hdj,R}
gd{a>3333:R,R}
hdj{m>838:A,pv}

{x=787,m=2655,a=1222,s=2876}
{x=1679,m=44,a=2067,s=496}
{x=2036,m=264,a=79,s=2244}
{x=2461,m=1339,a=466,s=291}
{x=2127,m=1623,a=2188,s=1013}`,
        expected: 167409079868000,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

# 🎄 Advent of Code 2023 - day 2 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/2)

## Notes

Part 2 minified solution

```
const p = [
  /(\d+) red/g,
  /(\d+) green/g,
  /(\d+) blue/g
]

const part2 = (i) => parseInput(i)
  .reduce((a, l) => a + p.reduce((a, c) => a * Math.max(...[...l.matchAll(c)].map(([_, v]) => v)), 1), 0);

```

Part 2 loooooops

```
const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  let sum = 0;

  for (let line of input) {
    let power = 1;
    for (let pattern of patterns) {
      const matches = [...line.matchAll(pattern)];
      let maxCubes = 0;
      for (let [, cubes] of matches) {
        maxCubes = Math.max(maxCubes, cubes)
      }
      power *= maxCubes;
    }
    sum += power;
  }
  return sum;
}
```

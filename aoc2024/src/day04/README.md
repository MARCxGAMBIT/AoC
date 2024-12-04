# 🎄 Advent of Code 2024 - day 4 🎄

## Info

Task description: [link](https://adventofcode.com/2024/day/4)

## Notes

Old part 1

```js
const part1 = (rawInput) => {
  const input = parseMatrix(rawInput);

  const horizontal = input
    .map(row => row.join(""))
    .map(row => [...row.matchAll(/(XMAS)/g)].length + [...row.matchAll(/(SAMX)/g)].length)
    .reduce(sum, 0);

  const vertical = transpose(input)
    .map(row => row.join(""))
    .map(row => [...row.matchAll(/(XMAS)/g)].length + [...row.matchAll(/(SAMX)/g)].length)
    .reduce(sum, 0);

  const diagonal1 = transpose(input)
    .map((row, i) => "Y".repeat(i) + row.join("") + "Y".repeat(input.length - i - 1))
    .map(row => row.split(""))

  const diago1 = transpose(diagonal1)
    .map(row => row.join(""))
    .map(row => [...row.matchAll(/(XMAS)/g)].length + [...row.matchAll(/(SAMX)/g)].length)
    .reduce(sum, 0);

  const diagonal2 = transpose(input)
    .map((row, i) => "Y".repeat(input.length - i - 1) + row.join("") + "Y".repeat(i))
    .map(row => row.split(""))

  const diago2 = transpose(diagonal2)
    .map(row => row.join(""))
    .map(row => [...row.matchAll(/(XMAS)/g)].length + [...row.matchAll(/(SAMX)/g)].length)
    .reduce(sum, 0);



  return horizontal + vertical + diago1 + diago2;
};
```

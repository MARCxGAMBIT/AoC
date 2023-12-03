import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const nums = [];
  for (let i = 0; i < input.length; i++) {
    const line = input[i];
    let tempNum = "";
    for (let j = 0; j < line.length; j++) {
      const char = line[j];
      if (char == +char) {
        tempNum += char;
      }

      if (tempNum.length > 0 && char != +char) {
        nums.push({
          num: tempNum,
          x: j - tempNum.length,
          y: i,
        });
        tempNum = "";
      }

      if (tempNum.length > 0 && j == line.length - 1) {
        nums.push({
          num: tempNum,
          x: j - tempNum.length + 1,
          y: i,
        });
        tempNum = "";
      }
    }
  }

  let sum = 0;

  
  for (let num of nums) {
    const lineBefore = input[num.y - 1]?.substring(num.x - 1, num.x + num.num.length + 1) ?? "";
    const charBefore = input[num.y][num.x - 1] ?? "";
    const charAfter = input[num.y][num.x + num.num.length] ?? "";
    const lineAfter = input[num.y + 1]?.substring(num.x - 1, num.x + num.num.length + 1) ?? "";
    const neighbor = `${lineBefore}${charBefore}${charAfter}${lineAfter}`;
    const regex = /[^.]/g;
    if (regex.test(neighbor)) {
      sum += +num.num;
    }

  }

  return sum;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const neighbor_coll = [];
  for (let row = 0; row < input.length; row++) {
    const line = input[row];
    for (let col = 0; col < line.length; col++) {
      if (line[col] == "*") {
        const neighbors = [];

        const condensedLines = input.slice(row - 1, row + 2).map((line) => line.slice(col - 3, col + 4));
        for (let line of condensedLines) {
          const matches = line?.matchAll(/\d+/g) ?? [];
          for (const match of matches) {
            if (match.index - 3 < 0 && (match.index + match[0].length - 3) >= 0) {
              neighbors.push(match[0]);
            } else if (match.index + match[0].length - 3 > 0 && match.index - 3 <= 1) {
                neighbors.push(match[0]);
              }
          }
        }
        neighbor_coll.push(neighbors);
      }
    }
  }


  let sum = 0;
  for (let neighbors of neighbor_coll) {
    if (neighbors.length == 2) {
      sum += neighbors[0] * neighbors[1];
    }
  }

  return sum;
};

run({
  part1: {
    tests: [
      {
        input: `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 4361,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`,
        expected: 467835,
      },
      {
        input: `11.11
..*..
.....`,
        expected: 121,
      }
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

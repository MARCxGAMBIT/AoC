export function parseInput(rawInput) {
  return rawInput.split("\n").map((line) => line.trim());
}

export function parseMatrix(rawInput) {
  return rawInput.split("\n").map((line) => line.trim().split(""));
}

export function parseGroupedInput(rawInput) {
  return rawInput
    .split("\n\n")
    .map((group) => group.split("\n").map((line) => line.trim()));
}

export function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

export function sum(a, b) {
  return a + b;
}

export function prod(a, b) {
  return a * b;
}

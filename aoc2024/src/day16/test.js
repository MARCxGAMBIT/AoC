import { readFileSync } from "fs";
import { MinPriorityQueue } from "@datastructures-js/priority-queue";

class Complex {
  constructor(real, imag) {
    this.real = real;
    this.imag = imag;
  }

  add(other) {
    return new Complex(this.real + other.real, this.imag + other.imag);
  }

  multiply(other) {
    return new Complex(
      this.real * other.real - this.imag * other.imag,
      this.real * other.imag + this.imag * other.real,
    );
  }

  equals(other) {
    return this.real === other.real && this.imag === other.imag;
  }

  toString() {
    return `${this.real},${this.imag}`;
  }
}

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  push(element) {
    this.values.push(element);
    this.sort();
  }

  pop() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a[0] - b[0]);
  }
}

const input = readFileSync("input.txt", "utf8").split("\n");
const grid = new Map();

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] !== "#") {
      grid.set(new Complex(i, j).toString(), input[i][j]);
    }
  }
}

let start;
for (const [pos, val] of grid.entries()) {
  if (val === "S") {
    const [real, imag] = pos.split(",").map(Number);
    start = new Complex(real, imag);
    break;
  }
}

const seen = [];
let best = 1e9;
const dist = new Map();
const todo = new MinPriorityQueue((e) => e[0]);
let c = 0;

todo.enqueue([0, 0, start, new Complex(0, 1), [start]]);

while (todo.isEmpty() === false) {
  const [val, _, pos, dir, path] = todo.dequeue();
  const key = `${pos.toString()},${dir.toString()}`;

  if (dist.has(key) && val > dist.get(key)) continue;
  dist.set(key, val);

  if (grid.get(pos.toString()) === "E" && val <= best) {
    c++;
    console.log("FOUND", c, val);
    seen.push(...path);
    best = val;
  }

  const moves = [
    [new Complex(1, 0), 1],
    [new Complex(0, 1), 1001],
    [new Complex(0, -1), 1001],
  ];

  for (const [r, v] of moves) {
    const newVal = val + v;
    const t = _ + 1;
    const newDir = dir.multiply(r);
    const newPos = pos.add(newDir);

    if (!grid.has(newPos.toString())) continue;

    todo.push([newVal, t, newPos, newDir, [...path, newPos]]);
  }
}

console.log(best, new Set(seen.map((p) => p.toString())).size);

import run from "aocrunner";

const mod = (n, m) => ((n % m) + m) % m;

const execute = (registerA, registerB, registerC, program) => {
  const instructions = {
    0: (operand) => (
      (registerA = Math.floor(registerA / 2 ** convertComboOperand(operand))),
      undefined
    ),
    1: (operand) => ((registerB ^= operand), undefined),
    2: (operand) => (
      (registerB = mod(convertComboOperand(operand), 8)), undefined
    ),
    3: (operand) => (registerA === 0 ? undefined : operand),
    4: (operand) => ((registerB ^= registerC), undefined),
    5: (operand) => (
      output.push(mod(convertComboOperand(operand), 8)), undefined
    ),
    6: (operand) => (
      (registerB = Math.floor(registerA / 2 ** convertComboOperand(operand))),
      undefined
    ),
    7: (operand) => (
      (registerC = Math.floor(registerA / 2 ** convertComboOperand(operand))),
      undefined
    ),
  };

  const convertComboOperand = (comboOperand) => {
    return (
      comboOperand < 4 ? comboOperand
      : comboOperand === 4 ? registerA
      : comboOperand === 5 ? registerB
      : registerC
    );
  };

  let output = [];
  let pointer = 0;

  while (pointer < program.length) {
    const instruction = program[pointer];
    const operand = program[pointer + 1];
    const instructionFunction = instructions[instruction];
    const jump = instructionFunction(operand);
    pointer = jump !== undefined ? jump : pointer + 2;
  }
  return output;
};

/**
 * Calculate the solution of part 1
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part1 = (rawInput) => {
  const input = rawInput.match(/\d+/g).map(Number);
  let [registerA, registerB, registerC, ...program] = input;

  return execute(registerA, registerB, registerC, program).join(",");
};

/**
 * Calculate the solution of part 2
 *
 * @param {string} rawInput
 * @returns {Number} solution to the problem
 */
const part2 = (rawInput) => {
  const input = rawInput.match(/\d+/g).map(Number);
  let [_, registerB, registerC, ...program] = input;

  const queue = [];
  queue.push({ result: "", length: 0 });
  while (queue.length) {
    const { result, length } = queue.shift();
    if (length === program.length) {
      return parseInt(result, 2);
    }

    const from = parseInt(`${result}000`, 2);
    const to = parseInt(`${result}111`, 2);
    const target = program.slice(-1 * (length + 1)).join(",");

    for (let a = from; a <= to; a++) {
      const output = execute(a, registerB, registerC, program).join(",");
      if (output === target) {
        queue.push({ result: a.toString(2), length: length + 1 });
      }
    }
  }
};

/**
 * AoC Runner
 */
run({
  part1: {
    tests: [
      {
        input: `Register A: 729
Register B: 0
Register C: 0

Program: 0,1,5,4,3,0`,
        expected: "4,6,3,5,6,3,5,2,1,0",
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [
      {
        input: `Register A: 1
Register B: 0
Register C: 0

Program: 0,3,5,4,3,0`,
        expected: 117440,
      },
    ],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

import run from "aocrunner";
import lcm from "compute-lcm";

const parseInput = (rawInput) =>
  rawInput.split("\n").map((line) => line.trim());

class BroadCaster {
  constructor(name, destinations, config, queue) {
    this.name = name;
    this.config = config;
    this.destinations = destinations;
    this.queue = queue;
  }

  receive(pulse, name) {
    this.send();
  }

  initDestinationMemory() {
    for (let destination of this.destinations) {
      this.config[destination]?.initMemory?.(this.name);
    }
  }

  send() {
    const pulse = "L";
    for (let destination of this.destinations) {
      this.queue.push([this.name, destination, pulse]);
    }
  }
}

class FlipFlop {
  constructor(name, destinations, config, queue) {
    this.state = false;
    this.name = name;
    this.config = config;
    this.destinations = destinations;
    this.queue = queue;
  }

  initDestinationMemory() {
    for (let destination of this.destinations) {
      this.config[destination]?.initMemory?.(this.name);
    }
  }

  receive(pulse, name) {
    if (pulse === "L") {
      this.state = !this.state;
      this.send();
    }
  }

  send() {
    const pulse = this.state ? "H" : "L";
    for (let destination of this.destinations) {
      this.queue.push([this.name, destination, pulse]);
    }
  }
}

class Conjunction {
  constructor(name, destinations, config, queue) {
    this.name = name;
    this.config = config;
    this.destinations = destinations;
    this.memory = {};
    this.queue = queue;
  }

  initMemory(name) {
    this.memory[name] = "L";
  }

  initDestinationMemory() {
    for (let destination of this.destinations) {
      this.config[destination]?.initMemory?.(this.name);
    }
  }

  receive(pulse, name) {
    this.memory[name] = pulse;
    this.send();
  }

  send() {
    const pulse =
      Object.entries(this.memory).every(([_, pulse]) => pulse === "H") ?
        "L"
      : "H";
    for (let destination of this.destinations) {
      this.queue.push([this.name, destination, pulse]);
    }
  }
}

const part1 = (rawInput) => {
  const input = parseInput(rawInput);

  const queue = [];

  const config = input.reduce((acc, line) => {
    const [module, destinations] = line.split(" -> ");
    if (module[0] === "%") {
      acc[module.substring(1)] = new FlipFlop(
        module.substring(1),
        destinations.split(", "),
        acc,
        queue,
      );
    } else if (module[0] === "&") {
      acc[module.substring(1)] = new Conjunction(
        module.substring(1),
        destinations.split(", "),
        acc,
        queue,
      );
    } else {
      acc[module] = new BroadCaster(
        module,
        destinations.split(", "),
        acc,
        queue,
      );
    }
    return acc;
  }, {});

  for (let module in config) {
    config[module]?.initDestinationMemory();
  }

  let highCount = 0;
  let lowCount = 0;
  for (let i = 0; i < 1000; i++) {
    queue.push(["button", "broadcaster", "L"]);
    while (queue.length > 0) {
      const [sender, receiver, pulse] = queue.shift();
      pulse === "L" ? highCount++ : lowCount++;
      config[receiver]?.receive(pulse, sender);
    }
  }

  return highCount * lowCount;
};

const part2 = (rawInput) => {
  const input = parseInput(rawInput);

  const queue = [];

  const config = input.reduce((acc, line) => {
    const [module, destinations] = line.split(" -> ");
    if (module[0] === "%") {
      acc[module.substring(1)] = new FlipFlop(
        module.substring(1),
        destinations.split(", "),
        acc,
        queue,
      );
    } else if (module[0] === "&") {
      acc[module.substring(1)] = new Conjunction(
        module.substring(1),
        destinations.split(", "),
        acc,
        queue,
      );
    } else {
      acc[module] = new BroadCaster(
        module,
        destinations.split(", "),
        acc,
        queue,
      );
    }
    return acc;
  }, {});

  for (let module in config) {
    config[module]?.initDestinationMemory();
  }

  // yeah what can I say, I'm lazy
  const magicSenders = ["js", "qs", "dt", "ts"];

  let cycles = 0;
  let minCycles = magicSenders.reduce((acc, sender) => {
    acc[sender] = -1;
    return acc;
  }, {});

  while (true) {
    queue.push(["button", "broadcaster", "L"]);
    cycles++;
    while (queue.length > 0) {
      const [sender, receiver, pulse] = queue.shift();
      if (
        magicSenders.includes(sender) &&
        pulse === "H" &&
        minCycles[sender] === -1
      ) {
        minCycles[sender] = cycles;
        if (Object.values(minCycles).every((min) => min !== -1)) {
          return lcm(...Object.values(minCycles));
        }
      }
      config[receiver]?.receive(pulse, sender);
    }
  }
};

run({
  part1: {
    tests: [
      {
        input: `broadcaster -> a, b, c
                %a -> b
                %b -> c
                %c -> inv
                &inv -> a`,
        expected: 32000000,
      },
      {
        input: `broadcaster -> a
                %a -> inv, con
                &inv -> b
                %b -> con
                &con -> output`,
        expected: 11687500,
      },
    ],
    solution: part1,
  },
  part2: {
    tests: [],
    solution: part2,
  },
  trimTestInputs: true,
  onlyTests: false,
});

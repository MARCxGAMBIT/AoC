import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n\n");

const transpose = (matrix) => matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));

const sum = (a, b) => a + b;

const diffBetweenRows = (a, b) => {
    let diffsAt = [];
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            diffsAt.push(i);
        };
    }
    return diffsAt;
}

const findReflection = (matrix) => {
    let reflectionAt = 0;
    for (let i = 0; i < matrix.length - 1; i++) {
        if (diffBetweenRows(matrix[i], matrix?.[i + 1]).length === 0) {
            for (let j = i; j >= 0; j--) {
                if (2 * i - j + 1 < matrix.length && diffBetweenRows(matrix[j], matrix?.[2 * i - j + 1]).length !== 0) {
                    break;
                }
                if (j === 0) {
                    reflectionAt = i + 1;
                }
            }
        }
    }
    return reflectionAt;
}

const flip = (char) => {
    return {
        "#": ".",
        ".": "#",
    }[char];
}


const findReflection2 = (matrix, oldReflection) => {
    let reflectionAt = 0;
    for (let i = 0; i < matrix.length; i++) {
        if (matrix?.[i + 1] && diffBetweenRows(matrix[i], matrix?.[i + 1]).length <= 1) {
            for (let j = i; j >= 0; j--) {
                let smudges = [];
                const orig = matrix[j];
                const reflection = matrix?.[2 * i - j + 1];

                if (reflection) {
                    const newSmudges = diffBetweenRows(orig, reflection);
                    if (newSmudges.length > 1) {
                        break;
                    }
                    if (newSmudges.length === 1 && smudges.length === 1) {
                        break;
                    }
                    smudges = newSmudges;
                }

                if (j === 0) {
                    reflectionAt = i + 1;
                    if (smudges.length === 1) {
                        matrix[j][smudges[0]] = flip(matrix[j][smudges[0]]);
                    }
                    if (oldReflection !== reflectionAt) {
                        return reflectionAt;
                    }
                }
            }
        }
    }
    return reflectionAt;
}

const part1 = (rawInput) => {
    const input = parseInput(rawInput);

    let sum = 0;
    for (const pattern of input) {
        const matrix = pattern.split("\n").map(line => line.split(""));
        const transposed = transpose(matrix);

        sum += 100 * findReflection(matrix) + findReflection(transposed);
    }

    return sum;
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    let sum = 0;
    for (const pattern of input) {
        const matrix = pattern.split("\n").map(line => line.split(""));
        const origReflectionAt = findReflection(matrix);
        const reflectionAt = findReflection2(matrix, origReflectionAt);

        let score = 0;
        if (reflectionAt !== origReflectionAt) {
            score = 100 * reflectionAt;
        } else {
            const origTransposedReflection = findReflection(transpose(matrix));
            const transposedReflectionAt = findReflection2(transpose(matrix), origTransposedReflection);

            if (transposedReflectionAt !== origTransposedReflection) {
                score = transposedReflectionAt;
            }
        }
        sum += score;
    }

    return sum;
};

run({
    part1: {
        tests: [
            {
                input: `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`,
                expected: 405,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `.#.##.#.###
..####..##.
#########..
.##..##..##
.##..##..##
#########..
..####..##.
.#.##.#.###
#.#..#.##.#
..#####.###
...##.....#
..#..#..#..
...##...#..`,
                expected: 4,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

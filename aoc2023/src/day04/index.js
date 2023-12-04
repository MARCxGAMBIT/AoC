import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const part1 = (rawInput) => {
    return parseInput(rawInput)
        .map((line) => {
            const [, card] = line.split(": ");
            const [win_nums, my_nums] = card
                .split(" | ")
                .map((nums) => nums.trim().split(/\s+/g));

            let num_count = win_nums.filter(num => my_nums.includes(num)).length;

            return Math.max(1 << num_count - 1, 0);
        })
        .reduce((acc, curr) => acc + curr, 0);
};

const part2 = (rawInput) => {
    const input = parseInput(rawInput);

    const card_infos = input.map((line) => {
        const [, card] = line.split(": ");
        const [win_nums, my_nums] = card.split(" | ").map((nums) => nums.trim().split(/\s+/g));
        const count = win_nums.filter(num => my_nums.includes(num)).length;
        return { count }
    });

    let sum = input.length;
    for (let i = card_infos.length - 1; i >= 0; i--) {
        const card_info = card_infos[i];
        const won_cards = card_infos.slice(i + 1, i + card_info.count + 1);
        card_info.points = card_info.count + won_cards.reduce((acc, curr) => acc + curr.points, 0);
        sum += card_info.points;
    }
    return sum;
};

run({
    part1: {
        tests: [
            {
                input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
                expected: 13,
            },
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
        Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
        Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
        Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
        Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
        Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`,
                expected: 30,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: false,
});

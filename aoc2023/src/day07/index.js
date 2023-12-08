import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");


const part1 = (rawInput) => {
    const order = "AKQJT98765432";
    const input = parseInput(rawInput).map((line) => line.trim());

    const parsed = input.map((line) => {
        const [hand, bid] = line.split(" ");
        const counts = Array(order.length).fill(0);
        for (const card of hand) {
            counts[order.indexOf(card)]++;
        }
        const card_counts = counts.sort((a,b) => b-a).slice(0, 2).join("");
        return {hand, card_counts, bid};
    });

    const sorted = parsed.sort((a, b) => {
        if (a.card_counts !== b.card_counts) {
            return a.card_counts - b.card_counts;
        } else {
            for (let i = 0; i < a.hand.length; i++) {
                if (a.hand[i] !== b.hand[i]) {
                    return order.indexOf(b.hand[i]) - order.indexOf(a.hand[i]);
                }
            }
        }
        return 0;
    });

    return sorted.reduce((acc, curr, i) => {
        return acc + (i + 1) * curr.bid;
    }, 0);
};

const part2 = (rawInput) => {
    const order = "AKQT98765432J";
    const input = parseInput(rawInput).map((line) => line.trim());

    const parsed = input.map((line) => {
        const [hand, bid] = line.split(" ");
        const counts = Array(order.length).fill(0);
        for (const card of hand) {
            counts[order.indexOf(card)]++;
        }
        const jokerCount = counts.pop();
        const relevantCounts = counts.sort((a,b) => b-a).slice(0, 2);
        relevantCounts[0] += jokerCount;

        const card_counts = relevantCounts.join("");

        return {hand, card_counts, bid};
    });

    console.log(parsed)

    const sorted = parsed.sort((a, b) => {
        if (a.card_counts !== b.card_counts) {
            return a.card_counts - b.card_counts;
        } else {
            for (let i = 0; i < a.hand.length; i++) {
                if (a.hand[i] !== b.hand[i]) {
                    return order.indexOf(b.hand[i]) - order.indexOf(a.hand[i]);
                }
            }
        }
        return 0;
    });

    return sorted.reduce((acc, curr, i) => {
        return acc + (i + 1) * curr.bid;
    }, 0);
};

run({
    part1: {
        tests: [
            {
                input: `32T3K 765
                T55J5 684
                KK677 28
                KTJJT 220
                QQQJA 483`,
                expected: 6440,
            }, {
                input: `32T3K 5
                32T3A 6`,
                expected: 5 + 6*2
            }
        ],
        solution: part1,
    },
    part2: {
        tests: [
            {
                input: `32T3K 765
                T55J5 684
                KK677 28
                KTJJT 220
                QQQJA 483`,
                expected: 5905,
            },
        ],
        solution: part2,
    },
    trimTestInputs: true,
    onlyTests: true,
});

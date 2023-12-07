import run from "aocrunner";

const parseInput = (rawInput) => rawInput.split("\n");

const order = "AKQJT98765432";
const order2 = "AKQT98765432J";

const getStrength = (hand) => {
    if (hand.includes(5)) {
        return 6;
    } else if (hand.includes(4)) {
        return 5;
    } else if (hand.includes(3) && hand.includes(2)) {
        return 4;
    } else if (hand.includes(3)) {
        return 3;
    } else if (hand.filter((c) => c === 2).length === 2) {
        return 2;
    } else if (hand.includes(2)) {
        return 1;
    } else {
        return 0;
    }
}

const adjustStrength = (counts) => {
    const strengthWithoutJokers = getStrength(counts.slice(0, counts.length - 1));
    const jokerCount = counts[counts.length - 1];
    let newStrength = strengthWithoutJokers;
    if (jokerCount === 0) {
        return strengthWithoutJokers;
    } else if (jokerCount === 1) {
        if (strengthWithoutJokers === 1 || strengthWithoutJokers === 2 || strengthWithoutJokers === 3) {
            newStrength = strengthWithoutJokers + 2;
        } else {
            newStrength = strengthWithoutJokers + 1;
        }
    } else if (jokerCount === 2) {
        if (strengthWithoutJokers === 1) {
            newStrength = 5;
        } else {
            newStrength = strengthWithoutJokers + 3;
        }
    } else if (jokerCount === 3) {
        if (strengthWithoutJokers === 0) {
            newStrength = 5;
        } else {
            newStrength = 6;
        }
    } else {
        newStrength = 6;
    }
    return Math.min(newStrength, 6);
};

const part1 = (rawInput) => {
    const input = parseInput(rawInput).map((line) => line.trim());

    const parsed = input.map((line) => {
        const [hand, bid] = line.split(" ");
        const counts = Array(order.length).fill(0);
        for (const card of hand) {
            counts[order.indexOf(card)]++;
        }
        const strength = getStrength(counts);
        return {hand, counts, bid, strength};
    });

    const sorted = parsed.sort((a, b) => {
        if (a.strength !== b.strength) {
            return a.strength - b.strength;
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
    const input = parseInput(rawInput).map((line) => line.trim());

    const parsed = input.map((line) => {
        const [hand, bid] = line.split(" ");
        const counts = Array(order2.length).fill(0);
        for (const card of hand) {
            counts[order2.indexOf(card)]++;
        }
        const strength = adjustStrength(counts);
        return {hand, counts, bid, strength};
    });

    const sorted = parsed.sort((a, b) => {
        if (a.strength !== b.strength) {
            return a.strength - b.strength;
        } else {
            for (let i = 0; i < a.hand.length; i++) {
                if (a.hand[i] !== b.hand[i]) {
                    return order2.indexOf(b.hand[i]) - order2.indexOf(a.hand[i]);
                }
            }
        }
        return 0;
    });

    console.log(sorted.map((s) => `${s.hand} - ${s.counts} - ${s.strength}`).join("\n"));

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
    onlyTests: false,
});

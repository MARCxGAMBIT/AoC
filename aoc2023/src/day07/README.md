# 🎄 Advent of Code 2023 - day 7 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/7)

## Notes

...

32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
QQQKA 1
KKKJA 2
QQQJJ 3
TT9TT 4
AAAAA 5

249515436

```js
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
};

const adjustStrength = (counts) => {
  const strengthWithoutJokers = getStrength(counts.slice(0, counts.length - 1));
  const jokerCount = counts[counts.length - 1];
  let newStrength = strengthWithoutJokers;
  if (jokerCount === 0) {
    return strengthWithoutJokers;
  } else if (jokerCount === 1) {
    if (
      strengthWithoutJokers === 1 ||
      strengthWithoutJokers === 2 ||
      strengthWithoutJokers === 3
    ) {
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
```

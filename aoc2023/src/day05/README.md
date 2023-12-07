# 🎄 Advent of Code 2023 - day 5 🎄

## Info

Task description: [link](https://adventofcode.com/2023/day/5)

## Notes

Stolen Kotlin solution converted to JS which runs in 7ms

```js
const part2 = (rawInput) => {
    const lines = parseInput(rawInput)
    const seeds = lines[0].substring(lines[0].indexOf(" ") + 1).split(" ").map(it => parseInt(it)).reduce((acc, cur, index, array) => {
        if (index % 2 === 0) {
            acc.push([cur, array[index + 1]]);
        }
        return acc;
    }, []).map(([start, end]) => [start, start + end]);

    const maps = lines.slice(2).join("\n").split("\n\n").map(section => {
        return section.split("\n").slice(1).reduce((acc, line) => {
            const [dest, source, length] = line.split(" ").map(it => parseInt(it));
            const startRange = source;
            const endRange = source + length;
            acc[startRange + ".." + endRange] = dest + ".." + (dest + length);
            return acc;
        }, {});
    });

    const result = seeds.flatMap(seedsRange => {
        return maps.reduce((aac, map) => {
            return aac.flatMap(range => {
                return Object.entries(map).map(([source, dest]) => {
                    const [start, end] = [Math.max(range[0], parseInt(source.split("..")[0])), Math.min(range[1], parseInt(source.split("..")[1]))];
                    if (start <= end) {
                        const offset = dest.split("..")[0] - parseInt(source.split("..")[0]);
                        return [start + offset, end + offset];
                    } else {
                        return null;
                    }
                }).filter(it => it !== null);
            });
        }, [seedsRange]);
    });

    return result.reduce((min, it) => Math.min(min, it[0]), Infinity);
};
```
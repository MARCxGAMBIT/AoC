# 🎄 Advent of Code 2024 - day 23 🎄

## Info

Task description: [link](https://adventofcode.com/2024/day/23)

## Notes

...

```js
const bronKerbosch = (currentClique, potentialNodes, excludedNodes, graph) => {
  let cliques = new Set();
  if (potentialNodes.size === 0 && excludedNodes.size === 0) {
    cliques.add(new Set(currentClique));
  }
  for (let node of potentialNodes) {
    cliques = new Set([
      ...cliques,
      ...bronKerbosch(
        new Set(currentClique).add(node),
        new Set([...potentialNodes].filter((c) => graph[node].has(c))),
        new Set([...excludedNodes].filter((x) => graph[node].has(x))),
        graph,
      ),
    ]);
    potentialNodes.delete(node);
    excludedNodes.add(node);
  }
  return cliques;
};

let allCliques = bronKerbosch(new Set(), new Set(computers), new Set(), graph);
const maxClique = [...allCliques].sort((a, b) => b.size - a.size)[0];
```

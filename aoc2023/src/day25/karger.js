// https://www.geeksforgeeks.org/introduction-and-implementation-of-kargers-algorithm-for-minimum-cut/

export class Edge {
    constructor(s, d) {
        this.src = s;
        this.dest = d;
    }
}

export class Graph {
    constructor(v, e, edges) {
        this.V = v;
        this.E = e;
        this.edge = edges;
    }
}

class subset {
    constructor(p, r) {
        this.parent = p;
        this.rank = r;
    }
}

export function kargerMinCut(graph) {
    let V = graph.V;
    let E = graph.E;
    let edge = graph.edge;

    let subsets = [];

    for (let v = 0; v < V; v++) {
        subsets[v] = new subset(v, 0);
    }

    let vertices = V;

    while (vertices > 2) {
        // let i = Math.floor(Math.random() * 10) % E;
        let i = Math.floor(Math.random() * (E - 1));

        let subset1 = find(subsets, edge[i].src);
        let subset2 = find(subsets, edge[i].dest);

        if (subset1 === subset2) {
            continue;
        } else {
            // console.log("Contracting edge " + edge[i].src + "-" + edge[i].dest);
            vertices--;
            Union(subsets, subset1, subset2);
        }
    }

    let cutedges = 0;
    for (let i = 0; i < E; i++) {
        let subset1 = find(subsets, edge[i].src);
        let subset2 = find(subsets, edge[i].dest);
        if (subset1 !== subset2) {
            cutedges++;
        }
    }

    const components = new Array(V).fill(0).map((_, i) => find(subsets, i));

    return [cutedges, components];
}

function find(subsets, i) {
    if (subsets[i].parent !== i) {
        subsets[i].parent = find(subsets, subsets[i].parent);
    }
    return subsets[i].parent;
}

function Union(subsets, x, y) {
    let xroot = find(subsets, x);
    let yroot = find(subsets, y);

    if (subsets[xroot].rank < subsets[yroot].rank) {
        subsets[xroot].parent = yroot;
    } else if (subsets[xroot].rank > subsets[yroot].rank) {
        subsets[yroot].parent = xroot;
    } else {
        subsets[yroot].parent = xroot;
        subsets[xroot].rank++;
    }
}
class Grafo {
    nodes: string[];
    adjList: Record<string, string[]>;

    constructor() {
        this.nodes = [];
        this.adjList = {};
    }

    addNode(node: string) {
        if (!this.nodes.includes(node)) {
            this.nodes.push(node);
            this.adjList[node] = [];
        }
    }

    addEdge(node1: string, node2: string) {
        if (!this.adjList[node1] || !this.adjList[node2]) {
            return;
        }

        if (!this.adjList[node1].includes(node2)) {
            this.adjList[node1].push(node2);
        }
        if (!this.adjList[node2].includes(node1)) {
            this.adjList[node2].push(node1);
        }
    }

    searchNode(node: string) {
        if (!this.nodes.length) return [];
        return this.nodes.filter((n) => n === node);
    }

    printAdjacency(node: string) {
        if (this.searchNode(node).length) {
            console.log(this.adjList[node]);
        }
    }

    printGraph() {
        console.log(this.adjList);
    }
}

export default Grafo;

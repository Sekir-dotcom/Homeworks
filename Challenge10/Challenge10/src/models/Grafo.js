class Grafo {
    constructor() {
        this.nodes = [];
        this.adjList = {};
    }

    addNode(node) {
        this.nodes.push(node);
        this.adjList[node] = [];
    }

    addEdge(node1, node2) {
        this.adjList[node1].push(node2);
        this.adjList[node2].push(node1);
    }

    searchNode(node) {
        if ( !this.nodes.length ) return;
        return this.nodes.filter(n => n === node);
    }

    printAdjacency(node) {
        if ( this.searchNode(node).length ) {
            console.log( this.adjList[node] );
        }
    }

    printGraph() {
        console.log(this.adjList);
    }
}
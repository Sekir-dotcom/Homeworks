import { useEffect, useMemo, useState } from "react";
import { Graph } from "react-d3-graph";
import Grafo from "./models/Grafo.ts";

const cities = [
    { id: "Madrid", name: "Madrid" },
    { id: "Barcelona", name: "Barcelona" },
    { id: "Valencia", name: "Valencia" },
];

const people = [
    { id: "Ana", name: "Ana", age: 21, city: "Madrid" },
    { id: "Luis", name: "Luis", age: 24, city: "Barcelona" },
    { id: "Marta", name: "Marta", age: 22, city: "Madrid" },
    { id: "Carlos", name: "Carlos", age: 20, city: "Valencia" },
    { id: "Alicia", name: "Alicia", age: 23, city: "Barcelona" },
    { id: "Pedro", name: "Pedro", age: 26, city: "Valencia" },
    { id: "Sofía", name: "Sofía", age: 19, city: "Madrid" },
];

const friendships = [
    ["Ana", "Luis"],
    ["Ana", "Marta"],
    ["Luis", "Carlos"],
    ["Luis", "Alicia"],
    ["Marta", "Sofía"],
    ["Carlos", "Pedro"],
];

const graphConfig = {
    directed: false,
    nodeHighlightBehavior: true,
    height: 520,
    width: 900,
    panAndZoom: true,
    staticGraph: false,
    node: {
        color: "#8ecae6",
        size: 500,
        highlightStrokeColor: "#023047",
        fontSize: 14,
    },
    link: {
        highlightColor: "#ffb703",
        renderLabel: false,
    },
    d3: {
        gravity: -200,
        linkLength: 150,
    },
    labelProperty: "label",
};

function App() {
    const [selectedCity, setSelectedCity] = useState(cities[0].id);

    const graphData = useMemo(() => {
        const nodes = [
            ...cities.map((city) => ({
                id: city.id,
                label: city.name,
                color: "#fb8500",
            })),
            ...people.map((person) => ({
                id: person.id,
                label: `${person.name} (${person.age})`,
                color: "#8ecae6",
            })),
        ];

        const links = [
            ...people.map((person) => ({
                source: person.id,
                target: person.city,
            })),
            ...friendships.map(([a, b]) => ({
                source: a,
                target: b,
            })),
        ];

        return { nodes, links };
    }, []);

    const graphModel = useMemo(() => {
        const graph = new Grafo();
        cities.forEach((city) => graph.addNode(city.id));
        people.forEach((person) => graph.addNode(person.id));
        people.forEach((person) => graph.addEdge(person.id, person.city));
        friendships.forEach(([a, b]) => graph.addEdge(a, b));
        return graph;
    }, []);

    const peopleInSelectedCity = people.filter((person) => person.city === selectedCity);

    useEffect(() => {
        graphModel.printAdjacency(selectedCity);
    }, [selectedCity, graphModel]);

    return (
        <main className="app">
            <section className="controls">
                <label htmlFor="city-select">Selecciona una ciudad:</label>
                <select
                    id="city-select"
                    value={selectedCity}
                    onChange={(event) => setSelectedCity(event.target.value)}
                >
                    {cities.map((city) => (
                        <option key={city.id} value={city.id}>
                            {city.name}
                        </option>
                    ))}
                </select>
            </section>

            <section className="graph-wrapper">
                <Graph id="friends-cities-graph" data={graphData} config={graphConfig} />
            </section>

            <section className="residents">
                <h2>Personas que viven en {selectedCity}</h2>
                <ul>
                    {peopleInSelectedCity.map((person) => (
                        <li key={person.id}>
                            {person.name} - {person.age} años
                        </li>
                    ))}
                    {peopleInSelectedCity.length === 0 && <li>No hay personas en esta ciudad.</li>}
                </ul>
            </section>
        </main>
    );
}

export default App;

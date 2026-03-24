import { useState } from "react";
import { Fila } from "./models/Fila";
import type { Persona } from "./models/Persona";
import FormularioPersona from "./components/FormularioPersona";
import ListaPersonas from "./components/ListaPersonas";

function App() {
  const [cola] = useState(new Fila<Persona>());
  const [personas, setPersonas] = useState<Persona[]>([]);

  const agregarPersona = (persona: Persona) => {
    cola.enqueue(persona);

    const ordenadas = [...cola.getItems()].sort(
      (a, b) => a.fecha - b.fecha
    );

    setPersonas(ordenadas);
  };

  const atenderPersona = () => {
    cola.dequeue();

    setPersonas([...cola.getItems()]);
  };

  return (
    <div className="container">
      <h1>ATM - Cola de Personas</h1>

      <FormularioPersona onAgregar={agregarPersona} />

      <button onClick={atenderPersona}>
        Atender siguiente
      </button>

      <ListaPersonas personas={personas} />
    </div>
  );
}

export default App;
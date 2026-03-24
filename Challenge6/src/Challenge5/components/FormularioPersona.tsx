import { useState } from "react";
import type { Persona } from "../models/Persona";

interface Props {
    onAgregar: (persona: Persona) => void;
}

function FormularioPersona({ onAgregar }: Props) {
    const [nombre, setNombre] = useState("");
    const [monto, setMonto] = useState(0);

    const manejarSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const nuevaPersona: Persona = {
            nombre,
            monto,
            fecha: Date.now(),
        };

        onAgregar(nuevaPersona);

        setNombre("");
        setMonto(0);
    };

    return (
        <form onSubmit={manejarSubmit}>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <input
                type="number"
                placeholder="Monto"
                value={monto}
                onChange={(e) => setMonto(Number(e.target.value))}
            />

            <button type="submit">Agregar</button>
        </form>
    );
}

export default FormularioPersona;
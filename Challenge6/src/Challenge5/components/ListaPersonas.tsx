import type { Persona } from "../models/Persona";

interface Props {
    personas: Persona[];
}

function ListaPersonas({ personas }: Props) {
    return (
        <div>
            <h2>Cola del ATM</h2>

            <ul>
                {personas.map((p, index) => (
                    <li key={index}>
                        {p.nombre} - ${p.monto} -{" "}
                        {new Date(p.fecha).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ListaPersonas;
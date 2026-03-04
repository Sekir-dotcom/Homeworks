interface Paciente {
    nombre: string;
}

interface Props {
    historial: Paciente[];
}

function HistorialList({ historial }: Props) {
    return (
    <>
        <h2>Historial de atención</h2>

        <ul>
        {historial.map((p, i) => (
            <li key={i}>{p.nombre}</li>
        ))}
        </ul>
    </>
    );
}

export default HistorialList;
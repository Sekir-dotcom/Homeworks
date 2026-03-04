interface Paciente {
    nombre: string;
}

interface Props {
    pacientes: Paciente[];
}

function PacientesList({ pacientes }: Props) {
    return (
    <>
        <h2>Pacientes en espera</h2>

        <ul>
        {pacientes.map((p, i) => (
            <li key={i}>{p.nombre}</li>
        ))}
        </ul>
    </>
    );
}

export default PacientesList;
interface Props {
    medico: string;
}

function MedicoGuardia({ medico }: Props) {
    return (
    <>
        <h2>Médico de Guardia</h2>
        <p>{medico}</p>
    </>
    );
}

export default MedicoGuardia;
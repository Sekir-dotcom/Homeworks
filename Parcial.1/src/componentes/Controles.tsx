interface Props {
    agregarPaciente: () => void;
    atenderPaciente: () => void;
}

function Controles({ agregarPaciente, atenderPaciente }: Props) {

    return (
    <>
        <button onClick={agregarPaciente}>
        Agregar Paciente
        </button>

        <button onClick={atenderPaciente}>
        Atender Paciente
        </button>
    </>
    );
}

export default Controles;
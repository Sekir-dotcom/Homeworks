interface Props {
    miembro: string | null;
    siguienteAdm: () => void;
    anteriorAdm: () => void;
}

export default function ControlesAdm({
    miembro,
    siguienteAdm,
    anteriorAdm
}: Props) {

    return (
    <div>
        <h2>Comité Administrativo</h2>

        <p>
        Miembro actual: {miembro ?? "Sin miembro"}
        </p>

        <button onClick={anteriorAdm}>
        Anterior
        </button>

        <button onClick={siguienteAdm}>
        Siguiente
        </button>
    </div>
    );
}
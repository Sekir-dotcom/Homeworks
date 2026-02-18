import {useState} from "react";

interface Props {
    inicial: number;
}

function Contador({inicial}: Props) {
    const [contador, setContador] = useState(inicial);

    return (
        <>
        <p>Contador: {contador}</p>
        <button onClick={() => setContador(contador + 1)}> sumar
        </button>
        <button onClick={() => setContador(contador - 1)}> restar
        </button>
        <button onClick={() => setContador(inicial)}> reiniciar
        </button>
        </>
    )
};
export default Contador;
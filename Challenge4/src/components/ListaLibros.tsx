import type { Libro } from "../models/Libro"

interface Props {
    libros: Libro[]
}

export default function ListaLibros({ libros }: Props) {

    return (
    <div>

        <h2>Pila de Libros</h2>

        {libros.length === 0 && <p>No hay libros</p>}

        <ul>

        {[...libros].reverse().map((libro, index) => (

            <li key={index}>
            <b>{libro.nombre}</b> | {libro.autor} | {libro.isbn} | {libro.editorial}
            </li>

        ))}

        </ul>

    </div>
    )
}
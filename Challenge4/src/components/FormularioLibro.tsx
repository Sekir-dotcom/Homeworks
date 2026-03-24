import { useState } from "react"
import type { Libro } from "../models/Libro"

interface Props {
    agregarLibro: (libro: Libro) => void
}

export default function FormularioLibro({ agregarLibro }: Props) {

    const [nombre, setNombre] = useState("")
    const [isbn, setIsbn] = useState("")
    const [autor, setAutor] = useState("")
    const [editorial, setEditorial] = useState("")

    const enviar = (e: React.FormEvent) => {
    e.preventDefault()

    const nuevoLibro: Libro = {
        nombre,
        isbn,
        autor,
        editorial
    }

    agregarLibro(nuevoLibro)

    setNombre("")
    setIsbn("")
    setAutor("")
    setEditorial("")
    }

    return (
    <form onSubmit={enviar}>

        <h2>Agregar Libro</h2>

        <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        />

        <input
        placeholder="ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        />

        <input
        placeholder="Autor"
        value={autor}
        onChange={(e) => setAutor(e.target.value)}
        />

        <input
        placeholder="Editorial"
        value={editorial}
        onChange={(e) => setEditorial(e.target.value)}
        />

        <button type="submit">Agregar Libro</button>

    </form>
    )
}
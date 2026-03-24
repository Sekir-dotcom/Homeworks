import { useState } from "react"
import Stack from "../structures/Stack"
import type { Libro } from "../models/Libro"
import FormularioLibro from "../components/FormularioLibro"
import ListaLibros from "../components/ListaLibros"

const stack = new Stack<Libro>()

stack.push({
    nombre: "El del Ctulhu",
    isbn: "9780132350884",
    autor: "H.P. Lovecraft",
    editorial: "Penguin"
})

stack.push({
    nombre: "Crimen y castigo",
    isbn: "9780201616224",
    autor: "Fiódor Dostoyevski",
    editorial: "Penguin"
})

export default function PaginaLibros() {

    const [libros, setLibros] = useState<Libro[]>(stack.getItems())

    const agregarLibro = (libro: Libro) => {
    stack.push(libro)
    setLibros(stack.getItems())
    }

    const quitarLibro = () => {
    stack.pop()
    setLibros(stack.getItems())
    }

    return (

    <div className="container">

        <h1>Stack de Libros</h1>

        <FormularioLibro agregarLibro={agregarLibro} />

        <button className="remove" onClick={quitarLibro}>
        Quitar Libro (POP)
        </button>

        <ListaLibros libros={libros} />

    </div>
    )
}
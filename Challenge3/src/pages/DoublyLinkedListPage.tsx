import { useState, useEffect } from "react";
import DoublyLinkedList from "../structures/DoublyLinkedList";

function DoublyLinkedListPage() {
    const [current, setCurrent] = useState<any>(null);

    useEffect(() => {
    const history = new DoublyLinkedList<string>();
    history.append("Nexusmods.com");
    history.append("Intagram");
    history.append("YouTube.com");

    setCurrent(history.getHead());
    }, []);

    const nextPage = () => {
    if (current?.next) {
        setCurrent(current.next);
    }
    };

    const prevPage = () => {
    if (current?.prev) {
        setCurrent(current.prev);
    }
    };

    return (
    <div className="container">
        <div className="card">
        <h2>🧭 Historial de navegación</h2>
        <h3>{current?.value || "No page selected"}</h3>

        <button
            className="button button-secondary"
            onClick={prevPage}
        >
            Anterior
        </button>

        <button
            className="button button-primary"
            onClick={nextPage}
        >
            Siguiente
        </button>
        </div>
    </div>
    );
}

export default DoublyLinkedListPage;
import { useState, useEffect } from "react";
import DoublyLinkedList from "../structures/DoublyLinkedList";

function DoublyLinkedListPage() {
    const [current, setCurrent] = useState<any>(null);

    useEffect(() => {
    const history = new DoublyLinkedList<string>();
    history.append("Google.com");
    history.append("Facebook.com");
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
    <>
        <h2>Doubly Linked List - Browser</h2>
        <h3>{current?.value}</h3>
        <button onClick={prevPage}>Back</button>
        <button onClick={nextPage}>Forward</button>
    </>
    );
}

export default DoublyLinkedListPage;
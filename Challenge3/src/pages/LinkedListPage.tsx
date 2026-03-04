import { useState, useEffect } from "react";
import LinkedList from "../structures/LinkedList";

function LinkedListPage() {
    const [current, setCurrent] = useState<any>(null);

    useEffect(() => {
    const songs = new LinkedList<string>();
    songs.append("🎵 Runaway ");
    songs.append("🎶 Big Iron");
    songs.append("🎼 Alpha & Omega");

    setCurrent(songs.getHead());
    }, []);

    const nextSong = () => {
    if (current?.next) {
        setCurrent(current.next);
    }
    };

    return (
    <div className="container">
        <div className="card">
        <h2>🎧 Playlist</h2>
        <h3>{current?.value || "No song selected"}</h3>
        <button className="button button-primary" onClick={nextSong}>
            Siguiente Canción
        </button>
        </div>
    </div>
    );
}

export default LinkedListPage;
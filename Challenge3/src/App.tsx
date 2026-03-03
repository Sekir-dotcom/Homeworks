import { useState, useEffect } from "react";
import DoublyLinkedList from "./structures/DoublyLinkedList";
import "./App.css";

function App() {
  const [current, setCurrent] = useState<any>(null);

  useEffect(() => {
    const songs = new DoublyLinkedList<string>();

    songs.append("Alpha & Omega");
    songs.append("Big Iron");
    songs.append("I Really Want To Stay At Your House");
    songs.append("Runaway");

    setCurrent(songs.getHead());
  }, []);

  const nextSong = () => {
    if (current?.next) {
      setCurrent(current.next);
    }
  };

  const prevSong = () => {
    if (current?.prev) {
      setCurrent(current.prev);
    }
  };

  return (
    <div className="container">
      <h1>PlayList de Samuel</h1>

      <div className="player">
        <h2>{current?.value}</h2>

        <div className="buttons">
          <button onClick={prevSong}>⬅ Previous</button>
          <button onClick={nextSong}>Next ➡</button>
        </div>
      </div>
    </div>
  );
}

export default App;
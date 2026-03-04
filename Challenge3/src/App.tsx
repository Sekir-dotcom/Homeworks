import { useState } from "react";
import LinkedListPage from "./pages/LinkedListPage";
import DoublyLinkedListPage from "./pages/DoublyLinkedListPage";

function App() {
  const [page, setPage] = useState("linked");

  return (
    <>
      <h1>Challenge 03</h1>

      <button onClick={() => setPage("linked")}>
        Playist
      </button>

      <button onClick={() => setPage("doubly")}>
        Historial
      </button>

      {page === "linked" && <LinkedListPage />}
      {page === "doubly" && <DoublyLinkedListPage />}
    </>
  );

  
}

export default App;
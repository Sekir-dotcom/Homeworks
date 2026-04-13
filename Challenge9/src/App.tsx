import Sidebar from "./components/Sidebar";
import menuTree from "./data/menuTree";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <aside
        style={{
          width: "300px",
          background: "#1e293b",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>Sidebar Menu</h2>
        <Sidebar node={menuTree} />
      </aside>

      <main style={{ padding: "20px" }}>
        <h1>Challenge 09</h1>
        <p>Aquí aparecería el contenido de cada componente.</p>
      </main>
    </div>
  );
}

export default App;
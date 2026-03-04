import { useEffect, useState } from "react";

import LinkedList from "./structures/LinkedList";
import DoublyLinkedList from "./structures/DobleLinkedList";
import CircularLinkedList from "./structures/LinkedListCircular";
import CircularDoublyLinkedList from "./structures/LinkedListCircularDoble";

import PacientesList from "./componentes/PacientesLista";
import HistorialList from "./componentes/HistorialLista";
import Controles from "./componentes/Controles";
import MedicoGuardia from "./componentes/MedicoGuardia";

interface Paciente {
  nombre: string;
}

function App() {

  // ==============================
  // ESTRUCTURAS DE DATOS
  // ==============================

  // lista simple → pacientes
  const [pacientesList] = useState(
    new LinkedList<Paciente>()
  );

  // lista doble → historial
  const [historialList] = useState(
    new DoublyLinkedList<Paciente>()
  );

  // lista circular → médicos
  const [medicosList] = useState(
    new CircularLinkedList<string>()
  );

  // lista circular doble → comité
  const [comiteList] = useState(
    new CircularDoublyLinkedList<string>()
  );

  // ==============================
  // ESTADOS VISUALES (React)
  // ==============================

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [historial, setHistorial] = useState<Paciente[]>([]);
  const [medicoActual, setMedicoActual] = useState<string | null>(null);
  const [comite, setComite] = useState<string[]>([]);

  // ==============================
  // CARGA INICIAL (useEffect)
  // ==============================

  useEffect(() => {

    // médicos (lista circular)
    medicosList.append("Dr. Juan");
    medicosList.append("Dra. Ana");
    medicosList.append("Dr. Carlos");
    medicosList.append("Dra. Laura");

    setMedicoActual(medicosList.getCurrent());

    // comité administrativo
    comiteList.append("Director");
    comiteList.append("Subdirector");
    comiteList.append("Coordinador");

    setComite(comiteList.toArray());

  }, []);

  // ==============================
  // ROTACIÓN AUTOMÁTICA MÉDICOS
  // ==============================

  useEffect(() => {

    const timer = setInterval(() => {
      const siguiente = medicosList.next();
      setMedicoActual(siguiente);
    }, 10000);

    return () => clearInterval(timer);

  }, []);

  // ==============================
  // ACCIONES
  // ==============================

  const agregarPaciente = () => {

    const nuevo: Paciente = {
      nombre: `Paciente ${pacientes.length + 1}`
    };

    pacientesList.append(nuevo);
    setPacientes(pacientesList.toArray());
  };

  const atenderPaciente = () => {

    const atendido = pacientesList.removeFirst();

    if (atendido) {
      historialList.append(atendido);

      setPacientes(pacientesList.toArray());
      setHistorial(historialList.toArray());
    }
  };

  // ==============================
  // UI
  // ==============================

  return (
    <>
      <h1>Parcial 1 - Sistema Clínica</h1>

      <MedicoGuardia medico={medicoActual ?? "Sin médico"} />

      <Controles
        agregarPaciente={agregarPaciente}
        atenderPaciente={atenderPaciente}
      />

      <PacientesList pacientes={pacientes} />

      <HistorialList historial={historial} />

      <h2>Comité Administrativo</h2>
      <ul>
        {comite.map((c, i) => (
          <li key={i}>{c}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
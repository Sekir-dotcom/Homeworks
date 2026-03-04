import { useEffect, useState, useRef } from "react";

import LinkedList from "./structures/LinkedList";
import DoublyLinkedList from "./structures/DobleLinkedList";
import CircularLinkedList from "./structures/LinkedListCircular";
import CircularDoublyLinkedList from "./structures/LinkedListCircularDoble";

import PacientesList from "./componentes/PacientesLista";
import HistorialList from "./componentes/HistorialLista";
import Controles from "./componentes/Controles";
import MedicoGuardia from "./componentes/MedicoGuardia";
import ControlesAdm from "./componentes/ControlesAdm";

interface Paciente {
  nombre: string;
}

function App() {

  const pacientesList = useRef(new LinkedList<Paciente>());
  const historialList = useRef(new DoublyLinkedList<Paciente>());
  const medicosList = useRef(new CircularLinkedList<string>());
  const comiteList = useRef(new CircularDoublyLinkedList<string>());

  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [historial, setHistorial] = useState<Paciente[]>([]);
  const [medicoActual, setMedicoActual] = useState<string | null>(null);
  const [miembroActual, setMiembroActual] = useState<string | null>(null);

  useEffect(() => {

    medicosList.current.append("Dr. Alan");
    medicosList.current.append("Dra. Zuray");
    medicosList.current.append("Dr. Alejo");
    medicosList.current.append("Dra. Acerco");

    setMedicoActual(
      medicosList.current.getCurrent()
    );

    comiteList.current.append("Director");
    comiteList.current.append("Subdirector");
    comiteList.current.append("Coordinador");

    setMiembroActual(
      comiteList.current.getCurrent()
    );

  }, []);

  useEffect(() => {

    const timer = setInterval(() => {
      const siguiente = medicosList.current.next();
      setMedicoActual(siguiente);
    }, 10000);

    return () => clearInterval(timer);

  }, []);

  const agregarPaciente = () => {

    const nuevo: Paciente = {
      nombre: `Paciente ${pacientes.length + 1}`
    };

    pacientesList.current.append(nuevo);
    setPacientes(pacientesList.current.toArray());
  };

  const atenderPaciente = () => {

    const atendido =
      pacientesList.current.removeFirst();

    if (atendido) {

      historialList.current.append(atendido);

      setPacientes(
        pacientesList.current.toArray()
      );

      setHistorial(
        historialList.current.toArray()
      );
    }
  };

  const siguienteAdm = () => {
    const sig = comiteList.current.next();
    setMiembroActual(sig);
  };

  const anteriorAdm = () => {
    const ant = comiteList.current.prev();
    setMiembroActual(ant);
  };

  return (
    <>
      <h1>Parcial 1 - Sistema Clínica</h1>

      <MedicoGuardia
        medico={medicoActual ?? "Sin médico"}
      />

      <Controles
        agregarPaciente={agregarPaciente}
        atenderPaciente={atenderPaciente}
      />

      <PacientesList pacientes={pacientes} />

      <HistorialList historial={historial} />

      <ControlesAdm
        miembro={miembroActual}
        siguienteAdm={siguienteAdm}
        anteriorAdm={anteriorAdm}
      />
    </>
  );
}

export default App;
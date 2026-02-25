import { useEffect, useState } from 'react'
import './App.css'
import ListaContactos from './ListaContactos';

interface Contacto {
  id: number;
  nombre: string;
  telefono: string;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [contactos, setContactos] = useState<Contacto[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setContactos([
        { id: 1, nombre: 'Juan', telefono: '123456789' },
        { id: 2, nombre: 'María', telefono: '987654321' },
        { id: 3, nombre: 'Pedro', telefono: '555555555' },
      ]);
      setLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const agregarContacto = () => {
    if (nombre.trim() === '' || telefono.trim() === '') return;

    const nuevoContacto: Contacto = {
      id: contactos.length + 1,
      nombre: nombre,
      telefono: telefono,
    };

    setContactos([...contactos, nuevoContacto]);
    setNombre('');
    setTelefono('');
  };

  const eliminarContacto = (id: number) => {
    const nuevosContactos = contactos.filter( c => c.id !== id);
    setContactos(nuevosContactos);
  };

  return (
    <div className="container">
      <h1>Agenda de Contactos</h1>

      {loading ? (
        <h1>Cargando contactos...</h1>
      ) : (
        <ListaContactos contactos={contactos} eliminarContacto={eliminarContacto} />
      )}
      </>
    );
  }




export default App
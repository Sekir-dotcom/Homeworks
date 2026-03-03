import { useEffect, useState } from "react";
import Loader from "./components/Loader";
import type { Contact } from "./types/Contact";
import ContactList from "./components/ContactList";
import ContactForm from "./components/ContactForm";

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [contacts, setContacts] = useState<Contact[]>([]);


  const [contactAdding, setContactAdding] = useState(false);

  const initialContacts: Contact[] = [
    { id: 1, name: "Samuel Ruiz", phone: "3165478083" },
    { id: 2, name: "Sharon Abela", phone: "3871292140" },
    { id: 3, name: "Miguel Solis", phone: "3819247013" },
    { id: 4, name: "Yenaro Gracia", phone: "3165478083" },
  ];

useEffect(() => {
  setTimeout(() => {
    setContacts(initialContacts);
    setLoading(false);
  }, 5000);
}, []);

const deleteContact = (id: number) => {
  setContacts((prev) => prev.filter(c => c.id !== id));
};

const addContact = (name: string, phone: string) => {

  const newContact: Contact = {
    id: Date.now(),
    name,
    phone
  };

  setContacts(prev => [...prev, newContact]);
};

if (loading) {
  return <Loader />;
}

  return (
    <>
    <h1>Challenge 2- App de Contactos</h1>

    <ContactForm onAdd={addContact} />
    
    <ContactList 
    contacts={contacts}
    onDelete={deleteContact}
    /></>
  );

  
}

export default App;


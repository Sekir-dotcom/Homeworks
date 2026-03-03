import type { Contact } from "../types/Contact";
import ContactItem from "./ContactItem";

interface Props {
    contacts: Contact[];
    onDelete: (id: number) => void;
}

function ContactList({ contacts, onDelete }: Props) {
    return (
    <>
        <h2>Lista de contactos</h2>

        <ul>
        {contacts.map((contact) => (
            <ContactItem key={contact.id} contact={contact} onDelete={onDelete} />
        ))}
        </ul>
    </>
    );
}

export default ContactList;
import type { Contact } from "../types/Contact";

interface Props {
    contact: Contact;
    onDelete: (id: number) => void;
}

function ContactItem({ contact, onDelete }: Props) {
    return (
    <li>
        {contact.name} - {contact.phone}

        <button onClick={() => onDelete(contact.id)}>
        Eliminar
        </button>
    </li>
    );
}

export default ContactItem;
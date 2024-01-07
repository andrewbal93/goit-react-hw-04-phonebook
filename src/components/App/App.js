import { useEffect, useState } from 'react';
import ContactForm from 'components/ContactForm/ContactForm';
import ContactList from 'components/ContactList/ContactList';
import Filter from 'components/Filter/Filter';
import { nanoid } from 'nanoid';

import './App.css';

export default function App() {
  const [state, setState] = useState(() => {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));

    return {
      contacts: savedContacts || [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
      name: '',
      number: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(state.contacts));
  }, [state.contacts]);

  const handleInputChange = e => {
    setState(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = e => {
    e.preventDefault();

    const { name, number } = state;

    if (!name.trim() || !number.trim()) {
      alert('Please enter a valid name and phone number.');
      return;
    }

    const isContactExist = state.contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isContactExist) {
      alert(`${name} is already in contacts.`);
      return;
    }

    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setState(prev => ({
      contacts: [...prev.contacts, newContact],
      name: '',
      number: '',
      filter: '',
    }));
  };
  const handleFilterChange = e => {
    setState(prev => ({ ...prev, filter: e.target.value.toLowerCase() }));
  };

  const handleDeleteContact = contactId => {
    setState(prev => ({
      contacts: prev.contacts.filter(contact => contact.id !== contactId),
      filter: '',
    }));
  };

  const filteredContacts = state.contacts.filter(contact =>
    contact.name.toLowerCase().includes(state.filter)
  );

  return (
    <div className="app-container">
      <h2>Phonebook</h2>
      <ContactForm
        name={state.name}
        number={state.number}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />

      <h2>Contacts</h2>
      <Filter value={state.filter} onChange={handleFilterChange} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}

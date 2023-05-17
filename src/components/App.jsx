import React, { useEffect, useState } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { nanoid } from 'nanoid';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
import { Layout } from './Layout/Layout';

const initialContacts = [
  { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
  { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
  { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
  { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
];

export const App = () => {
  // початкові контакти беремо із localStorage або із initialContacts,
  //  якщо localStorage пустий

  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? initialContacts
  );

  const [filter, setFilter] = useState('');

  // зберігаємо контакти в localStorage
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  // функція для зміни стану фільтра
  const handleInputChange = e => {
    setFilter(e.currentTarget.value); // змінюємо стан фільтра
  };

  // додає новий контакт
  const addContact = ({ name, number }) => {
    const hasName = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (hasName) {
      return alert(`${name} is already in contacts`);
    }

    setContacts(prevState => [...prevState, { id: nanoid(), name, number }]);
  };

  // фільтрує контакти в залежності від даних інпута
  const onFilter = () =>
    contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

  // функція для видалення контакту
  const deleteContact = id => {
    const filteredContacts = contacts.filter(contact => contact.id !== id);
    // записуємо в state масив контактів, id яких не співпадає з обраним для видалення
    setContacts(filteredContacts);
  };

  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilter={handleInputChange} />
      <ContactList contacts={onFilter()} deleteContact={deleteContact} />
    </Layout>
  );
};


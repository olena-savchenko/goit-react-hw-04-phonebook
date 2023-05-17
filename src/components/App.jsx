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
  // const [contacts, setContacts] = useState([]);
  console.log('База контактів: ', contacts);
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

    setContacts(prevState => [...prevState, { name, number }]);
  };

  // фільтрує контакти в залежності від даних інпута
  const onFilter = () => {
    console.log('Виклик onFilter');
    const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
    console.log('Відфільтрований масив: ', filteredContacts);
    return filteredContacts;
  };


  //   deleteContact = id => {
  //     this.setState(prevState => ({
  //       contacts: this.state.contacts.filter(contact => contact.id !== id),
  //     }));
  //   };

  return (
    <Layout>
      <h1>Phonebook</h1>
      <ContactForm addContact={addContact} />
      <h2>Contacts</h2>
      <Filter filter={filter} handleFilter={handleInputChange} />
      <ContactList contacts={onFilter()} />
      {/* <ContactList contacts={onFilter} deleteContact={deleteContact} /> */}
    </Layout>
  );
};
// export class App extends Component {
//   state = {
//     contacts: [],
//     filter: '',
//   };

//   componentDidMount() {

//       // беремо дані з localStorage
//     const savedContacts = localStorage.getItem('contacts');

//       //якщо в localStorage не пусто
//     if (savedContacts !== null) {

//       // state міняємо на дані з localStorage
//       this.setState({ contacts : JSON.parse(savedContacts)})
//     }
//     else {
//       // якщо localStorage пустий, state.contacts задаємо початкові значення initialContacts
//       this.setState({contacts: initialContacts})
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {

//         // якщо дані в state змінились
//     if (prevState.contacts !== this.state.contacts) {

//         // перезаписуємо localStorage
//       localStorage.setItem('contacts', JSON.stringify(this.state.contacts))
//     }
//   }

//   // міняє значення state після вводу даних в інпут
//   handleInputChange = e => {
//     const { name, value } = e.currentTarget;
//     this.setState({
//       [name]: value,
//     });
//   };

//   // додає новий контакт
//   addContact = ({ name, number }) => {
//     const hasName = this.state.contacts.find(
//       contact => contact.name.toLowerCase() === name.toLowerCase()
//     );

//     if (hasName) {
//       return alert(`${name} is already in contacts`);
//     }

//     this.setState(prevState => {
//       return {
//         contacts: [
//           ...prevState.contacts,
//           {
//             id: nanoid(),
//             name: name,
//             number: number,
//           },
//         ],
//       };
//     });
//   };

//   // фільтрує контакти в залежності від даних інпута
//   filter = () => {
//     const { contacts, filter } = this.state;

//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(filter.toLowerCase())
//     );
//   };

//   // видаляє контакт
//   deleteContact = id => {
//     this.setState(prevState => ({
//       contacts: this.state.contacts.filter(contact => contact.id !== id),
//     }));
//   };

//   render() {

//     return (
//       <Layout>
//         <h1>Phonebook</h1>
//         <ContactForm addContact={this.addContact} />
//         <h2>Contacts</h2>
//         <Filter
//           filter={this.state.filter}
//           handleFilter={this.handleInputChange}
//         />
//         <ContactList
//           contacts={this.filter()}
//           deleteContact={this.deleteContact}
//         />
//       </Layout>
//     );
//   }
// }

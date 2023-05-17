import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyledAddBtn,
  StyledForm,
  StyledLabel,
  StyledInput,
} from './ContactForm.styled';

export const ContactForm = ({ addContact }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleInputChange = e => {
    const { name, value } = e.currentTarget;

    name === 'name' ? setName(value) : setNumber(value);
  };

  const handleFormSubmit = e => {
    e.preventDefault();
    addContact({ name, number }); // функцыя додавання контакту
    setName(''); // очищення полів форми
    setNumber(''); // очищення полів форми
  };

  return (
    <StyledForm onSubmit={handleFormSubmit}>
      <StyledLabel htmlFor="name">Name</StyledLabel>

      <StyledInput
        type="text"
        name="name"
        value={name}
        id="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleInputChange}
      />

      <StyledLabel htmlFor="tel">Number</StyledLabel>
      <StyledInput
        type="tel"
        name="number"
        value={number}
        id="tel"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleInputChange}
      />
      <StyledAddBtn type="submit">Add contact</StyledAddBtn>
    </StyledForm>
  );
};

ContactForm.propTypes = {
  addContact: PropTypes.func.isRequired,
};

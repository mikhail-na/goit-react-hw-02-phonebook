import React from 'react';
import { nanoid } from 'nanoid';
import { Section } from './Section/Section';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  
  addContactToContacts = contact => {
    const { contacts } = this.state;
    const createContact = { id: nanoid(), ...contact };

    contacts.some(({ name }) => name === contact.name)
      ? alert(`${contact.name} is already in your contacts`)
      : this.setState(prevState => ({
          contacts: [...prevState.contacts, createContact],
          
      }));
    
  };

  handleChangeFilter = ({ target: { value } }) => {
    this.setState({ filter: value });
  };

  getFilteredContacts = () => {
    const { filter, contacts } = this.state;
    const normalized = filter.toLowerCase();

    return contacts.filter(({ name }) => name.toLowerCase().includes(normalized));
  };

   removeContact = id => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(contact => contact.id !== id),
      };
    });
  };

  render() {
    return (
      <>
        <Section title="Phonebook">
          <ContactForm addContact={this.addContactToContacts} />
        </Section>
        <Section title="Contacts">
          <Filter
            value={this.state.filter}
            handleChangeFilter={this.handleChangeFilter} />
          <ContactList
            contacts={this.getFilteredContacts()}
            removeContact={this.removeContact}
          />
        </Section>
      </>
    );
  }
};
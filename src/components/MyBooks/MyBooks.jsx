import { Component } from 'react';
import { nanoid } from 'nanoid';

import styles from './my-books.module.scss';
import ContactList from './ContactList/ContactList';
import ContactFilter from './ContactFilter/ContactFilter';
// import items from 'components/items';
import ContactForm from './ContactForm/ContactForm';

class MyBooks extends Component {
  state = {
    items: [],
    filter: '',
  };

  componentDidMount() {
    const items = JSON.parse(localStorage.getItem('my-contact'));
    if (items?.length) {
      //items && items.length
      this.setState({ items });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { items } = this.state;
    if (prevState.items.length !== items.length) {
      localStorage.setItem('my-contact', JSON.stringify(items));
    }
  }

  addContact = ({ name, number }) => {
    if (this.isDublicate(name, number)) {
      return alert(`${name} tel.${number} is already in contacts`);
    }
    this.setState(prevState => {
      const { items } = prevState;
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { items: [newContact, ...items], name: '', number: '' };
    });
  };

  removeContact = id => {
    this.setState(({ items }) => {
      const newContacts = items.filter(item => item.id !== id);
      return { items: newContacts };
    });
  };

  handleFilter = ({ target }) => {
    this.setState({ filter: target.value });
  };

  isDublicate(name, number) {
    const normalizedName = name.toLowerCase();
    const normalizedNumber = number.toLowerCase();
    const { items } = this.state;
    const contact = items.find(({ name, number }) => {
      return (
        name.toLowerCase() === normalizedName &&
        number.toLowerCase() === normalizedNumber
      );
    });
    return Boolean(contact);
  }

  getVisibleContacts() {
    const { filter, items } = this.state;
    if (!filter) {
      return items;
    }
    const normalizedFilter = filter.toLowerCase();
    const resalt = items.filter(({ name, number }) => {
      return (
        name.toLowerCase().includes(normalizedFilter) ||
        number.toLowerCase().includes(normalizedFilter)
      );
    });
    return resalt;
  }

  render() {
    const { addContact, handleFilter, removeContact } = this;
    const contacts = this.getVisibleContacts();

    return (
      <div>
        <h3>Phonebook</h3>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <h4>Add new contact</h4>
            <ContactForm onSubmit={addContact} />
          </div>
          <div className={styles.block}>
            <h4 className={styles.titleContacts}>Contacts:</h4>
            <h4 className={styles.allContacts}>
              All contacts: {contacts.length}
            </h4>
            <ContactFilter handleChange={handleFilter} />

            <ContactList removeContact={removeContact} items={contacts} />
          </div>
        </div>
      </div>
    );
  }
}

export default MyBooks;

import { Component } from 'react';
import { nanoid } from 'nanoid';
import styles from './my-books.module.scss';

class MyBooks extends Component {
  state = {
    items: [
      { id: nanoid(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: nanoid(), name: 'Hermione Kline', number: '443-89-12' },
      { id: nanoid(), name: 'Eden Clements', number: '645-17-79' },
      { id: nanoid(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    name: '',
    number: '',
    filter: '',
  };

  addContact = e => {
    e.preventDefault();
    const { name, number, items } = this.state;
    if (this.isDublicate(name, number)) {
      return alert(`${name} tel.${number} is already in contacts`);
    }
    this.setState(prevState => {
      const newContact = {
        id: nanoid(),
        name,
        number,
      };
      return { items: [newContact, ...items], name: '', number: '' };
    });
  };

  removeContact(id) {
    this.setState(({ items }) => {
      const newContact = items.filter(item => item.id !== id);
      return { items: newContact };
    });
  }

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

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  };

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
    const { addContact, handleChange } = this;
    const { name, number } = this.state;
    const items = this.getVisibleContacts();
    const contacts = items.map(({ id, name, number }) => (
      <li key={id}>
        {name} tel. {number}{' '}
        <button onClick={() => this.removeContact(id)}>Delete</button>
      </li>
    ));
    return (
      <div>
        <h3>Phonebook</h3>
        <div className={styles.wrapper}>
          <div className={styles.block}>
            <h4>Add new contact</h4>
            <form action="" onSubmit={addContact}>
              <div className={styles.formGroup}>
                <label>Name</label>
                <input
                  name="name"
                  value={name}
                  onChange={handleChange}
                  placeholder="Name"
                />
              </div>
              <div className={styles.formGroup}>
                <label>Tel.number</label>
                <input
                  name="number"
                  value={number}
                  onChange={handleChange}
                  placeholder="tel.number"
                />
              </div>
              <button type="submit">Add contact</button>
            </form>
          </div>
          <div className={styles.block}>
            <h4>Contacts:</h4>
            <h4>All Contacts:</h4>
            <div className={styles.formGroup}>
              <label>Find contact</label>
              <input name="filter" onChange={handleChange} placeholder="tel" />
            </div>
            <ol>{contacts}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default MyBooks;

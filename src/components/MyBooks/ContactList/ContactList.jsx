import styles from './contactList.module.scss';

const ContactList = ({ removeContact, items }) => {
  const contacts = items.map(({ id, name, number }) => (
    <li className={styles.item} key={id}>
      <p className={styles.contact}>
        {name} .....tel. {number}
      </p>
      <button className={styles.btn} onClick={() => removeContact(id)}>
        Delete
      </button>
    </li>
  ));
  return <ol className={styles.list}>{contacts}</ol>;
};

export default ContactList;

ContactList.defaultProps = {
  items: [],
};

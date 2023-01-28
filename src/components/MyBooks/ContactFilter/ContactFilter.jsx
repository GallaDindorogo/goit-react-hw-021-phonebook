import styles from './contactFilter.module.scss';

const ContactFilter = ({ handleChange }) => {
  return (
    <div className={styles.formGroup}>
      <h4>Find</h4>
      <input name="filter" onChange={handleChange} placeholder="tel" />
    </div>
  );
};

export default ContactFilter;

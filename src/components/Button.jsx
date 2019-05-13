import React from 'react';
import styles from './Button.module.scss';

function Button({ label, onClick }) {
  return (
    <button className={styles.container} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;
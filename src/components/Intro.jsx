import React from 'react';

import Button from './Button';
import { useStateValue } from '../state/StateProvider';

import logo from './logo.png';
import styles from './Intro.module.scss';

function Intro() {
  const [{ start }, dispatch] = useStateValue();

  const handleStart = () => {
    dispatch({
      type: 'START',
    });
  }

  if (start) return null;

  return (
    <div className={styles.container}>
      <img className={styles.logo} alt="Modern Mann Logo" src={logo} />
      <h1>Mannbassador Map</h1>
      <p>Mapping out the world of <a href="https://www.modernmann.co.uk/" target="_blank" rel="noopener noreferrer">The Modern Mann</a> Mannbassadors</p>
      <Button label="Explore" onClick={handleStart} />
    </div>
  );
}

export default Intro;
import React from 'react';
import { useStateValue } from '../state/StateProvider';

import styles from './Details.module.scss';

const Details = () => {
  const [state] = useStateValue();
  const { focusedMarker } = state;

  if (!focusedMarker) return null;
  const { destination, episode, mannbassador } = focusedMarker;

  return (
    <div className={styles.details}>
      <div className={styles.content}>
        <h2>{destination}</h2>
        <div className={styles.detailsContent}>
          <p>{`Mannbassador: ${mannbassador}`}</p>
          <p>{`Episode: ${episode}`}</p>
        </div>
      </div>
    </div>
  );
}

export default Details;

import React from 'react';
import { useStateValue } from '../state/StateProvider';

import styles from './Details.module.scss';

const Details = () => {
  const [state] = useStateValue();
  const { focusedMarker } = state;

  if (!focusedMarker) return null;
  const { destinationName, episode, episodeLink, mannbassador } = focusedMarker;

  return (
    <div className={styles.details}>
      <div className={styles.content}>
        <h2>{destinationName}</h2>
        <div className={styles.detailsContent}>
          <p>{`Mannbassador: ${mannbassador}`}</p>
          <p>
            {
              !!episodeLink
                ? <a href={episodeLink} target="_blank" rel="noopener noreferrer">{`Episode: ${episode}`}</a>
                : `Episode: ${episode}`
            }
          </p>
        </div>
      </div>
    </div>
  );
}

export default Details;

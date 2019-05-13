import React from 'react';
import ReactGlobe from 'react-globe';

import config from '../config';
import styles from './Globe.module.scss';

import { useStateValue } from '../state/StateProvider';

import data from '../data/mannbassadors.json';

const { cameraOptions, focusOptions, globeOptions } = config;

const markerOptions = {
  enableTooltip: true,
  getTooltipContent: marker => `City: ${marker.city}, Mannbassador: ${marker.mannbassador}`,
}

const Globe = () => {
  const [state, dispatch] = useStateValue();
  const { focusedMarker, start } = state;


  function onClickMarker(marker) {
    dispatch({
      type: 'FOCUS',
      payload: marker,
    });
  }

  function onDefocus() {
    dispatch({
      type: 'DEFOCUS'
    })
  }

  const markers = start ? data : [];
  const focus = focusedMarker !== undefined ? focusedMarker.coordinates : undefined;

  return (
    <div className={styles.globe}>
      <ReactGlobe
        cameraOptions={cameraOptions}
        focus={focus}
        focusOptions={focusOptions}
        globeOptions={globeOptions}
        markers={markers}
        markerOptions={markerOptions}
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
      />
    </div>
  );
}

export default Globe;
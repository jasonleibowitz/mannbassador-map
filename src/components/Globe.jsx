import React from 'react';
import ReactGlobe from 'react-globe';

import config from '../config';
import styles from './Globe.module.scss';

import { useStateValue } from '../state/StateProvider';

const {
  cameraOptions,
  focusOptions,
  globeOptions,
  markerOptions,
} = config;

const Globe = () => {
  const [{ markers, start }, dispatch] = useStateValue();

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

  const data = start ? markers : [];
  return (
    <div className={styles.globe}>
      <ReactGlobe
        cameraOptions={cameraOptions}
        focusOptions={focusOptions}
        globeOptions={globeOptions}
        markers={data}
        markerOptions={markerOptions}
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
      />
    </div>
  );
}

export default Globe;
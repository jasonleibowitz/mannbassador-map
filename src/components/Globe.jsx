import React from 'react';
import ReactGlobe from 'react-globe';

import config from '../config';
import styles from './Globe.module.scss';
import { useStateValue } from '../state/StateProvider';

import markerRenderer from '../markerRenderer';

const {
  cameraOptions,
  focusOptions,
  globeOptions,
  markerOptions,
} = config;

const Globe = () => {
  const [{ focusedMarker, markers, start }, dispatch] = useStateValue();

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
  const focus = focusedMarker ? focusedMarker.coordinates : undefined;
  const camOptions = {
    ...cameraOptions,
    ...focus ? {autoRotateSpeed: 0} : {autoRotateSpeed: 0.02}
  }
  return (
    <div className={styles.globe}>
      <ReactGlobe
        cameraOptions={camOptions}
        focusOptions={focusOptions}
        focus={focus}
        lookAt={[51.507351, -0.127758]}
        globeOptions={globeOptions}
        markers={data}
        markerOptions={{
          ...markerOptions,
          renderer: (marker) => markerRenderer(marker, focusedMarker),
        }}
        onClickMarker={onClickMarker}
        onDefocus={onDefocus}
      />
    </div>
  );
}

export default Globe;
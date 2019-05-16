// Update this file to customize trend data and globe UI

// @ts-ignore:  Used by a node script and requires the CommonJS syntax
module.exports = {
  data: {
    keyword: 'game of thrones',
  },
  cameraOptions: {
    enableZoom: false,
  },
  focusOptions: {
    distanceRadiusScale: 1.5,
    enableDefocus: true,
  },
  globeOptions: {
    cloudsSpeed: 0.2,
    cloudsOpacity: 0.2,
    glowCoefficient: 0.1,
    glowColor: '#fff9e6',
    glowPower: 3,
    glowRadiusScale: 0.2,
  },
  lightOptions: {
    ambientLightColor: '#babc95',
    ambientLightIntensity: 1,
    pointLightIntensity: 3,
    pointLightPositionRadiusScales: [-1, 1.5, -2.5],
  }
};

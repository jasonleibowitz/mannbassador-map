import { BackSide, Color, Face3, Mesh, ShaderMaterial } from 'three';

export function createGlowMaterial({ coefficient, color, power }) {
  const vertexShader = `
    varying vec3 vVertexWorldPosition;
    varying vec3 vVertexNormal;
    void main() {
      vVertexNormal	= normalize(normalMatrix * normal);
      vVertexWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position	= projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `;

  const fragmentShader = `
    uniform vec3 color;
    uniform float coefficient;
    uniform float power;
    varying vec3 vVertexNormal;
    varying vec3 vVertexWorldPosition;
    void main() {
      vec3 worldCameraToVertex = vVertexWorldPosition - cameraPosition;
      vec3 viewCameraToVertex	= (viewMatrix * vec4(worldCameraToVertex, 0.0)).xyz;
      viewCameraToVertex = normalize(viewCameraToVertex);
      float intensity	= pow(
        coefficient + dot(vVertexNormal, viewCameraToVertex),
        power
      );
      gl_FragColor = vec4(color, intensity);
    }
  `;

  return new ShaderMaterial({
    depthWrite: false,
    fragmentShader,
    transparent: true,
    uniforms: {
      coefficient: {
        type: 'f',
        value: coefficient,
      },
      power: {
        type: 'f',
        value: power,
      },
      color: {
        type: 'c',
        value: new Color(color),
      },
    },
    vertexShader,
  });
}

export function createGlowGeometry(geometry, length) {
  // gather vertexNormals from geometry.faces
  const glowGeometry = geometry.clone();
  const vertexNormals = new Array(glowGeometry.vertices.length);

  glowGeometry.faces.forEach(face => {
    if (face instanceof Face3) {
      vertexNormals[face.a] = face.vertexNormals[0];
      vertexNormals[face.b] = face.vertexNormals[1];
      vertexNormals[face.c] = face.vertexNormals[2];
    } else {
      console.assert('Face needs to be an instance of THREE.Face3.');
    }
  });

  // modify the vertices according to vertexNormal
  glowGeometry.vertices.forEach((vertex, i) => {
    const { x, y, z } = vertexNormals[i];
    vertex.x += x * length;
    vertex.y += y * length;
    vertex.z += z * length;
  });
  return glowGeometry;
}

export function createGlowMesh(geometry, length, glowOptions, isBackSide) {
  const glowGeometry = createGlowGeometry(geometry, length);
  const glowMaterial = createGlowMaterial(glowOptions);
  if (isBackSide) {
    glowMaterial.side = BackSide;
  }
  return new Mesh(glowGeometry, glowMaterial);
}
import {
  Mesh,
  SphereGeometry,
  Color,
  MeshBasicMaterial,
} from 'three';

const renderer = (marker, focusedMarker) => {
  const { value } = marker;
  const scaledSize = value / 3;

  const mesh = new Mesh();
  mesh.geometry = new SphereGeometry(scaledSize, 10, 10);
  mesh.material = new MeshBasicMaterial({  color: new Color('gold') });
  return mesh;
}

export default renderer;

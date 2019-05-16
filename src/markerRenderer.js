import {
  Mesh,
  MeshLambertMaterial,
  SphereGeometry,
  Color,
} from 'three';

const renderer = marker => {
  const { value } = marker;
  const scaledSize = value / 1;
  const geometry = new SphereGeometry(scaledSize, 10, 10);
  const material = new MeshLambertMaterial({  color: new Color('red') });

  return new Mesh(geometry, material);
};

export default renderer;

// const marker = () => {
//   let from = { size: 0 };
//   const to = { size };
//   const mesh = new Mesh();
//   tween(
//     from,
//     to,
//     animationDuration,
//     ['Linear', 'None'],
//     (): void => {
//       switch (type) {
//         case MarkerType.Bar:
//           mesh.geometry = new BoxGeometry(
//             unitRadius,
//             unitRadius,
//             from.size,
//           );
//           mesh.material = new MeshLambertMaterial({
//             color,
//           });
//           break;
//         case MarkerType.Dot:
//         default:
//           mesh.geometry = new SphereGeometry(
//             from.size,
//             MARKER_SEGMENTS,
//             MARKER_SEGMENTS,
//           );
//           mesh.material = new MeshBasicMaterial({ color });
//           if (enableGlow) {
//             // add glow
//             const glowMesh = createGlowMesh(
//               mesh.geometry.clone(),
//               from.size * glowRadiusScale,
//               {
//                 color,
//                 coefficient: glowCoefficient,
//                 power: glowPower,
//               },
//               false,
//             );
//             mesh.children = [];
//             mesh.add(glowMesh);
//           }
//       }
//     },
//   );
// }
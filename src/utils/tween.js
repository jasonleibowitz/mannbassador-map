import * as TWEEN from 'es6-tween';

export function tween(from, to, animationDuration, easingFunction, onUpdate, onEnd) {
  new TWEEN.Tween(from)
    .to(to, animationDuration)
    .easing(TWEEN.Easing[easingFunction[0]][easingFunction[1]])
    .on('update', onUpdate)
    .on('complete', onEnd)
    .start();
}
import Hammer from 'hammerjs';

export const configurarGestos = (elemento, callback) => {
  const hammer = new Hammer(elemento);
  hammer.on('swipeleft', () => callback('prev'));
  hammer.on('swiperight', () => callback('next'));
};
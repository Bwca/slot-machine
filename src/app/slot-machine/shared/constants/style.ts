import * as PIXI from 'pixi.js';

export const STYLE = new PIXI.TextStyle({
  fontFamily: 'Arial',
  fontSize: 36,
  fontStyle: 'normal',
  fontWeight: 'bold',
  fill: ['#ffffff', '#ff0000'],
  stroke: '#4a1850',
  strokeThickness: 5,
  dropShadow: true,
  dropShadowColor: '#ffff00',
  dropShadowBlur: 10,
  dropShadowAngle: Math.PI / 6,
  dropShadowDistance: 0,
  wordWrap: true,
  wordWrapWidth: 440,
  fontVariant: 'small-caps'
});

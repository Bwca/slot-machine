import * as PIXI from 'pixi.js';

export interface Reel {
  blur: any;
  container: PIXI.Container;
  position: number;
  previousPosition: number;
  symbols: PIXI.Sprite[];
}

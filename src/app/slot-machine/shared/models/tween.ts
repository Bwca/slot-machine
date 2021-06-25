import { Reel } from './reel';

export interface Tween {
  change: ((i: unknown) => void) | null;
  complete?: ((i: unknown) => void) | null;
  easing: (t: number) => number;
  object: Reel;
  property: keyof Reel;
  propertyBeginValue: number;
  start: number;
  target: number;
  time: number;
}

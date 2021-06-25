import { Reel } from './reel';

export interface Tween {
  object: Reel;
  property: keyof Reel;
  propertyBeginValue: number;
  target: number;
  easing: (t: any) => number;
  time: number;
  change: ((i: unknown) => void) | null;
  complete?: ((i: unknown) => void) | null;
  start: number;
}

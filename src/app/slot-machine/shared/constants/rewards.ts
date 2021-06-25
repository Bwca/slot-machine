import { WinsMap } from '../models';
import { WinTypes } from './win-types';

export const REWARDS: WinsMap = {
  [WinTypes.ThreeCherry]: {
    0: 2000,
    1: 1000,
    2: 4000,
  },
  [WinTypes.ThreeSevenSymbols]: 150,
  [WinTypes.CherryAndSeven]: 75,
  [WinTypes.Three3Bars]: 50,
  [WinTypes.Three2Bars]: 20,
  [WinTypes.ThreeBars]: 10,
  [WinTypes.BarsCombo]: 5,
};

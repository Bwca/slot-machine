import { WinTypes } from '../constants';

export interface WinsMap {
  [WinTypes.ThreeCherry]: {
    [key: number]: number;
  };
  [WinTypes.ThreeSevenSymbols]: number;
  [WinTypes.CherryAndSeven]: number;
  [WinTypes.Three3Bars]: number;
  [WinTypes.Three2Bars]: number;
  [WinTypes.ThreeBars]: number;
  [WinTypes.BarsCombo]: number;
}

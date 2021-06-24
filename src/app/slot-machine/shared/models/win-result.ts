import { WinTypes } from '../constants/win-types';

export type WinResult = null | WinningResult[];

interface WinningResult {
  amount: number;
  row: number;
  type: WinTypes;
}

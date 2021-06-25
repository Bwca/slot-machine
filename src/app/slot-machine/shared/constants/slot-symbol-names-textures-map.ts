import { SlotSymbolNames } from './slot-symbol-names';

export const SLOT_SYMBOL_NAMES_TEXTURES_MAP = new Map<SlotSymbolNames, string>([
  [SlotSymbolNames.Cherry, './assets/images/cherry.png'],
  [SlotSymbolNames.Seven, './assets/images/7.png'],
  [SlotSymbolNames.SingleBar, './assets/images/bar.png'],
  [SlotSymbolNames.ThreeBars, './assets/images/3xbar.png'],
  [SlotSymbolNames.TwoBars, './assets/images/2xbar.png'],
]);

export const SLOT_TEXTURE_SYMBOL_MAP = new Map<string, SlotSymbolNames>(
  Array.from(SLOT_SYMBOL_NAMES_TEXTURES_MAP.entries()).map((i) => i.reverse() as [string, SlotSymbolNames])
);

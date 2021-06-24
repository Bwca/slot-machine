export type FixerSettings = ReelSettings[];

interface ReelSettings {
  reelIndex: number;
  spriteIndex: number | null;
  row: number | null;
}

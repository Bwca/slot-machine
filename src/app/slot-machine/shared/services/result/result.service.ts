import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { SlotSymbolNames, SLOT_SYMBOL_NAMES_TEXTURES_MAP } from '../../constants';
import { Result } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class ResultService {
  private result$$: Subject<Result> = new Subject();
  private slotTextureSymbolMap = new Map<string, SlotSymbolNames>(
    Array.from(SLOT_SYMBOL_NAMES_TEXTURES_MAP.entries()).map((i) => i.reverse() as [string, SlotSymbolNames])
  );

  public result$ = this.result$$.asObservable();

  public set newResult(r: Result) {
    const result = r.map((i) => i.map((j) => this.slotTextureSymbolMap.get(j) ?? ''));
    this.result$$.next(result);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { ResultService } from '../result/result.service';
import { REWARDS, SlotSymbolNames, WinTypes } from '../shared/constants';
import { Result, WinResult, WinsMap } from '../shared/models';

@Injectable({
  providedIn: 'root'
})
export class PrizeService {
  private prize$$ = new BehaviorSubject<WinResult>(null);
  public prize$ = this.prize$$.asObservable();
  private winsMap: WinsMap = REWARDS;

  constructor(private results: ResultService) {
    this.results.result$.subscribe((i) => this.checkPrize(i));
  }

  private checkPrize(result: Result) {
    const bars: string[] = [
      SlotSymbolNames.SingleBar,
      SlotSymbolNames.TwoBars,
      SlotSymbolNames.ThreeBars
    ];
    const wins: WinResult = [];

    result.forEach((r, row) => {
      switch (true) {
        case r.every((i) => i === SlotSymbolNames.Cherry): {
          wins.push({
            amount: this.winsMap[WinTypes.ThreeCherry][row],
            row,
            type: WinTypes.ThreeCherry
          });
          break;
        }

        case r.every((i) => i === SlotSymbolNames.Seven): {
          wins.push({
            amount: this.winsMap[WinTypes.ThreeSevenSymbols],
            row,
            type: WinTypes.ThreeSevenSymbols
          });
          break;
        }

        case r.every(
          (i) => i === SlotSymbolNames.Cherry || i === SlotSymbolNames.Seven
        ): {
          wins.push({
            amount: this.winsMap[WinTypes.CherryAndSeven],
            row,
            type: WinTypes.CherryAndSeven
          });

          break;
        }

        case r.every((i) => i === SlotSymbolNames.ThreeBars): {
          wins.push({
            amount: this.winsMap[WinTypes.Three3Bars],
            row,
            type: WinTypes.Three3Bars
          });
          break;
        }

        case r.every((i) => i === SlotSymbolNames.TwoBars): {
          wins.push({
            amount: this.winsMap[WinTypes.Three2Bars],
            row,
            type: WinTypes.Three2Bars
          });
          break;
        }

        case r.every((i) => i === SlotSymbolNames.SingleBar): {
          wins.push({
            amount: this.winsMap[WinTypes.ThreeBars],
            row,
            type: WinTypes.ThreeBars
          });
          break;
        }

        case r.every((i) => bars.includes(i)): {
          wins.push({
            amount: this.winsMap[WinTypes.BarsCombo],
            row,
            type: WinTypes.BarsCombo
          });
          break;
        }
      }
    });
    this.prize$$.next(wins.length ? wins : null);
  }
}

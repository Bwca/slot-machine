import { ChangeDetectorRef, Component, OnInit } from '@angular/core';

import { PrizeService } from '../../shared/services/prize/prize.service';
import {
  REWARDS,
  SlotSymbolNames,
  SLOT_SYMBOL_NAMES_TEXTURES_MAP,
  WinTypes
} from '../../shared/constants';
import { WinResult } from '../../shared/models';

@Component({
  selector: 'app-pay-table',
  templateUrl: './pay-table.component.html',
  styleUrls: ['./pay-table.component.scss']
})
export class PayTableComponent implements OnInit {
  public slotTextures = SLOT_SYMBOL_NAMES_TEXTURES_MAP;
  public slotSymbolNames = SlotSymbolNames;
  public rewards = REWARDS;
  public winTypes = WinTypes;
  public currentPrize: WinResult = null;

  constructor(private prize: PrizeService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.prize.prize$.subscribe((i) => {
      console.log(i);
      this.currentPrize = i;
      this.cdr.markForCheck();
    });
  }

  public arr(n: number) {
    return Array(n);
  }
}

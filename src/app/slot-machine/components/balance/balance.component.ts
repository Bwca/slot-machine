import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { filter, withLatestFrom } from 'rxjs/operators';

import { CashBalanceService } from '../../shared/services/cash-balance/cash-balance.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {
  public balance$ = this.cashBalance.totalCash$;
  public cashControl = new FormControl();

  constructor(private cashBalance: CashBalanceService) {}

  ngOnInit(): void {
    this.cashControl.valueChanges
      .pipe(
        withLatestFrom(this.cashBalance.totalCash$),
        filter(
          ([newBalance, currentBalance]) =>
            newBalance !== currentBalance && Number.isInteger(newBalance)
        )
      )
      .subscribe(([v]) => (this.cashBalance.cash = v));

    this.cashBalance.totalCash$.subscribe((i) => this.cashControl.setValue(i));
  }
}

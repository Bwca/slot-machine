import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { CashBalanceService } from '../cash-balance/cash-balance.service';

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
    this.cashControl.valueChanges.subscribe((v) => (this.cashBalance.cash = v));
  }
}

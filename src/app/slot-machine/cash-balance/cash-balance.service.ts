import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CashBalanceService {
  private totalCash$$ = new BehaviorSubject<number>(1500);

  public totalCash$ = this.totalCash$$.asObservable();

  constructor() {}

  public set cash(c: number) {
    this.totalCash$$.next(c);
  }

  public decreaseCash(amount = 1) {
    this.totalCash$$.next(this.totalCash$$.value - amount);
  }
}

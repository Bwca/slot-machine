import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CashBalanceService {
  private totalCash$$ = new BehaviorSubject<number>(10);

  public totalCash$ = this.totalCash$$.asObservable();

  constructor() {}

  public get isBroke$(): Observable<boolean> {
    return this.totalCash$.pipe(map((v) => v <= 0));
  }

  public set cash(c: number) {
    this.totalCash$$.next(c);
  }

  public decreaseCash(amount = 1) {
    this.totalCash$$.next(this.totalCash$$.value - amount);
  }
}

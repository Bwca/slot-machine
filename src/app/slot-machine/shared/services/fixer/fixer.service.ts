import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

import { FixerSettings } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class FixerService {
  private fixerSettings$$ = new BehaviorSubject<FixerSettings | null>(null);

  public fixerSettings$ = this.fixerSettings$$.asObservable();

  constructor() {}

  public set settings(s: FixerSettings | null) {
    this.fixerSettings$$.next(s);
  }
}

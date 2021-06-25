import { Injectable } from '@angular/core';

import { Reel, Tween } from '../../models';

@Injectable({
  providedIn: 'root',
})
export class TweeningService {
  private tweening: Tween[] = [];

  public tweenTo(
    object: Reel,
    property: keyof Reel,
    target: number,
    time: number,
    easing: (t: any) => number,
    onchange: null,
    oncomplete?: (() => void) | null
  ) {
    const tween: Tween = {
      change: onchange,
      complete: oncomplete,
      easing,
      object,
      property,
      propertyBeginValue: object[property as keyof object],
      start: Date.now(),
      target,
      time,
    };

    this.tweening.push(tween);
    return tween;
  }

  public updateTweening() {
    const lerp = (a1: number, a2: number, t: number) => a1 * (1 - t) + a2 * t;
    const now = Date.now();
    const remove: any[] = [];
    for (let i = 0; i < this.tweening.length; i++) {
      const t = this.tweening[i];
      const phase = Math.min(1, (now - t.start) / t.time);

      t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
      if (t.change) {
        t.change(t);
      }
      if (phase === 1) {
        t.object[t.property] = t.target;
        if (t.complete) {
          t.complete(t);
        }
        remove.push(t);
      }
    }
    for (let i = 0; i < remove.length; i++) {
      this.tweening.splice(this.tweening.indexOf(remove[i]), 1);
    }
  }
}

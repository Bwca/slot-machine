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
  ): Tween {
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

  public updateTweening(): void {
    const lerp = (a1: number, a2: number, t: number) => a1 * (1 - t) + a2 * t;
    const now = Date.now();
    const remove: Tween[] = [];

    this.tweening.forEach((tween) => {
      const phase = Math.min(1, (now - tween.start) / tween.time);

      tween.object[tween.property] = lerp(tween.propertyBeginValue, tween.target, tween.easing(phase));
      if (tween.change) {
        tween.change(tween);
      }
      if (phase === 1) {
        tween.object[tween.property] = tween.target;
        if (tween.complete) {
          tween.complete(tween);
        }
        remove.push(tween);
      }
    });

    remove.forEach((r) => this.tweening.splice(this.tweening.indexOf(r), 1));
  }
}

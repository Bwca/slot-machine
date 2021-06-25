import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';

import * as PIXI from 'pixi.js';

import { CashBalanceService } from '../cash-balance/cash-balance.service';
import { ResultService } from '../result/result.service';
import {
  MAX_REELS,
  REEL_WIDTH,
  SLOT_SYMBOL_NAMES_TEXTURES_MAP,
  SPIN_DELAY_PER_REEL,
  SPIN_TIME,
  STYLE,
  SYMBOL_SIZE
} from '../../constants';
import { FixerSettings, Reel, Result } from '../../models';
import { TweeningService } from '../tweening/tweening.service';
import { FixerService } from '../fixer/fixer.service';
import { PrizeService } from '../prize/prize.service';

@Injectable({
  providedIn: 'root'
})
export class PlayGameService {
  private reels: Reel[] = [];
  private bottomButton = new PIXI.Graphics();
  private slotTextures = Array.from(SLOT_SYMBOL_NAMES_TEXTURES_MAP.values()).map((i) =>
    PIXI.Texture.from(i)
  );
  private isLocked$$ = new BehaviorSubject<boolean>(false);
  private isGameInProgress$$ = new BehaviorSubject(false);
  private fixedSettings: FixerSettings | null = null;
  private lines: PIXI.Graphics[] = [];
  private app: PIXI.Application = new PIXI.Application({ backgroundColor: 0x2f4f4f });

  constructor(
    private tweeningService: TweeningService,
    private resultService: ResultService,
    private prizeService: PrizeService,
    private cashBalance: CashBalanceService,
    private fixer: FixerService
  ) {
    this.lockGameBasedOnPlayerCashBalance();
    this.subscribeToFixedChangesUpdates();
  }

  public initGame(el: HTMLElement): void {
    el.appendChild(this.app.view);
    Array.from(SLOT_SYMBOL_NAMES_TEXTURES_MAP.entries()).forEach(([name, url]) => {
      this.app.loader.add(name, url);
    });

    this.app.loader.load(() => {
      this.app.ticker.add(this.loadAssets());
      this.app.ticker.add(() => this.tweeningService.updateTweening());
    });
  }

  private subscribeToFixedChangesUpdates(): void {
    combineLatest([this.isGameInProgress$$, this.fixer.fixerSettings$]).subscribe(
      ([isInProgress, settings]) => {
        if (!isInProgress) {
          this.fixedSettings = settings;
        }
      }
    );
  }

  private lockGameBasedOnPlayerCashBalance(): void {
    this.cashBalance.isBroke$
      .pipe(withLatestFrom(this.isLocked$$))
      .subscribe(([isBroke, isLocked]) => {
        if (isLocked && !isBroke) {
          this.isLocked$$.next(false);
        } else if (isBroke) {
          this.isLocked$$.next(true);
        }
      });

    this.isLocked$$.subscribe((i) => {
      if (!i) {
        (this.bottomButton as any).addListener('pointerdown', this.startPlay);
      } else {
        (this.bottomButton as any).removeListener('pointerdown', this.startPlay);
      }
    });
  }

  private loadAssets(): () => void {
    const reelContainer = new PIXI.Container();

    this.drawPrizeLines();

    for (let i = 0; i < MAX_REELS; i++) {
      const rc = new PIXI.Container();
      rc.x = i * REEL_WIDTH;
      this.drawContainerMarkerLine(i);
      reelContainer.addChild(rc);

      const reel: Reel = {
        container: rc,
        symbols: [],
        position: 0,
        previousPosition: 0,
        blur: new PIXI.filters.BlurFilter()
      };

      reel.blur.blurX = 0;
      reel.blur.blurY = 0;
      rc.filters = [reel.blur];
      this.getReelSprites(reel, rc);
      this.reels.push(reel);
    }
    this.app.stage.addChild(reelContainer);

    const margin = (this.app.screen.height - SYMBOL_SIZE * 3) / 2;
    reelContainer.y = margin;
    reelContainer.x = Math.round(this.app.screen.width - REEL_WIDTH * 3);
    const top = new PIXI.Graphics();
    top.beginFill(0, 1);
    top.drawRect(0, 0, this.app.screen.width, margin);
    this.app.stage.addChild(top);
    this.bottomButton.beginFill(0, 1);
    this.bottomButton.drawRect(
      0,
      SYMBOL_SIZE * 3 + margin,
      this.app.screen.width,
      margin
    );

    const playText = new PIXI.Text('SPIN 2 WIN!', STYLE);
    playText.x = Math.round((this.bottomButton.width - playText.width) / 2);
    playText.y = this.app.screen.height - margin + Math.round(margin - playText.height);
    this.bottomButton.addChild(playText);

    this.app.stage.addChild(this.bottomButton);

    this.bottomButton.interactive = true;
    this.bottomButton.buttonMode = true;

    return () => this.updateReelsOnSpin();
  }

  private drawContainerMarkerLine(i: number): void {
    const lineSize = (this.app.screen.width - REEL_WIDTH * 3) / 4;
    const step = REEL_WIDTH + lineSize;

    let currentX = 0;

    for (let x = 0; x < 4; x++) {
      const graphics = new PIXI.Graphics();
      graphics.lineStyle(1, 0xdaa520, 0.5);
      graphics.position.set(currentX, SYMBOL_SIZE * (i + 1) - 10);
      graphics.lineTo(lineSize, 0);
      graphics.endFill();
      this.app.stage.addChild(graphics);

      currentX += step;
    }
  }

  private drawPrizeLines(): void {
    this.isGameInProgress$$.pipe(filter(Boolean)).subscribe(() => {
      this.lines.forEach((l) => {
        this.app.stage.removeChild(l);
      });
      this.lines = [];
    });

    this.prizeService.prize$.subscribe((win) => {
      win?.forEach((w) => {
        const graphics = new PIXI.Graphics();
        const rectOffset = 40;

        graphics.lineStyle(2, 0xdaa520, 1);
        graphics.beginFill(0xdaa520, 0.15);
        graphics.drawRoundedRect(
          rectOffset,
          SYMBOL_SIZE * (w.row + 1) - SYMBOL_SIZE / 2,
          this.app.screen.width - rectOffset * 2,
          SYMBOL_SIZE - 20,
          16
        );
        graphics.endFill();

        this.app.stage.addChild(graphics);
        this.lines.push(graphics);
      });
    });
  }

  private getReelSprites(reel: Reel, container: PIXI.Container): void {
    this.slotTextures.forEach((_, i) => {
      const symbol = new PIXI.Sprite(this.slotTextures[this.getRandomTextureIndex]);

      symbol.y = i * SYMBOL_SIZE;
      symbol.scale.x = symbol.scale.y = Math.min(
        SYMBOL_SIZE / symbol.width,
        SYMBOL_SIZE / symbol.height
      );
      symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
      reel.symbols.push(symbol);
      container.addChild(symbol);
    });
  }

  private startPlay = () => {
    if (this.isGameInProgress$$.value) {
      return;
    }

    const backout = (amount: number) => (t: number) =>
      --t * t * ((amount + 1) * t + amount) + 1;

    this.isGameInProgress$$.next(true);
    this.cashBalance.decreaseCash();

    this.reels.forEach((r, i) => {
      const target = r.position + 10 + i * 5;
      const time = SPIN_TIME + i * SPIN_DELAY_PER_REEL;

      this.tweeningService.tweenTo(
        r,
        'position',
        target,
        time,
        backout(0.5),
        null,
        i === this.reels.length - 1 ? () => this.handleCompleteGame() : null
      );
    });
  };

  private handleCompleteGame(): void {
    const result: Result = [[], [], []];
    this.isGameInProgress$$.next(false);
    /** Yep, that's a crutch :) */
    setTimeout(() => {
      this.reels.forEach(({ symbols }) => {
        symbols.forEach((s) => {
          const path = s._texture.textureCacheIds[0];
          const index = Math.floor(s.transform.position._y / SYMBOL_SIZE);
          if (index >= 0 && index <= 2) {
            result[index].push(path);
          }
        });
      });
      this.resultService.newResult = result;
    });
  }

  private updateReelsOnSpin(): void {
    this.reels.forEach((reel, reelIndex) => {
      reel.blur.blurY = (reel.position - reel.previousPosition) * 8;
      reel.previousPosition = reel.position;
      this.updateSpinningReelSprites(reel, reelIndex);
    });
  }

  private updateSpinningReelSprites(reel: Reel, reelIndex: number): void {
    reel.symbols.forEach((sprite, spriteIndex) => {
      const previousY = sprite.y;
      sprite.y =
        ((reel.position + spriteIndex) % reel.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;

      const setting = this.getFixedSpriteSetting(reelIndex, spriteIndex - 1);

      if (setting && setting.spriteIndex !== null) {
        this.setReelSpriteTexture(sprite, setting.spriteIndex);
        return;
      }

      if (sprite.y < 0 && previousY > SYMBOL_SIZE) {
        this.setReelSpriteTexture(sprite);
      }
    });
  }

  private setReelSpriteTexture(
    sprite: PIXI.Sprite,
    textureIndex: number = this.getRandomTextureIndex
  ) {
    const newSpriteTexture = this.slotTextures[textureIndex];
    sprite.texture = newSpriteTexture;
    sprite.scale.x = sprite.scale.y = Math.min(
      SYMBOL_SIZE / sprite.texture.width,
      SYMBOL_SIZE / sprite.texture.height
    );
    sprite.x = Math.round((SYMBOL_SIZE - sprite.width) / 2);
  }

  private getFixedSpriteSetting(reelIndex: number, spriteIndex: number) {
    return this.fixedSettings?.find(
      (i) => i.reelIndex === reelIndex && i.row === spriteIndex
    );
  }

  private get getRandomTextureIndex(): number {
    return Math.floor(Math.random() * this.slotTextures.length);
  }
}

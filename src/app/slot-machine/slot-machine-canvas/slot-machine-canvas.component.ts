import { Component, ElementRef, OnInit } from '@angular/core';

import * as PIXI from 'pixi.js';

import { PlayGameService } from '../play-game/play-game.service';
import { SLOT_SYMBOL_NAMES_TEXTURES_MAP } from '../shared/constants';
import { TweeningService } from '../tweening/tweening.service';

@Component({
  selector: 'app-slot-machine-canvas',
  template: '',
  styleUrls: ['./slot-machine-canvas.component.scss']
})
export class SlotMachineCanvasComponent implements OnInit {
  private pixiApp: PIXI.Application;

  constructor(
    private hostElement: ElementRef,
    private playGame: PlayGameService,
    private tweeningService: TweeningService
  ) {
    this.pixiApp = new PIXI.Application({ backgroundColor: 0x2f4f4f });
  }

  ngOnInit(): void {
    (this.hostElement.nativeElement as HTMLElement).appendChild(this.pixiApp.view);
    Array.from(SLOT_SYMBOL_NAMES_TEXTURES_MAP.entries()).forEach(([name, url]) => {
      this.pixiApp.loader.add(name, url);
    });

    this.pixiApp.loader.load(() => {
      this.pixiApp.ticker.add(this.playGame.loadAssets(this.pixiApp));
      this.pixiApp.ticker.add(() => this.tweeningService.updateTweening());
    });
  }
}

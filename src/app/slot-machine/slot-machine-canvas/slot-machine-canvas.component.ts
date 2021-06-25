import { Component, ElementRef, OnInit } from '@angular/core';

import { PlayGameService } from '../play-game/play-game.service';

@Component({
  selector: 'app-slot-machine-canvas',
  template: '',
  styleUrls: ['./slot-machine-canvas.component.scss']
})
export class SlotMachineCanvasComponent implements OnInit {
  constructor(private hostElement: ElementRef, private playGame: PlayGameService) {}

  ngOnInit(): void {
    this.playGame.initGame(this.hostElement.nativeElement as HTMLElement);
  }
}

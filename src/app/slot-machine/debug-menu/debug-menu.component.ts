import { Component, OnInit } from '@angular/core';
import { SLOT_SYMBOL_NAMES_TEXTURES_MAP } from '../shared/constants';

@Component({
  selector: 'app-debug-menu',
  templateUrl: './debug-menu.component.html',
  styleUrls: ['./debug-menu.component.scss']
})
export class DebugMenuComponent implements OnInit {
  public SLOT_SYMBOL_NAMES_TEXTURES_MAP = Array.from(
    SLOT_SYMBOL_NAMES_TEXTURES_MAP.values()
  );

  constructor() {}

  ngOnInit(): void {}
}

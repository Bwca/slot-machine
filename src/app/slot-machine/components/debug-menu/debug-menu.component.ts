import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup } from '@angular/forms';

import { FixerService } from '@slotMachine/shared/services/fixer/fixer.service';
import { GameMode, SLOT_SYMBOL_NAMES_TEXTURES_MAP } from '@slotMachine/shared/constants';
import { FixerSettings } from '@slotMachine/shared/models';

@Component({
  selector: 'app-debug-menu',
  templateUrl: './debug-menu.component.html',
  styleUrls: ['./debug-menu.component.scss'],
})
export class DebugMenuComponent implements OnInit {
  public namesTexturesMap = Array.from(SLOT_SYMBOL_NAMES_TEXTURES_MAP.values());
  public form!: FormGroup;
  public gameMode = GameMode;
  public areReelOptionsLocked = false;

  constructor(private fb: FormBuilder, private fixer: FixerService) {}

  ngOnInit(): void {
    this.initForm();
    this.subscribeToValueChanges();
  }

  public get reelFormArray(): AbstractControl[] {
    return (this.form.get('reels') as FormArray).controls;
  }

  private initForm(): void {
    this.form = this.fb.group({
      mode: this.gameMode.Fair,
      reels: this.fb.array(
        Array.from(Array(3).keys()).map((i) =>
          this.fb.group({
            reelIndex: i,
            spriteIndex: null,
            row: null,
          })
        )
      ),
    });

    this.form.get('reels')?.disable();
  }

  private subscribeToValueChanges(): void {
    this.form.get('mode')?.valueChanges.subscribe((i) => {
      if (i === this.gameMode.Fair) {
        this.form.get('reels')?.disable();
      } else {
        this.form.get('reels')?.enable();
      }
    });

    this.form.valueChanges.subscribe(({ mode, reels }: FormModel) => {
      this.fixer.settings = mode === this.gameMode.Fair ? null : reels;
    });
  }
}

interface FormModel {
  mode: GameMode;
  reels: FixerSettings;
}

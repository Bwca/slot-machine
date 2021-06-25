import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SlotMachineModule } from './slot-machine/slot-machine.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, SlotMachineModule],
  bootstrap: [AppComponent],
})
export class AppModule {}

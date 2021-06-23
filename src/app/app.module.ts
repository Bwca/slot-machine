import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SlotMachineModule } from './slot-machine/slot-machine.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, SlotMachineModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

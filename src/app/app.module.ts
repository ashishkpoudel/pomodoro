import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { SettingService } from './core/services/setting.service';
import { TimerService } from './core/services/timer.service';
import { SettingsDialogComponent } from './views/settings-dialog/settings-dialog.component';
import { TimerComponent } from './views/timer/timer.component';

@NgModule({
  declarations: [
    AppComponent,
    SettingsDialogComponent,
    TimerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,

    MaterialModule,
  ],
  providers: [
    SettingService,
    TimerService
  ],
  entryComponents: [
    SettingsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

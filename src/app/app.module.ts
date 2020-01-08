import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { TimerDirective } from './core/pipes/timer.directive';
import { MigrationService } from './core/services/migration.service';
import { SettingService } from './core/services/setting.service';
import { TimerService } from './core/services/timer.service';
import { SettingsDialogComponent } from './views/settings-dialog/settings-dialog.component';
import { TimerComponent } from './views/timer/timer.component';
import { DatabaseService } from './core/services/database.service';

export function databaseServiceFactory(provider: DatabaseService) {
  return () => provider.initialize();
}

@NgModule({
  declarations: [
    AppComponent,
    SettingsDialogComponent,
    TimerComponent,
    TimerDirective
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
    MigrationService,
    DatabaseService,
    SettingService,
    TimerService,
    { provide: APP_INITIALIZER, useFactory: databaseServiceFactory, deps: [DatabaseService], multi: true }
  ],
  entryComponents: [
    SettingsDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

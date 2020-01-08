import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { TimerType } from 'src/app/core/enums/timer-type';
import { TimerService } from 'src/app/core/services/timer.service';
import { SettingsDialogComponent } from './views/settings-dialog/settings-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'Pomodoro';

  timerType = TimerType;

  constructor(
    private matDialog: MatDialog,
    private timerService: TimerService,
  ) { }

  tabClick() {
    this.timerService.reset();
  }

  settingsClick() {
    const dialogRef = this.matDialog.open(SettingsDialogComponent, {
      width: '350px'
    });
  }
}

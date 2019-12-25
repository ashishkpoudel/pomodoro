import { Component, OnInit, Input } from '@angular/core';
import { browser } from 'webextension-polyfill-ts';
import * as moment from 'moment';

import { TimerType } from 'src/app/core/enums/timer-type';
import { TimerService } from 'src/app/core/services/timer.service';
import { SettingService } from 'src/app/core/services/setting.service';

@Component({
  selector: 'app-timer',
  template: `
    <div class="timer-wrapper">
      <div class="timer">
        {{ timer }}
      </div>
      <div class="d-flex justify-content-center p-4">
        <button (click)="togglePomodoro()" mat-raised-button>Start</button>
      </div>
    </div>
  `,
  styles: [`
    .timer-wrapper {
      padding: 5px;
    }

    .timer-wrapper .timer {
      margin-bottom: 65px;
      font-size: 4.5rem;
      text-align: center;
    }
  `]
})
export class TimerComponent implements OnInit {

  @Input()
  timerType: TimerType;

  timer = '00:00';

  constructor(
    private timerService: TimerService,
    private settingService: SettingService
  ) { }

  ngOnInit() {
    setInterval(() => {
      browser.alarms.get('timer').then(alarm => {
        if (alarm !== undefined && alarm.name === 'timer') {
          const diff = moment(alarm.scheduledTime).diff(moment());
          const duration = moment.duration(diff).asMilliseconds();
          this.timer = duration > 0 ? moment.utc(duration).format('mm:ss') : '00:00';
        }
      });
    });
  }

  togglePomodoro() {
    this.timerService.start(this.timerType);
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { browser } from 'webextension-polyfill-ts';
import * as moment from 'moment';

import { Timer } from 'src/app/core/models/timer';
import { TimerType } from 'src/app/core/enums/timer-type';
import { TimerService } from 'src/app/core/services/timer.service';

@Component({
  selector: 'app-timer',
  template: `
    <div class="timer-wrapper">
      <div class="timer">
        <span>{{ timerCount }}</span>
      </div>
      <div class="d-flex justify-content-center p-4">
        <button *ngIf="isPaused" (click)="startTimer()" mat-raised-button>Start</button>
        <button *ngIf="!isPaused" (click)="stopTimer()" mat-raised-button>Stop</button>
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

  timerCount = '00:00';

  isPaused = true;

  constructor(
    private timerService: TimerService
  ) { }

  ngOnInit() {
    setInterval(() => {
      try {
        const timer = Timer.fromObject(JSON.parse(localStorage.getItem('timer')));
        this.isPaused = timer.isPaused();
        console.log(timer);
        if (timer.isRunning()) {
          const diff = moment(timer.end).diff(moment());
          const duration = moment.duration(diff).asMilliseconds();
          this.timerCount = duration > 0 ? moment.utc(duration).format('mm:ss') : '00:00';
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  startTimer() {
    this.timerService.start(this.timerType);
  }

  stopTimer() {
    this.timerService.stop();
  }
}

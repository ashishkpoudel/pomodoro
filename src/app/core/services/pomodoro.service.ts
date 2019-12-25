import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as moment from 'moment';

import { SettingService } from './setting.service';
import { Timer } from '../models/timer';

@Injectable()
export class PomodoroService {

  currentPomodoro = new BehaviorSubject<Timer>({} as Timer);

  constructor(
    private settingService: SettingService
  ) {}

  start() {
    // const setting = this.settingService.getAll()
    //   .subscribe(data => {
    //     const pomodoroEnds = moment().add(data.pomodoro.pomodoro, 'minutes');
    //     const interval = setInterval(() => {
    //       const diff = pomodoroEnds.diff(moment());
    //       const duration = moment.duration(diff).asMilliseconds();
    //       this.currentPomodoro.next(Timer.fromDuration(duration));
    //       if (duration <= 0) {
    //         clearInterval(interval);
    //       }
    //     });
    //   });
  }
}

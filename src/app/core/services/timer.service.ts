import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { browser } from 'webextension-polyfill-ts';

import { SettingService } from './setting.service';
import { Timer } from '../models/timer';
import { TimerType } from '../enums/timer-type';

@Injectable()
export class TimerService {

  constructor(
    private settingService: SettingService
  ) {}

  getAll(): Observable<Timer> {
    return from(browser.storage.sync.get('timer')).pipe(
      map(result => {
        return result.timer;
      })
    );
  }

  get() {
    return Timer.fromObject(JSON.stringify(localStorage.getItem('timer')));
  }

  start(timerType: TimerType) {
    this.settingService.getAll().subscribe(data => {
      const timer = this.get();
      if (!timer.end) {
        timer.end = moment().add(data.pomodoro.pomodoro, 'minutes').valueOf();
      }
      timer.paused = null;
      localStorage.setItem('timer', JSON.stringify(timer));
    });
  }

  stop() {
    const timer = this.get();
    timer.end += moment().valueOf();
    timer.paused = moment().valueOf();
    localStorage.setItem('timer', timer.end.toString());


    //
    // const timer = new Timer();
    // timer.end = moment().valueOf();
    // timer.is_paused = false;
    // localStorage.setItem('timer', timer.end.toString());
  }

  reset() {
    localStorage.removeItem('timer');
  }
}

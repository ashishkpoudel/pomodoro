import { Injectable } from '@angular/core';
import { Observable, from, of, ReplaySubject } from 'rxjs';
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

  start() {
    this.settingService.getAll().subscribe(data => {
      const timer = new Timer();
      timer.end = moment().add(data.pomodoro.pomodoro, 'minutes').valueOf();
      localStorage.setItem('timer', JSON.stringify(timer));
    });
  }

  stop() {
    const timer = new Timer();
    timer.end = moment().valueOf();
    localStorage.setItem('timer', timer.end.toString());
  }

  reset() {
    localStorage.removeItem('timer');
  }
}


25
24
23
stop

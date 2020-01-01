import { Injector } from '@angular/core';
import { browser } from 'webextension-polyfill-ts';
import * as moment from 'moment';

import { SettingService } from 'src/app/core/services/setting.service';
import { Timer } from './app/core/models/timer';
import { Setting } from './app/core/models/setting';

const injector = Injector.create({
  providers: [{provide: SettingService, deps: []}]
});

const settingService: SettingService = injector.get(SettingService);

browser.browserAction.setBadgeBackgroundColor({color: '#004d40'});
browser.browserAction.setBadgeText({text: ''});

browser.runtime.onInstalled.addListener(() => {
  settingService.update(Setting.default()).subscribe();
});

browser.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'timer') {
    browser.browserAction.setBadgeText({text: ''});
    browser.notifications.create({
      type: 'basic',
      iconUrl: browser.extension.getURL('/assets/icon.png'),
      title: 'Pomodoro completed',
      message: 'Pomodoro completed message here'
    });
  }
});

setInterval(() => {
  try {
    const timer = Timer.fromObject(JSON.parse(localStorage.getItem('timer')));
    if (timer.isRunning()) {
      // const diff = moment(timer.end - timer.duration).diff(moment());
      // const duration = moment.duration(diff).asMilliseconds();
      timer.duration =  moment(timer.end - timer.duration).valueOf();
      localStorage.setItem('timer', JSON.stringify(timer));
      browser.browserAction.setBadgeText({text: timer.duration > 0 ? moment.utc(timer.duration).format('mm:ss') : '00:00'});
    }
  } catch (e) {
    // ignore
  }
});

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({url: 'index.html'});
});

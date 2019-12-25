import { Injector } from '@angular/core';
import { browser } from 'webextension-polyfill-ts';
import * as moment from 'moment';

import { SettingService } from 'src/app/core/services/setting.service';
import { Setting } from './app/core/models/setting';

const injector = Injector.create({
  providers: [{provide: SettingService, deps: []}]
});

const settingService: SettingService = injector.get(SettingService);

browser.browserAction.setBadgeBackgroundColor({color: '#004d40'});

browser.runtime.onInstalled.addListener(() => {
  settingService.update(Setting.default()).subscribe();
});


browser.alarms.onAlarm.addListener(alarm => {
  if (alarm.name === 'timer') {
    browser.browserAction.setBadgeText({text: ''});
    console.log('done');
    browser.notifications.create({
      type: 'basic',
      iconUrl: browser.extension.getURL('/assets/icon.png'),
      title: 'Pomodoro completed',
      message: 'Pomodoro completed message here'
    });
  }
});

setInterval(() => {
  browser.alarms.get('timer').then(alarm => {
    if (alarm !== undefined && alarm.name === 'timer') {
      const diff = moment(alarm.scheduledTime).diff(moment());
      const duration = moment.duration(diff).asMilliseconds();
      browser.browserAction.setBadgeText({text: duration > 0 ? moment.utc(duration).format('mm:ss') : '00:00'});
    }
  });
});

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({url: 'index.html'});
});

import { browser } from 'webextension-polyfill-ts';
import * as moment from 'moment';

import { Timer } from './app/core/models/timer';

browser.browserAction.setBadgeBackgroundColor({color: '#004d40'});
browser.browserAction.setBadgeText({text: ''});

browser.runtime.onInstalled.addListener(() => {
  // do nothing
});

setInterval(() => {
  try {
    const timer = Timer.fromObject(JSON.parse(localStorage.getItem('timer')));
    if (timer.isRunning()) {
      const diff = moment(timer.end).diff(moment());
      timer.duration = moment.duration(diff).asMilliseconds();
      localStorage.setItem('timer', JSON.stringify(timer));
      browser.browserAction.setBadgeText({text: timer.duration > 0 ? moment.utc(timer.duration).format('mm:ss') : '00:00'});

      if (timer.duration <= 0) {
        localStorage.removeItem('timer');
        browser.browserAction.setBadgeText({text: ''});
        browser.notifications.create({
          type: 'basic',
          iconUrl: browser.extension.getURL('/assets/icon.png'),
          title: 'Pomodoro completed',
          message: 'Pomodoro completed message here'
        });
      }

    }
  } catch (e) {
    // ignore
  }
});

browser.browserAction.onClicked.addListener(() => {
  browser.tabs.create({url: 'index.html'});
});

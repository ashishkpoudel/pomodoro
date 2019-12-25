import { Injectable } from '@angular/core';
import { browser } from 'webextension-polyfill-ts';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Setting } from 'src/app/core/models/setting';

@Injectable()
export class SettingService {

  getAll(): Observable<Setting> {
    return from(browser.storage.sync.get('setting')).pipe(
      map(result => {
        return result.setting;
      })
    );
  }

  update(setting: Setting): Observable<any> {
    return from(browser.storage.sync.set({setting}));
  }

}

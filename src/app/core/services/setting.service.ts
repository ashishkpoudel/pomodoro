import { Injectable } from '@angular/core';
import { Observable, fromEvent } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';

import { Setting } from 'src/app/core/models/setting';
import { DatabaseService } from './database.service';

@Injectable()
export class SettingService {

  constructor(
    private databaseService: DatabaseService
  ) { }

  getAll(id: number = 1): Observable<Setting> {
    return this.databaseService.connection.pipe(
      mergeMap(conn => {
        const settingStore = conn.transaction('settings', 'readwrite').objectStore('settings');
        return fromEvent(settingStore.get(1), 'success').pipe(
          map(event => {
            const settingRequest: any = event.target;
            return Setting.fromObject(settingRequest.result);
          })
        );
      })
    );
  }

  update(setting: Setting): Observable<Setting> {
    return this.databaseService.connection.pipe(
      mergeMap(conn => {
        const settingStore = conn.transaction('settings', 'readwrite').objectStore('settings');
        return fromEvent(settingStore.put(setting, 1), 'success').pipe(
          mergeMap(event => {
            const settingRequest: any = event.target;
            return this.getAll(settingRequest.result);
          })
        );
      })
    );
  }

}

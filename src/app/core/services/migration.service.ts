import { Injectable } from '@angular/core';

@Injectable()
export class MigrationService {

  upgrade(dbRequest: IDBOpenDBRequest) {
    if (dbRequest.result.version === 1) {
      if (!dbRequest.result.objectStoreNames.contains('settings')) {
        dbRequest.result.createObjectStore('settings', {autoIncrement: true});
      }
    }
  }

  success(dbRequest: IDBOpenDBRequest) {
    if (dbRequest.result.version === 1) {
      const settingsStore = dbRequest.result
        .transaction('settings', 'readwrite').objectStore('settings');

      settingsStore.get(1).onsuccess = (event) => {
        const settingRequest: any = event.target;
        if (settingRequest.result === undefined) {
          settingsStore.add({
            pomodoro: {
              pomodoro: 25,
              shortBreak: 5,
              longBreak: 15,
            },
            theme: 'indigo',
            sound: true,
            volume: 50
          });
        }
      };
    }
  }

}

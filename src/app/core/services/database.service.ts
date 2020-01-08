import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { MigrationService } from './migration.service';

@Injectable()
export class DatabaseService {

  private databaseName = 'pomodoro';

  private connectionSubject = new BehaviorSubject<IDBDatabase>({} as IDBDatabase);
  connection = this.connectionSubject.asObservable();

  constructor(private migrationService: MigrationService) {
    this.initialize();
  }

  initialize() {
    const dbRequest = indexedDB.open(this.databaseName, 1);
    dbRequest.onupgradeneeded = () => {
      this.migrationService.upgrade(dbRequest);
    };
    dbRequest.onsuccess = () => {
      this.migrationService.success(dbRequest);
      this.connectionSubject.next(dbRequest.result);
    };
  }

}

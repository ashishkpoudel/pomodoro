import * as moment from 'moment';

export class Timer {
  end: number;
  duration = 0;
  is_paused = false;
  paused?: number = null;
  type?: string;

  static fromObject(data: any): Timer {
    try {
      const timer = new Timer();
      timer.end = data.end;
      timer.duration = data.duration;
      timer.is_paused = data.is_paused;
      timer.paused = data.paused;
      timer.type = data.type;
      return timer;
    } catch (e) {
      throw Error('Invalid timer object');
    }
  }

  isRunning(): boolean {
    return !this.isPaused();
  }

  isPaused(): boolean {
    return this.paused !== null;
  }
}

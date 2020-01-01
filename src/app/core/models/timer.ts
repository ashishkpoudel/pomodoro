export class Timer {
  end: number;
  duration = 0;
  is_paused = false;
  type?: string;

  static fromObject(data: any): Timer {
    try {
      const timer = new Timer();
      timer.end = data.end;
      timer.duration = data.duration;
      timer.is_paused = data.is_paused;
      timer.type = data.type;
      return timer;
    } catch (e) {
      throw Error('Invalid timer object');
    }
  }

  isRunning(): boolean {
    return this.is_paused === false;
  }

  isPaused(): boolean {
    return this.is_paused === true;
  }

  markPaused(): void {
    this.is_paused = true;
  }

  markStart(): void {
    this.is_paused = false;
  }
}

export class Timer {
  end: number;
  type?: string;

  static fromObject(data: any): Timer {
    const timer = new Timer();
    timer.end = data.end;
    timer.type = data.type;
    return timer;
  }
}

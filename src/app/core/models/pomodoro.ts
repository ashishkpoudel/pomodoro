export class Pomodoro {
  pomodoro: number;
  shortBreak: number;
  longBreak: number;

  static fromObject(value: any) {
    const pomodoro = new Pomodoro();
    pomodoro.pomodoro = value.pomodoro;
    pomodoro.shortBreak = value.shortBreak;
    pomodoro.longBreak = value.longBreak;
    return pomodoro;
  }

  static default() {
    const pomodoro = new Pomodoro();
    pomodoro.pomodoro = 25;
    pomodoro.shortBreak = 5;
    pomodoro.longBreak = 15;
    return pomodoro;
  }
}

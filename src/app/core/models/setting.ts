import { Pomodoro } from './pomodoro';

export class Setting {
  pomodoro: Pomodoro;
  theme: string;
  sound: boolean;
  volume: number;

  static fromObject(value: any) {
    const setting = new Setting();
    setting.pomodoro = Pomodoro.fromObject(value.pomodoro);
    setting.theme = value.theme;
    setting.sound = value.sound;
    setting.volume = value.volume;
    return setting;
  }

  static default() {
    const setting = new Setting();
    setting.pomodoro = Pomodoro.default();
    setting.theme = 'indigo';
    setting.sound = true;
    setting.volume = 50;
    return setting;
  }

}

import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Setting } from 'src/app/core/models/setting';
import { SettingService } from 'src/app/core/services/setting.service';

@Component({
  selector: 'app-settings-dialog',
  template: `
    <h2 mat-dialog-title>Settings</h2>
    <div mat-dialog-content [formGroup]="settingForm">

      <div class="row mb-2" formGroupName="pomodoro">
        <div class="col-12">
          <p class="form-field-label">Custom Time</p>
        </div>
        <div class="col-4">
          <mat-form-field floatLabel="always" class="w-100">
            <input type="number" matInput placeholder="Pomodoro" formControlName="pomodoro" class="w-100">
          </mat-form-field>
        </div>
        <div class="col-4">
          <mat-form-field floatLabel="always" class="w-100">
            <input type="number" matInput placeholder="Short Break" formControlName="shortBreak" class="w-100">
          </mat-form-field>
        </div>
        <div class="col-4">
          <mat-form-field floatLabel="always" class="w-100">
            <input type="number" matInput placeholder="Long Break" formControlName="longBreak" class="w-100">
          </mat-form-field>
        </div>
      </div>

      <div class="row d-flex my-2">
        <div class="col-12">
          <span class="form-field-label">Theme</span>
        </div>
        <div class="col-12">
          <mat-form-field class="w-100">
            <mat-select formControlName="theme" class="w-100">
              <mat-option *ngFor="let theme of themeOptions" [value]="theme.value">{{ theme.name }}</mat-option>
            </mat-select>
          </mat-form-field>
        </div>
      </div>

      <div class="row d-flex mt-2 mb-4">
        <div class="col-12">
          <mat-checkbox formControlName="sound">Sound</mat-checkbox>
        </div>
      </div>

      <div class="row my-2">
        <div class="col-12">
          <span class="form-field-label">Volume</span>
        </div>
        <div class="col-12">
          <mat-slider min="1" max="100" formControlName="volume" class="w-100"></mat-slider>
        </div>
      </div>

    </div>
    <div mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Close</button>
      <button (click)="okClick()" mat-raised-button color="primary">Ok</button>
    </div>
  `,
  styles: [`
    .form-field-label {
      font-size: 14px;
    }
  `]
})
export class SettingsDialogComponent implements OnInit {

  setting: Setting;

  themeOptions = [
    {name: 'Soul', value: 'amber'},
    {name: 'Integrity', value: 'indigo'},
    {name: 'Friendship', value: 'pink'},
    {name: 'Wisdom', value: 'purple'}
  ];

  settingForm: FormGroup = this.formBuilder.group({
    pomodoro: this.formBuilder.group({
      pomodoro: [null, Validators.required],
      shortBreak: [null, Validators.required],
      longBreak: [null, Validators.required]
    }),
    theme: [null, Validators.required],
    sound: [null, Validators.required],
    volume: [null, Validators.required]
  });

  constructor(
    private settingsDialogRef: MatDialogRef<SettingsDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private settingService: SettingService
  ) {
    this.settingService.getAll()
      .subscribe(data => {
        this.settingForm.patchValue(
          data === undefined ? Setting.default() : data
        );
      });
  }

  ngOnInit() {
  }

  okClick() {
    const setting = Setting.fromObject(this.settingForm.value);
    this.settingService.update(setting)
      .subscribe(data => {
        this.settingsDialogRef.close();
        this.snackBar.open('Settings updates', 'Dismiss', {
          duration: 550
        });
      });
  }
}

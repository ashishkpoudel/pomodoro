import { Directive, ElementRef, OnInit } from '@angular/core';
import * as moment from 'moment';

@Directive({
  selector: '[appTimer]'
})
export class TimerDirective implements OnInit {

  constructor(
    private elemRef: ElementRef
  ) { }

  ngOnInit() {
    const durationInMilliseconds = Number(this.elemRef.nativeElement.innerHTML);
    return durationInMilliseconds > 0 ? moment.utc(durationInMilliseconds).format('mm:ss') : '00:00';
  }

}

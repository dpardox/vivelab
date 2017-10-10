import { Component, AfterViewInit, Input } from '@angular/core';
import * as Swiper from 'swiper/dist/js/swiper';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements AfterViewInit {
  @Input() photos: Array<Object>;
  @Input() index: Number;

  constructor() { }

  ngAfterViewInit () {
    // tslint:disable-next-line:no-unused-expression
    new Swiper('.swiper-container', {
      initialSlide: this.index,
      pagination: {
        el: '.swiper-pagination',
        type: 'fraction'
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  faDroplet,
  faWind,
  faChevronUp,
  faChevronDown,
  faEye,
  faArrowsDownToLine,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';
import { Weather, WeatherWeek } from 'src/app/models/weather';

@Component({
  selector: 'app-card-weather',
  templateUrl: './card-weather.component.html',
  styleUrls: ['./card-weather.component.scss'],
})
export class CardWeatherComponent {
  @Input() weather: Weather | any = {};
  @Input() weatherWeek: WeatherWeek[] = [];
  @Output() sendInput = new EventEmitter<string>();

  //icons
  faDroplet = faDroplet;
  faWind = faWind;
  faChevronUp = faChevronUp;
  faEye = faEye;
  faArrowsDownToLine = faArrowsDownToLine;
  faChevronDown = faChevronDown;
  faMagnifyingGlass = faMagnifyingGlass;

  input: string = '';
  farenheit: boolean = false;

  moon: string = 'drop-shadow(0px 0px 8px #7042DB)';
  cloud: string = 'drop-shadow(0px 0px 8px #CFCFCF)';
  sun: string = 'drop-shadow(0px 0px 8px #fbff01)';
  rain: string = 'drop-shadow(0px 0px 8px #0084ff)';

  icons: any = {
    '01d': {
      img: '/sun/26',
      light: this.sun,
    },
    '02d': {
      img: '/sun/27',
      light: this.sun,
    },
    '03d': {
      img: '/cloud/35',
      light: this.cloud,
    },
    '04d': {
      img: '/cloud/7',
      light: this.rain,
    },
    '09d': {
      img: '/cloud/17',
      light: this.sun,
    },
    '10d': {
      img: '/sun/16',
      light: this.sun,
    },
    '11d': {
      img: '/cloud/29',
      light: this.sun,
    },
    '13d': {
      img: '/cloud/23',
      light: this.cloud,
    },
    '50d': {
      img: '/sun/4',
      light: this.cloud,
    },
    /** MOON */
    '01n': {
      img: '/moon/10',
      light: this.moon,
    },
    '02n': {
      img: '/moon/15',
      light: this.moon,
    },
    '03n': {
      img: '/cloud/35',
      light: this.cloud,
    },
    '04n': {
      img: '/moon/19',
      light: this.moon,
    },
    '09n': {
      img: '/cloud/17',
      light: this.sun,
    },
    '10n': {
      img: '/moon/1',
      light: this.rain,
    },
    '11n': {
      img: '/cloud/29',
      light: this.sun,
    },
    '13n': {
      img: '/cloud/23',
      light: this.cloud,
    },
    '50n': {
      img: '/moon/2.2',
      light: this.moon,
    },
  };

  constructor() {}

  send() {
    this.sendInput.emit(this.input);
    this.input = '';
  }

  temperatureChange(): string {
    return this.farenheit ? '°F' : '°C';
  }

  temperatureForC(temp: number): string {
    if (this.farenheit) {
      return Math.round((temp * 9) / 5 + 32) + '°F';
    } else {
      return temp + '°C';
    }
  }
}

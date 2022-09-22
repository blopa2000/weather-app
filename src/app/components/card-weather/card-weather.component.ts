import { Component, OnInit } from '@angular/core';
import {
  faDroplet,
  faWind,
  faChevronUp,
  faChevronDown,
  faEye,
  faArrowsDownToLine,
  faMagnifyingGlass,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card-weather',
  templateUrl: './card-weather.component.html',
  styleUrls: ['./card-weather.component.scss'],
})
export class CardWeatherComponent implements OnInit {
  faDroplet = faDroplet;
  faWind = faWind;
  faChevronUp = faChevronUp;
  faEye = faEye;
  faArrowsDownToLine = faArrowsDownToLine;
  faChevronDown = faChevronDown;
  faMagnifyingGlass = faMagnifyingGlass;
  constructor() {}

  ngOnInit(): void {}
}

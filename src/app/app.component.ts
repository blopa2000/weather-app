import { Component, OnInit } from '@angular/core';
import { ApiService } from './services/api.service';
import {
  Weather,
  ResWeather,
  Coord,
  ResWeatherWeek,
  WeatherWeek,
} from './models/weather';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isSun: Boolean = false;
  weather: Weather = {
    clouds: 0,
    description: 'broken clouds',
    icon: '',
    wind: 0,
    temp: 0,
    humidity: 0,
    feelsLike: 0,
    pressure: 0,
    tempMax: 0,
    tempMin: 0,
    visibility: 0,
    name: '',
    country: 'co',
    sunrise: 0,
    sunset: 0,
    date: 0,
    isSun: false,
  };
  weatherWeek: WeatherWeek[] = [];

  constructor(private apiService: ApiService) {}

  async ngOnInit(): Promise<void> {
    this.getServiceWeather();
    if (navigator.geolocation) {
      this.apiService
        .locationPermissions()
        .then((location: Coord) => {
          this.getServiceWeatherWithLocation(location);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  getServiceWeather(input: string = 'medellin') {
    this.apiService.getWeather(input).subscribe((data: ResWeather) => {
      this.fillData(data);
    });

    this.apiService.getWeatherWeek(input).subscribe((data: ResWeatherWeek) => {
      this.weatherWeek = [];
      const days: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
      const check: number[] = [];
      for (let index = 6; index <= data.list.length; index += 6) {
        const day = new Date(data.list[index].dt * 1000);

        if (!check.includes(day.getDay())) {
          this.weatherWeek.push({
            title: days[day.getDay()],
            icon: data.list[index].weather[0].icon,
            tempMax: Math.round(data.list[index].main.temp_max),
            tempMin: Math.round(data.list[index].main.temp_min),
          });
          check.push(day.getDay());
        }
      }
    });
  }

  getServiceWeatherWithLocation(location: Coord) {
    this.apiService
      .getWeatherWithLocation(location)
      .subscribe((data: ResWeather) => {
        this.getServiceWeather(data.name);
      });
  }

  private fillData(data: ResWeather) {
    const validSun = new Date(data.dt * 1000).getHours();

    this.weather = {
      clouds: data.clouds?.all ?? 0,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      wind: Math.round(data.wind.speed),
      temp: Math.round(data.main.temp),
      humidity: data.main.humidity,
      feelsLike: Math.round(data.main.feels_like),
      pressure: data.main.pressure,
      tempMax: Math.round(data.main.temp_max),
      tempMin: Math.round(data.main.temp_min),
      visibility: data.visibility / 1000,
      name: data.name ?? '',
      country: String(data.sys.country).toLowerCase(),
      sunrise: data.sys.sunrise * 1000,
      sunset: data.sys.sunset * 1000,
      date: data.dt * 1000,
      isSun: validSun >= 5 && validSun <= 17 ? true : false,
    };

    this.chageWeather(this.weather.isSun);
  }

  private chageWeather(isSun: Boolean) {
    this.isSun = isSun;
    document.body.style.background = isSun ? '#B28920' : '#121C41';
  }
}

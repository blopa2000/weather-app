export interface Weather {
  clouds: number;
  description: string;
  icon: string;
  wind: number;
  temp: number;
  humidity: number;
  feelsLike: number;
  pressure: number;
  tempMax: number;
  tempMin: number;
  visibility: number;
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
  date: number;
  isSun: boolean;
}

export interface Coord {
  lon: number;
  lat: number;
}

interface WeatherDay {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Rain {
  '1h': number;
}

export interface Clouds {
  all: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface ResWeather {
  coord: Coord;
  weather: WeatherDay[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  rain: Rain;
  clouds?: Clouds;
  dt: number;
  sys: Sys;
  timezone?: number;
  id?: number;
  name?: string;
  cod?: number;
}

export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
  temp_kf: number;
}

export interface WeatherList {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Clouds {
  all: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Rain {
  '3h': number;
}

export interface Sys {
  pod: string;
}

export interface List {
  dt: number;
  main: Main;
  weather: WeatherList[];
  clouds: Clouds;
  wind: Wind;
  visibility: number;
  pop: number;
  rain: Rain;
  sys: Sys;
  dt_txt: string;
}

export interface Coord {
  lat: number;
  lon: number;
}

export interface City {
  id: number;
  name: string;
  coord: Coord;
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ResWeatherWeek {
  cod: string;
  message: number;
  cnt: number;
  list: List[];
  city: City;
}

export interface WeatherWeek {
  title: string;
  tempMax: number;
  tempMin: number;
  icon: string;
}

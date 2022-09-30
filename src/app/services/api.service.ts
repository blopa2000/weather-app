import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
  HttpStatusCode,
} from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { Coord, ResWeather, ResWeatherWeek } from '../models/weather';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getWeather(param: string) {
    const params = new HttpParams().set('q', param);
    return this.http
      .get<ResWeather>('https://api.openweathermap.org/data/2.5/weather', {
        params,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError(() => 'algo esta fallando en el servidor');
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError(() => 'no se encontro el producto');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(() => 'no tiene permisos para ver el producto');
          }
          return throwError(() => 'algo esta fallando en el servidor');
        })
      );
  }

  getWeatherWeek(param: string) {
    const params = new HttpParams().set('q', param);
    return this.http
      .get<ResWeatherWeek>('https://api.openweathermap.org/data/2.5/forecast', {
        params,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === HttpStatusCode.InternalServerError) {
            return throwError(() => 'algo esta fallando en el servidor');
          }
          if (error.status === HttpStatusCode.NotFound) {
            return throwError(() => 'no se encontro el producto');
          }
          if (error.status === HttpStatusCode.Unauthorized) {
            return throwError(() => 'no tiene permisos para ver el producto');
          }
          return throwError(() => 'algo esta fallando en el servidor');
        })
      );
  }

  getWeatherWithLocation(location: Coord) {
    const params = new HttpParams()
      .set('lat', location.lat)
      .set('lon', location.lon);
    return this.http.get<ResWeather>(
      'https://api.openweathermap.org/data/2.5/weather',
      {
        params,
      }
    );
  }

  locationPermissions(): Promise<Coord> {
    return new Promise((res, rej) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          res({ lat: coords.latitude, lon: coords.longitude });
        },
        (err) => {
          rej(err);
        }
      );
    });
  }
}

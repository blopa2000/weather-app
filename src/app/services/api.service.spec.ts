import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpStatusCode } from '@angular/common/http';
import { ApiService } from './api.service';
import { Coord, ResWeather, ResWeatherWeek } from '../models/weather';
import { WeatherData } from 'src/test/data';

describe('ApiService', () => {
  let service: ApiService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ApiService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('test for getWeather', () => {
    it('should return weather', (doneFn) => {
      const mockData: ResWeather = WeatherData;
      const id = 'medellin';

      service.getWeather(id).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      //http config
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${id}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    });

    it('should return error InternalServerError', (doneFn) => {
      const msgError = `${HttpStatusCode.InternalServerError} message`;
      const mockError = {
        status: HttpStatusCode.InternalServerError,
        statusText: msgError,
      };
      const id = 'medellin';

      service.getWeather(id).subscribe({
        error: (error) => {
          expect(error).toBe('algo esta fallando en el servidor');
          doneFn();
        },
      });

      //http config
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${id}`;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });

    it('should return error NotFound', (doneFn) => {
      const msgError = `${HttpStatusCode.NotFound} message`;
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError,
      };
      const id = 'medellin';

      service.getWeather(id).subscribe({
        error: (error) => {
          expect(error).toBe('no se encontro el producto');
          doneFn();
        },
      });

      //http config
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${id}`;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });

    it('should return error Unauthorized', (doneFn) => {
      const msgError = `${HttpStatusCode.Unauthorized} message`;
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: msgError,
      };
      const id = 'medellin';

      service.getWeather(id).subscribe({
        error: (error) => {
          expect(error).toBe('no tiene permisos para ver el producto');
          doneFn();
        },
      });

      //http config
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${id}`;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });

    it('should return error undefined', (doneFn) => {
      const msgError = `${HttpStatusCode.Conflict} message`;
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: msgError,
      };
      const id = 'medellin';

      service.getWeather(id).subscribe({
        error: (error) => {
          expect(error).toBe('algo esta fallando en el servidor');
          doneFn();
        },
      });

      //http config
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${id}`;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('test for getWeatherWeek', () => {
    it('should return weather', (doneFn) => {
      const mockData: ResWeatherWeek = {
        cod: '',
        message: 0,
        cnt: 0,
        list: [
          {
            dt: 0,
            main: {
              feels_like: 0,
              grnd_level: 0,
              humidity: 0,
              pressure: 0,
              sea_level: 0,
              temp: 0,
              temp_kf: 0,
              temp_max: 0,
              temp_min: 0,
            },
            weather: [{ id: 0, main: '', description: '', icon: '' }],
            clouds: {
              all: 0,
            },
            wind: {
              speed: 0,
              deg: 0,
              gust: 0,
            },
            visibility: 0,
            pop: 0,
            rain: {
              '1h': 0,
              '3h': 0,
            },
            sys: {
              country: '',
              id: 0,
              pod: '',
              sunrise: 0,
              sunset: 0,
              type: 0,
            },
            dt_txt: '',
          },
        ],
        city: {
          id: 0,
          name: '',
          coord: {
            lat: 0,
            lon: 0,
          },
          country: '',
          population: 0,
          timezone: 0,
          sunrise: 0,
          sunset: 0,
        },
      };
      const id = 'medellin';

      service.getWeatherWeek(id).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      //http config
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${id}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    });

    it('should return error InternalServerError', (doneFn) => {
      const msgError = `${HttpStatusCode.InternalServerError} message`;
      const mockError = {
        status: HttpStatusCode.InternalServerError,
        statusText: msgError,
      };
      const id = 'medellin';

      service.getWeatherWeek(id).subscribe({
        error: (error) => {
          expect(error).toBe('algo esta fallando en el servidor');
          doneFn();
        },
      });

      //http config
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${id}`;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });

    it('should return error NotFound', (doneFn) => {
      const msgError = `${HttpStatusCode.NotFound} message`;
      const mockError = {
        status: HttpStatusCode.NotFound,
        statusText: msgError,
      };
      const id = 'medellin';

      service.getWeatherWeek(id).subscribe({
        error: (error) => {
          expect(error).toBe('no se encontro el producto');
          doneFn();
        },
      });

      //http config
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${id}`;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });

    it('should return error Unauthorized', (doneFn) => {
      const msgError = `${HttpStatusCode.Unauthorized} message`;
      const mockError = {
        status: HttpStatusCode.Unauthorized,
        statusText: msgError,
      };
      const id = 'medellin';

      service.getWeatherWeek(id).subscribe({
        error: (error) => {
          expect(error).toBe('no tiene permisos para ver el producto');
          doneFn();
        },
      });

      //http config
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${id}`;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });

    it('should return error undefined', (doneFn) => {
      const msgError = `${HttpStatusCode.Conflict} message`;
      const mockError = {
        status: HttpStatusCode.Conflict,
        statusText: msgError,
      };
      const id = 'medellin';

      service.getWeatherWeek(id).subscribe({
        error: (error) => {
          expect(error).toBe('algo esta fallando en el servidor');
          doneFn();
        },
      });

      //http config
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${id}`;
      const req = httpController.expectOne(url);
      req.flush(msgError, mockError);
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('test for getWeatherWithLocation', () => {
    it('should return weather', (doneFn) => {
      const mockData: ResWeather = WeatherData;
      const lat = 123;
      const lon = 123;

      service.getWeatherWithLocation({ lat, lon }).subscribe((data) => {
        expect(data).toEqual(mockData);
        doneFn();
      });

      //http config
      const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}`;
      const req = httpController.expectOne(url);
      req.flush(mockData);
      expect(req.request.method).toEqual('GET');
    });
  });

  describe('test for locationPermissions', () => {
    it('should return the coords', (doneFn) => {
      const mockCoord: Coord = {
        lat: 0,
        lon: 0,
      };

      // spyOn(service, 'locationPermissions').and.returnValue(
      //   Promise.resolve(mockCoord)
      // );
      const serviceSpy = jasmine.createSpyObj('ApiService', [
        'locationPermissions',
      ]);

      serviceSpy.locationPermissions.and.returnValue(
        Promise.resolve(mockCoord)
      );

      serviceSpy.locationPermissions().then((data: Coord) => {
        expect(data).toEqual(mockCoord);
        doneFn();
      });
    });

    it('should return the error', (doneFn) => {
      const mockError = 'error no permitido';

      spyOn(service, 'locationPermissions').and.returnValue(
        Promise.reject(mockError)
      );

      service.locationPermissions().catch((data) => {
        expect(data).toEqual(mockError);
        doneFn();
      });
    });

    it('should return coordMap success', async () => {
      const mockData = {
        coords: {
          accuracy: 0,
          altitude: 0,
          altitudeAccuracy: 0,
          heading: 0,
          latitude: 1000,
          longitude: 2000,
          speed: 0,
        },
        timestamp: 0,
      };
      spyOn(navigator.geolocation, 'getCurrentPosition').and.callFake(
        (successFn) => {
          successFn(mockData);
        }
      );

      const res = await service.locationPermissions();
      expect(res).toEqual({
        lat: mockData.coords.latitude,
        lon: mockData.coords.longitude,
      });
    });

    it('should return coordMap error', (doneFn) => {
      const mError = new Error('some error');
      spyOn(navigator.geolocation, 'getCurrentPosition').and.throwError(mError);

      service.locationPermissions().catch((error) => {
        expect(error).toEqual(mError);
        doneFn();
      });
    });
  });
});

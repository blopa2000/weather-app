import { TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { Coord, ResWeather, ResWeatherWeek } from './models/weather';
import { CardWeatherComponent } from './components/card-weather/card-weather.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { WeatherData, WeatherWeekData } from 'src/test/data';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let apiService: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    let apiServiceSpy = jasmine.createSpyObj('ApiService', [
      'locationPermissions',
      'getWeatherWithLocation',
      'getWeather',
      'getWeatherWeek',
    ]);
    await TestBed.configureTestingModule({
      declarations: [AppComponent, CardWeatherComponent],
      imports: [HttpClientModule, FontAwesomeModule, FormsModule],
      providers: [{ provide: ApiService, useValue: apiServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);

    component = fixture.componentInstance;
    apiService = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.isSun).toBeFalse();
    expect(navigator.geolocation).toBeDefined();
  });

  describe('test apiService in appComponent', () => {
    it('should get the location', (doneFn) => {
      const mockLocation: Coord = {
        lat: 12,
        lon: 23,
      };
      apiService.locationPermissions.and.returnValue(
        Promise.resolve(mockLocation)
      );
      fixture.detectChanges();

      apiService.locationPermissions().then((data) => {
        expect(data).toEqual(mockLocation);

        doneFn();
      });
    });

    it('should get the error', (doneFn) => {
      const mockLocation = {
        code: 1,
        message: 'User denied Geolocation',
      };
      apiService.locationPermissions.and.returnValue(
        Promise.reject(mockLocation)
      );
      apiService.locationPermissions().catch((data) => {
        expect(data).toEqual(mockLocation);
        doneFn();
      });
    });
  });

  describe('test getServiceWeatherWithLocation', () => {
    it('should show the data', () => {
      const mockData: ResWeather = WeatherData;
      const mockLocation: Coord = {
        lat: 12,
        lon: 23,
      };

      apiService.getWeatherWithLocation.and.returnValue(of(mockData));
      apiService.getWeather.and.returnValue(of(mockData));
      apiService.getWeatherWeek.and.returnValue(of(WeatherWeekData));

      component.getServiceWeatherWithLocation(mockLocation);
      fixture.detectChanges();
      expect(apiService.getWeatherWithLocation).toHaveBeenCalledOnceWith(
        mockLocation
      );
      expect(apiService.getWeatherWithLocation).toHaveBeenCalled();
    });
  });

  describe('test getServiceWeather', () => {
    it('should exec the methods in api service when search a new cities', () => {
      const mockData: ResWeather = WeatherData;
      /**
       * real data is needed so that you can make the calculation of the day in
       * addition to being able to enter the for
       */
      const mockDataWeek: ResWeatherWeek = WeatherWeekData;
      const mockInput = 'medellin';
      apiService.getWeather.and.returnValue(of(mockData));
      apiService.getWeatherWeek.and.returnValue(of(mockDataWeek));

      component.getServiceWeather(mockInput);

      apiService.getWeather(mockInput).subscribe((data) => {
        expect(data).toEqual(mockData);
      });

      apiService.getWeatherWeek(mockInput).subscribe((data) => {
        expect(data).toEqual(mockDataWeek);
      });
    });
  });
});

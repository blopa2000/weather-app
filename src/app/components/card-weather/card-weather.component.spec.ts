import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CardWeatherComponent } from './card-weather.component';

describe('CardWeatherComponent', () => {
  let component: CardWeatherComponent;
  let fixture: ComponentFixture<CardWeatherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardWeatherComponent],
      imports: [FontAwesomeModule, FormsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardWeatherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    fixture.detectChanges();
  });

  describe('test for btn-change-f-c', () => {
    it('change of "c" == "f"', () => {
      const btnDe = fixture.debugElement.query(
        By.css('.card__infoWeather__btn')
      );
      const mockdata = 12;

      const res = component.temperatureForC(mockdata);
      expect(res).toBe('12°C');
      btnDe.triggerEventHandler('click', null);
      const res2 = component.temperatureForC(mockdata);
      expect(res2).toBe('54°F');
    });
  });

  describe('teat @output', () => {
    it('should send the value', () => {
      const mockmsg = (component.input = 'medellin');
      const btnSearch = fixture.debugElement.query(
        By.css('.card__search__btn')
      );

      let catchValue: string | undefined;
      component.sendInput.subscribe((data) => {
        catchValue = data;
      });

      btnSearch.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(catchValue).toEqual(mockmsg);
    });
  });
});

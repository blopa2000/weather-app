import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { CardWeatherComponent } from './components/card-weather/card-weather.component';
import { WeatherInterceptor } from './interceptors/weather.interceptor';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CardWeatherComponent],
  imports: [BrowserModule, FontAwesomeModule, HttpClientModule, FormsModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WeatherInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

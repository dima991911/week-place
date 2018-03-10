import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { WeatherService } from './services/weather.services';

import { AppComponent } from './app.component';
import { CityItemComponent } from './city-item/city-item.component';

@NgModule({
  declarations: [
    AppComponent,
    CityItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }

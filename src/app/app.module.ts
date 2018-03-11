import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { WeatherService } from './services/weather.services';
import { ModalService } from './services/modal.service';

import { AppComponent } from './app.component';
import { CityItemComponent } from './city-item/city-item.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';

@NgModule({
  declarations: [
    AppComponent,
    CityItemComponent,
    ModalWindowComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    WeatherService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

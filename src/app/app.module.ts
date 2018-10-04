import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WeatherService } from './services/weather.services';
import { ModalService } from './services/modal.service';

import { AppComponent } from './app.component';
import { CityItemComponent } from './city-item/city-item.component';
import { ModalWindowComponent } from './modal-window/modal-window.component';
import { SomeComponent } from './some/some.component';

@NgModule({
  declarations: [
    AppComponent,
    CityItemComponent,
    ModalWindowComponent,
    SomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [
    WeatherService,
    ModalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

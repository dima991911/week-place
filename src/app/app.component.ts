import { Component, OnInit } from '@angular/core';

import { WeatherService } from './services/weather.services';
import { ModalService } from './services/modal.service';

import { WeatherItem } from './shared/weather-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
      weather: WeatherItem[] = [];
      min_temp: number = +Infinity;
      max_temp: number = -Infinity;

      constructor( public weatherService: WeatherService, public modalService: ModalService ) {}

      ngOnInit() {
          let cities = this.weatherService.getCities();

          cities.forEach((city, i, arr) => {
              this.weatherService.getWeather(city.name)
                  .subscribe(data => {
                      let description = data['weather'][0].description.toUpperCase(),
                          temp = Math.round(data['main'].temp),
                          name = city.name,
                          status = city.status,
                          icon = data['weather'][0].icon;
                      if (temp > this.max_temp) this.max_temp = temp;
                      if (temp < this.min_temp) this.min_temp = temp;

                      let obj: WeatherItem = new WeatherItem(description, temp, name, status, icon);
                      this.weather.push(obj);
                      this.sortWeather();
                  });
          });
      }

    triggerModal() {
        this.modalService.openCloseModal();
    }

    closeModal(event) {
          if (event.target.className == 'background') {
              this.modalService.openCloseModal();
          }
    }

    addCity(city) {
          this.weatherService.getWeather(city)
              .subscribe(data => {
                  let description = data['weather'][0].description.toUpperCase(),
                      temp = Math.round(data['main'].temp),
                      name = city,
                      status = 'neutral',
                      icon = data['weather'][0].icon;

                  let obj: WeatherItem = new WeatherItem(description, temp, name, status, icon);
                  this.weather.push(obj);

                  if (temp > this.max_temp) {
                      this.max_temp = temp;
                  }
                  if (temp < this.min_temp) {
                      this.min_temp = temp;
                  }
              }, error => {
                  console.log(error);
              }, () => {
                  this.sortWeather();
              });
    }

      /*getWeather(cities) {
          cities.forEach(city => {
              this.weatherService.getWeather(city.name)
                  .subscribe(data => {
                      let description = data['weather'][0].description.toUpperCase(),
                          temp = Math.round(data['main'].temp),
                          name = city.name,
                          status = city.status,
                          icon = data['weather'][0].icon;

                      let obj: WeatherItem = new WeatherItem(description, temp, name, status, icon);
                      this.weather.push(obj);
                  });
          });
      }*/

      sortWeather() {
          this.weather.sort(function (a, b) {
             let c = a.temp;
             let d = b.temp;

             if(c > d) {
                 return 1;
             }
             if(c < d) {
                 return -1;
             }

             return 0;
          });
      }
}

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
                      name = city.charAt(0).toUpperCase() + city.substr(1).toLowerCase(),
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

    deleteCity(event, city) {
          let index = this.weather.findIndex(elem => {
              if (elem.name == city.name) {
                  return true;
              }
          });

          this.weather.splice(index, 1);
          this.checkTemp();
    }

    changeStatus(event, city) {
          if (event.target.className != 'delete') {
              let citiesStorage = JSON.parse(localStorage.getItem('cities'));

              for (let i = 0; i < citiesStorage.length; i++) {
                  if (citiesStorage[i].name == city.name) {
                      citiesStorage[i].status = city.status == 'neutral' ? 'visited' : 'neutral';
                      break;
                  }
              }
              localStorage.setItem('cities', JSON.stringify(citiesStorage));
              city.status = city.status == 'neutral' ? 'visited' : 'neutral';
          }
    }

    checkTemp(){
          this.min_temp = this.weather[0].temp;
          this.max_temp = this.weather[this.weather.length - 1].temp;
    }

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

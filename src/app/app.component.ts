import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { WeatherService } from './services/weather.services';

import { WeatherItem } from './shared/weather-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
      weather: any = [];

      constructor( private weatherService: WeatherService ) {}

      ngOnInit() {
          let cities = this.weatherService.getCities();

          console.log(cities);

          cities.forEach((city, i, arr) => {
              if (i == arr.length - 1) {
                  this.weatherService.getWeather(city.name)
                      .subscribe(data => {
                          let description = data['weather'][0].description.toUpperCase(),
                              temp = Math.round(data['main'].temp),
                              name = city.name,
                              status = city.status,
                              icon = data['weather'][0].icon;

                          let obj: WeatherItem = new WeatherItem(description, temp, name, status, icon);
                          this.weather.push(obj);
                      }, error => {
                          console.log(error)
                      }, () => {
                          this.sortWeather();
                      });
              } else {
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
              }
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

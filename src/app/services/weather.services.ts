import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { cities } from '../shared/cities';
import { WeatherItem } from '../shared/weather-item';

/*this.api + city.name + "&lang=UA&units=metric&APPID=9885d00a22b9c36f1436282f1e81c462"*/

@Injectable()
export class WeatherService {
    api = 'http://api.openweathermap.org/data/2.5/weather?q=';

    constructor( private http: HttpClient ) { }

    getCities() {
        if (!localStorage.getItem('cities')) {
            localStorage.setItem('cities', JSON.stringify(cities));
        }
        return JSON.parse(localStorage.getItem('cities'));
    }

    getWeather(city) {
        return this.http.get(this.api + city + "&lang=UA&units=metric&APPID=9885d00a22b9c36f1436282f1e81c462");
    }

    changeStatus(city) {
        let cities = JSON.parse(localStorage.getItem('cities'));
        for (let i = 0; i < cities.length; i++) {
            if(cities[i].name == city.name) {
                cities[i].status = city.status;
                break;
            }
        }
        localStorage.setItem('cities', JSON.stringify(cities));
    }

    getIcon(icon) {
        let src = `http://openweathermap.org/img/w/${icon}.png`;

        return src;
    }
}
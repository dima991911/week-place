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

    changeStatus(city: WeatherItem) {
        let cities = JSON.parse(localStorage.getItem('cities'));
        for (let i = 0; i < cities.length; i++) {
            if(cities[i].name == city.name) {
                cities[i].status = city.status;
                break;
            }
        }
        localStorage.setItem('cities', JSON.stringify(cities));
    }

    checkCity(city) {
        return this.http.get(this.api + city + "&lang=UA&units=metric&APPID=9885d00a22b9c36f1436282f1e81c462");
    }

    checkCityLocal(city) {
        city = city.charAt(0).toUpperCase() + city.substr(1).toLowerCase();

        let cities = JSON.parse(localStorage.getItem('cities'));
        let check = true;

        for (let i = 0; i < cities.length; i++) {
            if ( cities[i].name == city) {
                check = false;
                break;
            }
        }

        if(check) {
            return true;
        } else {
            return false;
        }
    }

    addCity(city) {
        city = city.charAt(0).toUpperCase() + city.substr(1).toLowerCase();
        let cities = JSON.parse(localStorage.getItem('cities'));

        let obj = {
            name: city,
            status: 'neutral'
        };

        cities.push(obj);
        localStorage.setItem('cities', JSON.stringify(cities));
        return true;
    }

    deleteCity(city) {
        let cities = JSON.parse(localStorage.getItem('cities'));

        for (let i = 0; i < cities.length; i++) {
            if (cities[i].name == city) {
                cities.splice(i, 1);
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
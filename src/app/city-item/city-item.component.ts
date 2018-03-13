import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WeatherService } from '../services/weather.services';

import { WeatherItem } from '../shared/weather-item';

@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.css']
})
export class CityItemComponent implements OnInit {
  @Input() city: WeatherItem;
  @Output() change: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();

  constructor(public weatherService: WeatherService) { }

  ngOnInit() {

  }

  deleteCity() {
    this.weatherService.deleteCity(this.city.name);

    this.delete.emit(this.city);
  }

  changeStatus(city) {
    city.status = city.status == 'neutral' ? 'good' : 'neutral';

    this.weatherService.changeStatus(city);
    this.change.emit(city);
  }

}

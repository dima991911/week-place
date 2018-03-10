import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from '../services/weather.services';

@Component({
  selector: 'app-city-item',
  templateUrl: './city-item.component.html',
  styleUrls: ['./city-item.component.css']
})
export class CityItemComponent implements OnInit {
  @Input() city: any;

  constructor(private weatherService: WeatherService) { }

  ngOnInit() {
    
  }

}

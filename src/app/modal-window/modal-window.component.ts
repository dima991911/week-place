import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ModalService } from '../services/modal.service';
import { WeatherService } from '../services/weather.services';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {
  disabled: boolean = true;
  errorMsg: string;
  cityName: string;
  messageTrue: boolean = false;
  @Output() add: EventEmitter<any> = new EventEmitter();

  constructor(public modalService: ModalService, public weatherService: WeatherService) { }

  ngOnInit() {
  }

  closeModal () {
    this.modalService.openCloseModal();
  }

  checkCity (city) {
    console.log()
    if(city.length > 0) {
      this.disabled = false;
    } else {
      this.disabled = true;
    }
  }

  completeAdd() {
    let that = this;
    this.messageTrue = true;

    setTimeout(() => {
      that.messageTrue = false;
    }, 2000)
  }

  addCity (city) {
    let validStorage = this.weatherService.checkCityLocal(city.value);

    console.log(validStorage);

    if(!validStorage) {
      this.errorMsg = 'Це місто вже у списку';
      city.value = "";
      return;
    }
    if(validStorage) {
      this.weatherService.checkCity(city.value)
          .subscribe(data => {
            this.weatherService.addCity(city.value);
            this.add.emit(city.value);
            this.errorMsg = "";
            city.value = "";
            this.completeAdd();
          }, error => {
            this.errorMsg = "Місто не знайденно";
            city.value = "";
          });
    }
  }

}

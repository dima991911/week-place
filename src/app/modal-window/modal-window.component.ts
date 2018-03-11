import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ModalService } from '../services/modal.service';
import { WeatherService } from '../services/weather.services';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {
  error: boolean = false;
  @Output() add: EventEmitter<any> = new EventEmitter();

  constructor(public modalService: ModalService, public weatherService: WeatherService) { }

  ngOnInit() {
  }

  closeModal () {
    this.modalService.openCloseModal();
  }

  checkCity (city) {
    this.weatherService.checkCity(city)
        .subscribe(data => {
          if (data['cod'] == 200) {
            this.error = false;
            console.log(data);
          }
        }, error => {
          this.error = true;
        });
  }

  addCity (city) {
    this.weatherService.addCity(city);
    this.add.emit(city);
  }

}

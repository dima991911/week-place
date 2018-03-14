import { Component, OnInit, OnDestroy, Output, EventEmitter, Renderer2 } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { ModalService } from '../services/modal.service';
import { WeatherService } from '../services/weather.services';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css'],
  animations: [
    trigger('triggerModal', [
      transition('void => *', [
        style({ marginTop: '-30px' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ marginTop: '-30px' }))
      ])
    ])
  ]
})
export class ModalWindowComponent implements OnInit, OnDestroy {
  disabled: boolean = true;
  errorMsg: string;
  messageTrue: boolean = false;
  @Output() add: EventEmitter<any> = new EventEmitter();

  constructor(public modalService: ModalService, public weatherService: WeatherService, public render: Renderer2) { }

  ngOnInit() {
    this.render.addClass(document.body, 'block-scroll');
  }

  ngOnDestroy() {
    this.render.removeClass(document.body, 'block-scroll');
  }

  closeModal () {
    this.modalService.openCloseModal();
  }

  closeModalBg(event) {
    if (event.target.classList[0] == 'modal') {
      this.modalService.closeModal();
      console.log('DIm');
    }
  }

  checkCity (city) {
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
    }, 2000);
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

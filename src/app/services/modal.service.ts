import { Injectable } from '@angular/core';

/*this.api + city.name + "&lang=UA&units=metric&APPID=9885d00a22b9c36f1436282f1e81c462"*/

@Injectable()
export class ModalService {
    private status: boolean = false;

    constructor() {}

    openCloseModal() {
        this.status = !this.status;
    }

    closeModal() {
        this.status = false;
    }

    getModal() {
        return this.status;
    }
}
import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  gaming: string = "";
  price: string = "";
  expireDate: string = "";
  c_p: string = "";
  fromTime: string = "";
  toTime: string = "";

  constructor(public navCtrl: NavController) {
    
  }

  save() {
    console.log("%s, %s, %s, %s, %s, %s", 
                this.gaming, 
                this.price, 
                this.expireDate, 
                this.c_p, 
                this.fromTime, 
                this.toTime)
  }

}

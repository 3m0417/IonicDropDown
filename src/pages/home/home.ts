import { Component } from '@angular/core';
import { ApiService } from '../../providers/api-service'
import { 
  NavController,
  LoadingController,
  ToastController,
 } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  underlying: string = "";
  price: number = null;
  expireDate: string = "";
  c_p: string = "C";
  fromTime: any = new Date().toISOString();
  toTime: any = new Date().toISOString();

  arrayUnderlying: Array<string>;
  arrayPrice: Array<number>;
  arrayExpireDate: Array<string>;
  arraySearchResult: Array<any>;

  constructor(
    public navCtrl: NavController,
    public apiProvider: ApiService,
    public loadingCtrl  : LoadingController,
    public toastCtrl    : ToastController,
) {
    this.loadUnderlyings();
  }

  save() {
    console.log("%s, %s, %s, %s, %s, %s", 
                this.underlying, 
                this.price, 
                this.expireDate, 
                this.c_p, 
                this.fromTime, 
                this.toTime)
  }

  changedUnderlying(ev: any) {
    this.loadPrices(ev);
  }

  loadUnderlyings() {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.apiProvider.getStockList().subscribe(res => {
        this.loadExpiryDates(loading);
        console.log(res);
        this.arrayUnderlying = res;
        this.underlying = res && res.length > 0 && res[0];
        this.underlying && this.loadPrices(this.underlying);
      }, error => {
        loading.dismiss();
      })
  }

  loadPrices(underlying: string) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.apiProvider.getPrice(underlying).subscribe(res => {
        this.arrayPrice = res.result;
        this.price = this.arrayPrice && this.arrayPrice.length > 0 && this.arrayPrice[0];
        loading.dismiss();
      }, error => {
        loading.dismiss();
      })

  }

  loadExpiryDates(loading: any) {
    this.apiProvider.getExpireDateList().subscribe(res => {
      loading.dismiss();
      console.log(res);
      this.arrayExpireDate = res.result;
      this.expireDate = this.arrayExpireDate && this.arrayExpireDate.length > 0 && this.arrayExpireDate[0];
    }, error => {
      loading.dismiss();
    })
  }

  searchOptions() {
    if (this.underlying && this.price && this.expireDate && this.fromTime && this.toTime) {
      let loading = this.loadingCtrl.create();
      loading.present();
      this.apiProvider.searchOptions(this.underlying, this.price, this.c_p, this.expireDate, this.fromTime, this.toTime)
      .subscribe(res => {
        this.arraySearchResult = res.result;
        loading.dismiss();
        this.toastCtrl.create({message: JSON.stringify(res), duration: 4500})
        .present();

      }, error => {
        loading.dismiss();
        this.toastCtrl.create({message: JSON.stringify(error), duration: 4500})
        .present();

      })
    } else {
      let errorMessage = "Please select all options."
      this.toastCtrl.create({message: errorMessage, duration: 4500})
        .present();
    }
  }

}

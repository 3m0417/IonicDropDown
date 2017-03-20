import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';

/*
  Generated class for the ApiService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiService {

  constructor(public http: Http) {
    console.log('Hello ApiService Provider');
  }

  getStockList(): Observable<any> {
    // don't have the data yet
    return Observable.create((observer)=> {
      this.http.get('http://fund.goldrushsystem.com/api/getstockoptionlist')
        .map(res => res.json())
        .subscribe(data => {
          observer.next(data);
        }, (error)=> observer.error(error));
    });
  }

  getPrice(stock: string) : Observable<any> {
    if (stock == null) {
      return null;
    }
    console.log(stock);
    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let params = JSON.stringify({ underlying: stock});
    return Observable.create((observer)=> {
      this.http.post('http://fund.goldrushsystem.com/api/getstrikepricelistbyunderlying', params, options)
              .map(res => res.json())
              .subscribe(data => {
                observer.next(data);
              }, (error)=> observer.error(error));
    });
  }

  getExpireDateList(): Observable<any> {

    return Observable.create((observer)=> {
      this.http.get('http://fund.goldrushsystem.com/api/getstockoptionexpirydatelist')
        .map(res => res.json())
        .subscribe(data => {
          observer.next(data);
        }, (error)=> observer.error(error));
    });
  }

  searchOptions(underlying: string,
                price: number,
                contract: string,
                expiryDate: string,
                fromDate: string,
                toDate: string,
                ) {

    let headers = new Headers({ 'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});
    let params = JSON.stringify({
      underlying : underlying,
      strike_price : price,
      contract : contract,
      expiry_date : expiryDate,
      from_date : fromDate,
      to_date : toDate,
    });
    return Observable.create((observer)=> {
      this.http.post('http://fund.goldrushsystem.com/api/searchoption', params, options)
              .map(res => res.json())
              .subscribe(data => {
                observer.next(data);
              }, (error)=> observer.error(error));
    });
  }

}

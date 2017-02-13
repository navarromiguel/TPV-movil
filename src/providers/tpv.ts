import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { SERVER_URL } from './config'

@Injectable()
export class TPV {

  orders=[];
  status = false;
  categories = [];
  products = [];
  currentOrder: any;
  floors = [];
  tables = [];

  constructor(public http: Http) {
    console.log('Hello TPV Provider');
  }

  loadCategories(){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
 
      this.http.get(SERVER_URL + '/product_categories/', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.categories = data;
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
 
  }

  loadFloors(){
 
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
 
      this.http.get(SERVER_URL + '/floors/', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.floors = data;
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  loadTables(){
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
 
      this.http.get(SERVER_URL + '/tables/', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.tables = data;
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }

  loadProducts(){
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
 
      this.http.get(SERVER_URL + '/products/', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          this.products = data;
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
 
  createOrder(order){
 /*
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Authorization', this.authService.token);
 
      this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/todos', JSON.stringify(todo), {headers: headers})
        .map(res => res.json())
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
 
    });
 */
  }
 
  deleteOrder(id){
 /*
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Authorization', this.authService.token);
 
        this.http.delete('https://YOUR_HEROKU_APP.herokuapp.com/api/todos/' + id, {headers: headers}).subscribe((res) => {
            resolve(res);
        }, (err) => {
            reject(err);
        });    
 
    });
    */
   }

  addProduct(product){
    console.log("adding...");
    console.log(this.currentOrder);

    let res = this.currentOrder.lines.filter((line) => {
      return line.product == product;
    });
    if(res.length>0){
      let line = res[0];
      let index = this.currentOrder.lines.indexOf(line);
      if(index > -1){
        this.currentOrder.lines[index].qty++;
      }
    } else{
      this.currentOrder.lines.push({product:product, qty:1});
    }
  }

  newOrder(table, floor) {
    let res = this.orders.filter((order) => {
      return order.table == table && order.floor == floor;
    });

    if(res.length == 0) {
      let order = {floor:floor, table:table, lines: []};
      this.orders.push(order);
      this.currentOrder = order;
    } else {
      this.currentOrder = res[0];
    }
    console.log("current:");
    console.log(this.currentOrder);
    console.log("orders:");
    console.log(this.orders);
  }
 

}

 


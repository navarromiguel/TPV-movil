import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { SERVER_URL } from './config'
import { LoadingController } from 'ionic-angular';

@Injectable()
export class TPV {

  orders=[];
  status = false;
  categories = [];
  products = [];
  filteredProducts = [];
  currentOrder: any;
  floors = [];
  tables = [];
  loading: any;

  constructor(public http: Http, public loadingCtrl: LoadingController) {
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

  loadNewOrders(){
    return new Promise((resolve, reject) => {
 
      let headers = new Headers();
 
      this.http.get(SERVER_URL + '/orders/news/', {headers: headers})
        .map(res => res.json())
        .subscribe(data => {
          resolve(data);
        }, (err) => {
          reject(err);
        });
    });
  }
 
  deleteOrder(order) {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    order.state = "removed";

    this.updateOrder(order).then((res) => {
        console.log("order updated");
        
      }, (err) => {
        console.log("error updating order");
      });
  }

  deleteOrderLine(line) {
    console.log("into deleting line...");
    console.log(line);

    let index = this.currentOrder.lines.indexOf(line);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.delete(SERVER_URL + '/orderlines/' + line.id + '/', options)
      .map(res => res.json())
      .subscribe(data => {
            console.log("Borrado orderline");
            resolve(data);
          //  this.loading.dismiss();
      }, (err) => {
            console.log("error");
            console.log(err);
            reject(err);
      });
    });
  }

  addProduct(product){
    console.log("adding...");
    console.log(this.currentOrder);

    let res = this.currentOrder.lines.filter((line) => {
      return line.product.id == product.id;
    });
   // this.showLoader();
    if(res.length>0){
      let line = res[0];
      let index = this.currentOrder.lines.indexOf(line);
      if(index > -1){
        this.setQty(line, 1);
      }
    } else{
      let line = {
        id: undefined,
        product:product, 
        qty:1,
        price_unit: product.sale_price,
        discount: 0,
        product_id: product.id,
        order_id: this.currentOrder.id
      };

      console.log(line);

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.post(SERVER_URL + '/orderlines/', line, options)
        .map(res => res.json())
        .subscribe(data => {
          console.log("insercion hecha");
          console.log(data);
          line.id = data.id;
          this.currentOrder.lines.push(line);
        //  this.loading.dismiss();
        }, (err) => {
          console.log("error");
          console.log(err);
        });
    }
  }

  setQty(line, n) {
    let index = this.currentOrder.lines.indexOf(line);
    this.currentOrder.lines[index].qty = this.currentOrder.lines[index].qty + n;
    this.updateLine(line);
  }

  updateLine(line) {
    console.log("into update func");
    console.log(line);

   // let index = this.currentOrder.lines.indexOf(line);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
      this.http.put(SERVER_URL + '/orderlines/' + line.id + '/', line, options)
        .map(res => res.json())
        .subscribe(data => {
              console.log("Update hecho");
              console.log(data);
              resolve(data);
            //  this.loading.dismiss();
        }, (err) => {
              console.log("error");
              console.log(err);
              reject(err);
        });
      });
  }

  newOrder(table, floor) {
    console.log("new order");
    console.log(table);
    console.log(floor);
    console.log(this.orders);
    let res = this.orders.filter((order) => {
      return order.table.id == table.id && order.floor.id == floor.id;
    });

    if(res.length == 0) {
      let order = {
        id: undefined,
        state: "new",
        floor:floor, 
        table: table, 
        table_id: table.id,
        employee_id: 1,
        pos_config_id: 1,
        lines: []
      };

      console.log(order)

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.post(SERVER_URL + '/orders/', order, options)
        .map(res => res.json())
        .subscribe(data => {
          console.log("insercion hecha");
          console.log(data);
          order.id = data.id;
          this.orders.push(order);
          this.currentOrder = order;
        }, (err) => {
        console.log("error");
        console.log(err);
        });
    } else {
      this.currentOrder = res[0];
    }
    console.log("current:");
    console.log(this.currentOrder);
    console.log("orders:");
    console.log(this.orders);
  }

  pay() {
    let index = this.orders.indexOf(this.currentOrder);
    this.currentOrder.state = "paid";

    return new Promise((resolve, reject) => {
      this.createAccountStatement(this.currentOrder).then((as: any) => {
        this.currentOrder.account_statement_id = as.id;
   
        this.updateOrder(this.currentOrder).then((res) => {
          this.currentOrder = {};
          this.orders.splice(index, 1);
          resolve(res);
        }, (err) => {
          console.log("error updating order");
          reject(err);
        });
      
    }, (err) => {
      console.log("error creating as");
      console.log(err);
    });
    });
  }
  

  updateOrder(order) {
    console.log("to update orderr");
    console.log(order.id);

    let headers = new Headers();
    let options = new RequestOptions({ headers: headers });

    return new Promise((resolve, reject) => {
        this.http.put(SERVER_URL + '/orders/' + order.id + '/', order, options)
        .map(res => res.json())
        .subscribe(data => {
              console.log("Update hecho");
              console.log(data);
            //  this.loading.dismiss();
              resolve(data);
        }, (err) => {
              console.log("error updating order");
              console.log(err);
              reject(err);
        });
    });
  }

  createAccountStatement(order) {
    let headers = new Headers();
    let options = {headers: headers};
    let total = 0;
    for(let i=0; i<order.lines.length; i++) {
      total += order.lines[i].qty * order.lines[i].price_unit;
    }
    let as = {
      name: "Transaction " + order.id,
      total: total
    };
    return new Promise((resolve, reject) => {
      this.http.post(SERVER_URL + '/account-statements/', as, options)
          .map(res => res.json())
          .subscribe(data => {
            console.log("account statement creado");
            console.log(data);
            resolve(data);
          //  this.loading.dismiss();
          }, (err) => {
            console.log("error");
            console.log(err);
            reject(err);
          });
      });
  }
 
  showLoader(){
      this.loading = this.loadingCtrl.create({
          content: 'Cargando...'
      });
      this.loading.present();
  }
}

 


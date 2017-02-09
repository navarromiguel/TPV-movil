import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
 
import { LoginPage } from '../pages/login-page/login-page';
import { TablePage } from '../pages/table-page/table-page';
import { TabsPage } from '../pages/tabs-page/tabs-page'
import { ProductsPage } from '../pages/products-page/products-page'
import { OrderPage } from '../pages/order-page/order-page'
import { Data } from '../providers/data';

@Component({
  templateUrl: `app.html`
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LoginPage;
  orders = [
  	{floor: "Planta 1", table: "m1"},
  	{floor: "Planta 1", table: "m2"},
  	{floor: "Planta 2", table: "m1"}
  ];
 
  constructor(platform: Platform, public menu: MenuController, public dataService: Data) {
    platform.ready().then(() => {
      StatusBar.styleDefault();

      this.dataService.getData().then((orders) => {
 
      if(orders){
        this.orders = JSON.parse(orders); 
      }
 
    });
    });
  }

  openOrder(order) {
  	this.menu.close();
  	this.nav.push(TabsPage, {
  	  table: order.table, 
      floor: order.floor
    });
  }
}
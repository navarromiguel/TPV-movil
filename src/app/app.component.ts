import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
 
import { LoginPage } from '../pages/login-page/login-page';
import { TablePage } from '../pages/table-page/table-page';
import { TabsPage } from '../tabs-page/tabs-page'
import { ProductsPage } from '../products-page/products-page'
import { OrderPage } from '../order-page/order-page'

@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {
  rootPage = LoginPage;
 
  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}
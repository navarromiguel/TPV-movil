import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, App, AlertController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
 
import { LoginPage } from '../pages/login-page/login-page';
import { TablePage } from '../pages/table-page/table-page';
import { TabsPage } from '../pages/tabs-page/tabs-page'
import { ProductsPage } from '../pages/products-page/products-page'
import { OrderPage } from '../pages/order-page/order-page'
import { Data } from '../providers/data';
import { TPV } from '../providers/tpv';

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

  constructor(public app: App, private alertCtrl: AlertController, public tpv: TPV, platform: Platform, public menu: MenuController, public dataService: Data) {
    platform.ready().then(() => {
      StatusBar.styleDefault();

      this.dataService.getData().then((orders) => {
 
      this.tpv = tpv;

      if(orders){
        this.orders = JSON.parse(orders); 
      }
 
    });
    });
  }

  openOrder(order) {
  	this.menu.close();
    if(this.tpv.currentOrder !== order) {
      this.tpv.currentOrder = order;
    	this.nav.push(TabsPage, {
    	  table: order.table, 
        floor: order.floor
      });
    }
  }

  chooseCategory(category) {
    console.log("categoy selected");
    console.log(category);
    this.menu.toggle("menuCategories");
  }

  removeOrder(order) {
    let alert = this.alertCtrl.create({
      title: 'Confirmar borrado',
      message: '¿Estás seguro de que quieres eliminar el pedido?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Ok clicked');
            let index = this.tpv.orders.indexOf(order);
            if(index > -1){
              this.tpv.orders.splice(index, 1);
              if(order === this.tpv.currentOrder) {
                this.tpv.currentOrder = {};
                this.app.getRootNav().setRoot(TablePage);
              }
            }
          }
        }
      ]
    });
    alert.present();
  }
}
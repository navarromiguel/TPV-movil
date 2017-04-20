import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, App, AlertController, Nav } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
 
import { LoginPage } from '../pages/login-page/login-page';
import { TablePage } from '../pages/table-page/table-page';
import { TabsPage } from '../pages/tabs-page/tabs-page'
import { ProductsPage } from '../pages/products-page/products-page'
import { OrderPage } from '../pages/order-page/order-page'
import { CpanelPage } from '../pages/cpanel/cpanel'
import { QrdataPage } from '../pages/qrdata/qrdata'
import { AlertsPage } from '../pages/alerts/alerts'
import { AlertDetailsPage } from '../pages/alert-details/alert-details'
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
    if(this.tpv.currentOrder != order) {
      this.tpv.currentOrder = order;
    }
    this.nav.push(TabsPage, {
        table: order.table, 
        floor: order.floor
      });
  }

  chooseCategory(category) {
    console.log("categoy selected");
    console.log(category);
    this.tpv.filteredProducts = this.tpv.products.filter((product) => {
      return product.category_id == category.id || this.getParents(product.category_id).indexOf(category.id) > -1;
    });
    this.menu.toggle("menuCategories");
  }

  getParents(id) {
    let parents = [];
    let category = this.tpv.categories.filter((cat) => {
        return cat.id == id;
      })[0];
    while(category.parent_id != 0){
      console.log("category")
      console.log(category)
      parents.push(category.parent_id);
      category = this.tpv.categories.filter((cat) => {
        return cat.id == category.parent_id;
      })[0];

    }
    console.log(parents);
    return parents;
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
            console.log(order);
            console.log(this.tpv.orders);
            console.log('Ok clicked');
    //        let index = this.tpv.orders.indexOf(order);


            let index = -1;
            for(let i=0; i<this.tpv.orders.length && index == -1; i++){
              if(this.tpv.orders[i].id == order.id){
                index = i;
              }
            }

            let found = this.tpv.orders.filter((item) => {
              return item.id == order.id;
            })[0];

            console.log(index);
            console.log("found:");
            console.log(found);
            if(index > -1) {
              this.tpv.deleteOrder(order);
              this.tpv.orders.splice(index, 1);

              if(this.tpv.currentOrder && order.id == this.tpv.currentOrder.id) {
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
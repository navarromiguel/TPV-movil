import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';
import { ProductsPage } from '../products-page/products-page'
import { OrderPage } from '../order-page/order-page'
import { TPV } from '../../providers/tpv';

@Component({
  selector: 'page-tabs-page',
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  tab_products = ProductsPage;
  tab_order = OrderPage;
  rootParams = {};

  constructor(private menu: MenuController, public tpv: TPV, public navCtrl: NavController, public navParams: NavParams) {
  	this.rootParams = navParams;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPagePage');
    
    let floor = this.navParams.get('floor');
    let table = this.navParams.get('table');
    this.tpv.newOrder(table, floor);
    console.log(table + " - " + floor);
  }

  enableCategoriesMenu() {
    this.menu.enable(true, "menuCategories");
  }

}

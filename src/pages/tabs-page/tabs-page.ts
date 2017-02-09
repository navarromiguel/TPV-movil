import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProductsPage } from '../products-page/products-page'
import { OrderPage } from '../order-page/order-page'

@Component({
  selector: 'page-tabs-page',
  templateUrl: 'tabs-page.html'
})
export class TabsPage {

  tab_products = ProductsPage;
  tab_order = OrderPage;
  rootParams = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.rootParams = navParams;
  }

  	
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPagePage');
  }

}

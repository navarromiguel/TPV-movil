import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TablePage } from '../table-page/table-page';

@Component({
  selector: 'page-products-page',
  templateUrl: 'products-page.html'
})
export class ProductsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPagePage');
  }

  newOrder() {
  	this.navCtrl.parent.viewCtrl._nav.pop({animate:false});
  }

}

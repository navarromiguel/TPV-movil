import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TablePage } from '../table-page/table-page';

@Component({
  selector: 'page-order-page',
  templateUrl: 'order-page.html'
})
export class OrderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPagePage');
  }

  newOrder() {
  	this.navCtrl.parent.viewCtrl._nav.pop({animate:false});
  }

}

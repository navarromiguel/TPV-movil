import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { TablePage } from '../table-page/table-page';
import { TPV } from '../../providers/tpv';

@Component({
  selector: 'page-order-page',
  templateUrl: 'order-page.html'
})
export class OrderPage {
	
	table : string;
	floor : string;

  constructor(public tpv: TPV, public app: App, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private menu: MenuController) {
  	this.table = navParams.get('table');
  	this.floor = navParams.get('floor');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPagePage');
  }

  newOrder() {
      this.app.getRootNav().setRoot(TablePage)
        .then(() => {
          const index = this.viewCtrl.index;
          this.navCtrl.remove(index);
        });  
  }

  moreQty(l) {
    let index = this.tpv.currentOrder.lines.indexOf(l);
    let line = this.tpv.currentOrder.lines[index];
    line.qty++;
  }

  lessQty(l) {
    let index = this.tpv.currentOrder.lines.indexOf(l);
    let line = this.tpv.currentOrder.lines[index];
    if(line.qty > 1) {
      line.qty--;
    }
    else {
      this.tpv.currentOrder.lines.splice(index, 1);
    }
  }

  removeLine(l) {
    let index = this.tpv.currentOrder.lines.indexOf(l);
    this.tpv.currentOrder.lines.splice(index, 1);
  }

  payment() {
    let index = this.tpv.orders.indexOf(this.tpv.currentOrder);
    this.tpv.currentOrder = {};
    this.tpv.orders.splice(index, 1);
    this.app.getRootNav().setRoot(TablePage);
  }
}

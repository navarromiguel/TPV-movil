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
  	this.table = navParams.get('table').name;
  	this.floor = navParams.get('floor').name;
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
    this.tpv.setQty(l, 1);
  }

  lessQty(l) {
    if(l.qty > 1) {
      this.tpv.setQty(l, -1);
    }
    else {
      this.removeLine(l);
    }
  }

  removeLine(l) {
    let index = this.tpv.currentOrder.lines.indexOf(l);
    console.log(index);
    this.tpv.currentOrder.lines.splice(index, 1);
    this.tpv.deleteOrderLine(l).then((res) => {
      console.log("success delete line");
    }, (err) => {
      console.log("error on delete line");
    });
    
  }

  payment() {
    this.tpv.pay().then((res) => {
      console.log("Pago con exito");
      console.log(res);
      this.app.getRootNav().setRoot(TablePage);
    }, (err) => {
      console.log("Error al pagar");
      console.log(err);
    })
    
    
  }
}

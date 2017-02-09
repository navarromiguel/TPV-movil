import { Component } from '@angular/core';
import { App, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { TablePage } from '../table-page/table-page';

@Component({
  selector: 'page-order-page',
  templateUrl: 'order-page.html'
})
export class OrderPage {
	
	table : string;
	floor : string;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private menu: MenuController) {
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
}

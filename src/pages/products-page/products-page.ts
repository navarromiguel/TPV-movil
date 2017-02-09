import { Component, ViewChild } from '@angular/core';
import { App, NavController, NavParams, ViewController } from 'ionic-angular';
import { TablePage } from '../table-page/table-page';

@Component({
  selector: 'page-products-page',
  templateUrl: 'products-page.html',
})
export class ProductsPage {

	table : string;
	floor : string;

  constructor(public app: App, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
  	this.table = navParams.get('table');
  	this.floor = navParams.get('floor');
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPagePage');
  }

  newOrder() {
    this.app.getRootNav().setRoot(TablePage)
        .then(() => {
          const index = this.viewCtrl.index;
          this.navCtrl.remove(index);
        });  
    }

}

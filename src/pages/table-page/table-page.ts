import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs-page/tabs-page'

/*
  Generated class for the TablePage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-table-page',
  templateUrl: 'table-page.html'
})
export class TablePage {

  tables = [
  	{name: "m1", seats: 4},
  	{name: "m2", seats: 4},
  	{name: "m3", seats: 4},
  	{name: "m4", seats: 4},
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TablePagePage');
  }

  chooseTable(table) {
  	console.log("table choosed: " + table.name);
  	this.navCtrl.push(TabsPage);
  }

}

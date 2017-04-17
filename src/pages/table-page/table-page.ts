import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs-page/tabs-page'
import { TPV } from '../../providers/tpv';

@Component({
  selector: 'page-table-page',
  templateUrl: 'table-page.html'
})
export class TablePage {

  floor: any;
  tables = [];


  constructor(public tpv: TPV, public navCtrl: NavController, public navParams: NavParams) {
    console.log("Tables page init");
    console.log(this.tpv.floors);
    this.floor = this.tpv.floors[0].id;
    console.log("floor setted");

    for(let i=0; i<this.tpv.tables.length; i++){
      if(this.tpv.tables[i].floor_id[0] == this.floor){
        this.tables.push(this.tpv.tables[i])
      }
    }
    console.log("tables inicializadas");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TablePagePage');
  }

  onChange() {
    this.tables = this.tpv.tables.filter(
          table => table.floor_id == this.floor);
  }

  chooseTable(table) {
  	this.navCtrl.push(TabsPage, {
      table: table,
      floor: this.tpv.floors.filter(
        floor => floor.id == this.floor)[0]
    });
  }

}

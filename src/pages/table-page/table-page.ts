import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../tabs-page/tabs-page'

@Component({
  selector: 'page-table-page',
  templateUrl: 'table-page.html'
})
export class TablePage {

  floors = [
    {id: 0, name:"Panta 1"},
    {id: 1, name:"Panta 2"}
  ]

  floor = this.floors[0].id;

  all_tables = [
  	{name: "m1", seats: 4, floor_id:0},
  	{name: "m2", seats: 4, floor_id:0},
  	{name: "m3", seats: 4, floor_id:0},
  	{name: "m4", seats: 4, floor_id:0},
    {name: "m1", seats: 4, floor_id:1},
    {name: "m2", seats: 4, floor_id:1},
    {name: "m3", seats: 4, floor_id:1},
    {name: "m4", seats: 4, floor_id:1},
    {name: "m5", seats: 4, floor_id:1},
    {name: "m6", seats: 4, floor_id:1},
    {name: "m7", seats: 4, floor_id:1}
  ]

  tables = this.all_tables.filter(
          table => table.floor_id === this.floor);


  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TablePagePage');
  }

  onChange() {
    this.tables = this.all_tables.filter(
          table => table.floor_id == this.floor);
  }

  chooseTable(table) {
  	this.navCtrl.push(TabsPage, {
      table: table.name,
      floor: this.floors.filter(
        floor => floor.id == this.floor)[0].name
    });
  }

}

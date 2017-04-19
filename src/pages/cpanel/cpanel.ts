import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TablePage } from '../table-page/table-page';


declare var cordova;
/*
  Generated class for the Cpanel page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cpanel',
  templateUrl: 'cpanel.html'
})
export class CpanelPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CpanelPage');
  }

  openComandero() {
  	this.navCtrl.push(TablePage);
  }

  openQR() {
  	console.log(window);

  	cordova.plugins.barcodeScanner.scan(
      (result) => {
          alert("We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled);
      }, 
      (error) => {
          alert("Fallo al escanear.");
      }
   );
  }
}
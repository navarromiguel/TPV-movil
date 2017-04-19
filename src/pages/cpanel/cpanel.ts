import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TablePage } from '../table-page/table-page';
import { QrdataPage } from '../qrdata/qrdata'
import { LoginPage } from '../login-page/login-page'

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
          this.navCtrl.push(QrdataPage);
      }, 
      (error) => {
          alert("Fallo al escanear.");
      }
   );
  }

  logout() {
    this.navCtrl.setRoot(LoginPage);
  }
}

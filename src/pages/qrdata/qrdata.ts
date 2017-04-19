import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';

/*
  Generated class for the Qrdata page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-qrdata',
  templateUrl: 'qrdata.html'
})
export class QrdataPage {

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrdataPage');
  }

  confirm() {
  	this.navCtrl.pop();
  	let toast = this.toastCtrl.create({
        message: 'Confirmación envíada',
        duration: 2000,
        position: 'bottom',
      });
      toast.present();
  }

}

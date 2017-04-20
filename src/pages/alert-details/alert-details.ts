import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the AlertDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-alert-details',
  templateUrl: 'alert-details.html'
})
export class AlertDetailsPage {

  alert = {};

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.alert = navParams.get("alert");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertDetailsPage');
  }

  confirm() {
  	this.navCtrl.pop();
  }

}

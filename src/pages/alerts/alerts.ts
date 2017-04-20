import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertDetailsPage } from '../alert-details/alert-details'

/*
  Generated class for the Alerts page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html'
})
export class AlertsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AlertsPage');
  }

  openAlert1Details() {
  	this.navCtrl.push(AlertDetailsPage, {alert: {
  		description: 'El domingo 23 es el clásico. Se espera más clientela de lo habitual.',
  		actions: ['Contratar empleado.', 'Realizar pedido de cervezas.']
  	}
  	});
  }

  openAlert2Details() {
  	this.navCtrl.push(AlertDetailsPage, {alert: {
  		description: 'Hay exceso de lechuga en el almacén.',
  		actions: ['Publicar oferta en redes sociales.']
  	}
  	});
  }

}

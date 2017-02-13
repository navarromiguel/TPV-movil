import { Component, ViewChild } from '@angular/core';
import { App, ToastController, NavController, NavParams, ViewController, MenuController } from 'ionic-angular';
import { TablePage } from '../table-page/table-page';
import { TPV } from '../../providers/tpv';

@Component({
  selector: 'page-products-page',
  templateUrl: 'products-page.html',
})
export class ProductsPage {

	table : string;
	floor : string;
  products = []

  constructor(public toastCtrl: ToastController, public tpv: TPV, public app: App, public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, private menu: MenuController) {
  	this.table = navParams.get('table').name;
  	this.floor = navParams.get('floor').name;
    this.tpv.filteredProducts = this.tpv.products;
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPagePage');
    this.menu.enable(true, "menuCategories");
  }

  ionViewWillLeave() {
        this.menu.enable(false, "menuCategories");
    }

  newOrder() {
    this.app.getRootNav().setRoot(TablePage);
       /* .then(() => {
          const index = this.viewCtrl.index;
          this.navCtrl.remove(index);
        });  */
    }

    notify() {
      let toast = this.toastCtrl.create({
        message: 'Producto añadido',
        duration: 500,
        position: 'top',
        cssClass: 'toast'
      });
      toast.present();
    }

    clickProduct(product){
      console.log("product clicked");
      console.log(product);
      this.tpv.addProduct(product);
      this.notify();
    }

    search(ev: any) {
      let val = ev.target.value;

      if (val && val.trim() != '') {
        this.tpv.filteredProducts = this.tpv.products.filter((product) => {
          return (product.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }
      else {
        this.products = this.tpv.products;
      }
    }
}

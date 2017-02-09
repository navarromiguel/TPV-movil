import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController } from 'ionic-angular';
import { Auth } from '../../providers/auth';
import { TPV } from '../../providers/tpv';
import { TablePage } from '../table-page/table-page';
 
@Component({
  selector: 'login-page',
  templateUrl: 'login-page.html'
})
export class LoginPage {
 
    email: string;
    password: string;
    loading: any;
 
    constructor(public navCtrl: NavController, public tpv: TPV, public authService: Auth, public loadingCtrl: LoadingController, private menu: MenuController) {
 
    }
 
    ionViewDidLoad() {
        this.menu.enable(false, "menuOrders");
        this.menu.enable(false, "menuCategories");
 
        this.showLoader();
 
        //Check if already authenticated
        this.authService.checkAuthentication().then((res) => {
            console.log("Already authorized");
            this.loading.dismiss();
            this.navCtrl.setRoot(TablePage);
        }, (err) => {
            console.log("Not already authorized");
            this.loading.dismiss();
        });
 
    }

    ionViewWillLeave() {
        this.menu.enable(true, "menuOrders");
    }
 
    login(){
 
        this.showLoader();
 
        let credentials = {
            email: this.email,
            password: this.password
        };
 
        this.authService.login(credentials).then((result) => {
            



            this.loading.dismiss();
            console.log(result);
            this.navCtrl.setRoot(TablePage);
        }, (err) => {
        this.tpv.getProductCategories().then((result) => {
                console.log("data");
                console.log(result);
            }, (err) => {
                console.log("errooor");
            });
            this.loading.dismiss();
            console.log(err);
            // quitar esto cuando este bien la Autentication
            this.navCtrl.setRoot(TablePage);
        });
 
    }
 
    showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }
 
}
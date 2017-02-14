import { Component } from '@angular/core';
import { NavController, ToastController, MenuController, LoadingController } from 'ionic-angular';
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

    loadedCategories = false;
    loadedFloors = false;
    loadedTables = false;
    loadedProducts = false;
 
    constructor(public toastCtrl: ToastController, public navCtrl: NavController, public tpv: TPV, public authService: Auth, public loadingCtrl: LoadingController, private menu: MenuController) {
 
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
            alias: this.email ? this.email : "",
            password: this.password ? this.password : ""
        };
 
        this.authService.login(credentials).then((result) => {
            console.log("LOGEADO CON ÉXITO");
            this.loading.dismiss();
            console.log(result);

            this.tpv.loadCategories().then((result) => {
                console.log("data");
                console.log(result);
                this.loadedCategories = true;
                this.checkLoadedData();
            }, (err) => {
                console.log("errooor");
            });

            this.tpv.loadFloors().then((result) => {
                console.log("data");
                console.log(result);
                this.loadedFloors = true;
                this.checkLoadedData();
            }, (err) => {
                console.log("errooor");
            });

            this.tpv.loadTables().then((result) => {
                console.log("data");
                console.log(result);
                this.loadedTables = true;
                this.checkLoadedData();
            }, (err) => {
                console.log("errooor");
            });

            this.tpv.loadProducts().then((result) => {
                console.log("data");
                console.log(result);
                this.loadedProducts = true;
                this.checkLoadedData();
            }, (err) => {
                console.log("errooor");
            });

            this.tpv.loadNewOrders().then((orders: any) => {
                    console.log("new orders succesfull loaded");
                    console.log(orders);
                    this.tpv.orders = orders;

                    setInterval(()=>{
                        this.tpv.loadNewOrders().then((orders: any) => {
                            console.log("new orders succesfull loaded");
                            console.log(orders);
                            let id = -1;
                            if(this.tpv.currentOrder){
                                id = this.tpv.currentOrder.id;
                                this.tpv.currentOrder = orders.filter((o) => {
                                    return o.id == id;
                                })[0];
                            }

                            this.tpv.orders = orders;
                        }, (err) => {
                            console.log("error loading new orders");
                            console.log(err);
                        });

                    },
                    5000);


                }, (err) => {
                    console.log("error loading new orders");
                    console.log(err);
                });
            


        }, (err) => {
            this.loading.dismiss();
            this.loginError();
            console.log(err);
        });
 
    }

    checkLoadedData() {
        if(this.loadedCategories && this.loadedFloors && this.loadedTables && this.loadedProducts){
            this.navCtrl.setRoot(TablePage);
        }
    }

    loginError() {
      let toast = this.toastCtrl.create({
        message: 'Usuario o contraseña inválidos',
        duration: 2000,
        position: 'bottom',
      });
      toast.present();
    }
 
    showLoader(){
 
        this.loading = this.loadingCtrl.create({
            content: 'Authenticating...'
        });
 
        this.loading.present();
 
    }
 
}
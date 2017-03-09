import { Component } from "@angular/core";
import { NavController, ModalController, AlertController, LoadingController } from 'ionic-angular';
//import { Todos } from '../../providers/todos';
import { Auth } from '../../providers/auth';
import { LoginPage } from '../login-page/login-page';
 
@Component({
  selector: 'home-page',
  templateUrl: 'home.html'
})
export class HomePage {
 
  loading: any;
 
  constructor(public navCtrl: NavController, public modalCtrl: ModalController, 
    public alertCtrl: AlertController, public authService: Auth, public loadingCtrl: LoadingController) {
 
  }
 
  ionViewDidLoad(){
 
    
 
  }
 
  addTodo(){
 
    let prompt = this.alertCtrl.create({
      title: 'Nuevo pedido',
      message: 'Introduce productos',
      inputs: [
        {
          name: 'title'
        }
      ],
      buttons: [
        {
          text: 'Cancel'
        },
        {
          text: 'Save',
          handler: todo => {
 
                if(todo){
 
                    this.showLoader();
 /*
                    this.todoService.createTodo(todo).then((result) => {
                        this.loading.dismiss();
                        this.todos = result;
                        console.log("todo created");
                    }, (err) => {
                        this.loading.dismiss();
                        console.log("not allowed");
                    });
 */
 					this.loading.dismiss();
                }
 
 
          }
        }
      ]
    });
 
    prompt.present();
 
  }
 
  deleteTodo(todo){
 
    this.showLoader();
 
    //Remove from database
    /*
    this.todoService.deleteTodo(todo._id).then((result) => {
 
      this.loading.dismiss();
 
      //Remove locally
        let index = this.todos.indexOf(todo);
 
        if(index > -1){
            this.todos.splice(index, 1);
        }   
 
    }, (err) => {
      this.loading.dismiss();
        console.log("not allowed");
    });
    */
  }
 
  showLoader(){
 
    this.loading = this.loadingCtrl.create({
      content: 'Authenticating...'
    });
 
    this.loading.present();
 
  }
 
  logout(){
 
    this.authService.logout();
    this.navCtrl.setRoot(LoginPage);
 
  }
 
}
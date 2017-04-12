import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Storage } from '@ionic/storage';
import { SERVER_URL } from './config'
import 'rxjs/add/operator/map';
import { OdooRPCService } from 'angular2-odoo-jsonrpc';

@Injectable()
export class Auth {
 
  public token: any;
 
  constructor(public http: Http, public storage: Storage, odooRPC: OdooRPCService) {
    this.odooRPC.init({
            odoo_server: SERVER_URL;
            http_auth: "admin:password" // optional
        });
  }
 
  checkAuthentication(){
 
    return new Promise((resolve, reject) => {
 
        //Load token if exists
        this.storage.get('token').then((value) => {
 
            this.token = value;
 
            let headers = new Headers();
            headers.append('Authorization', this.token);
 
            this.http.get('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/protected', {headers: headers})
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                }); 
 
        });         
 
    });
 
  }
 
  createAccount(details){
 
    return new Promise((resolve, reject) => {
 
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        headers.append('Proxy-Authorization', 'Basic');
 
        this.http.post('https://YOUR_HEROKU_APP.herokuapp.com/api/auth/register', JSON.stringify(details), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
            this.token = data.token;
            this.storage.set('token', data.token);
            resolve(data);
 
          }, (err) => {
            reject(err);
          });
 
    });
 
  }
 
  login(credentials){
 
    return new Promise((resolve, reject) => {
 
        this.odooRPC.login('siciliano', 'admin', 'password').then(res => {
            console.log('login success');
            console.log(res);
            resolve(res);
        }).catch( err => {
            console.error('login failed', err);
            reject(err);
        })




/*

        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
 
        this.http.post(SERVER_URL + '/users/login/', JSON.stringify(credentials), {headers: headers})
          .subscribe(res => {
 
            let data = res.json();
         //   this.token = data.token;
         //   this.storage.set('token', data.token);
            resolve(data);
 
            resolve(res.json());
          }, (err) => {
            reject(err);
          });

 */
 
    });
 
  }
 
  logout(){
    this.storage.set('token', '');
  }
 
}
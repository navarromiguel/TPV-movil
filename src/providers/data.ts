import { Storage } from '@ionic/storage';
import {Injectable} from '@angular/core';
 
@Injectable()
export class Data {
 
  constructor(public storage: Storage){
 
  }
 
  getData() {
    return this.storage.get('orders');  
  }
 
  save(data){
    let orders = JSON.stringify(data);
    this.storage.set('orders', orders);
  }
 
}
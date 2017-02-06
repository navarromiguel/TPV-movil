import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login-page/login-page';
import { TablePage } from '../pages/table-page/table-page';
import { TabsPage } from '../pages/tabs-page/tabs-page'
import { ProductsPage } from '../pages/products-page/products-page'
import { OrderPage } from '../pages/order-page/order-page'
import { SignupPage } from '../pages/signup-page/signup-page';
import { Auth } from '../providers/auth';
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    TablePage,
    TabsPage,
    ProductsPage,
    OrderPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
tabsPlacement: 'top',
  platforms: {
    android: {
      tabsPlacement: 'top'
    },
    ios: {
      tabsPlacement: 'bottom'
    },
    windows:
    {
      tabsPlacement: 'top'
    }
  }
})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    TablePage,
    TabsPage,
    ProductsPage,
    OrderPage,
  ],
  providers: [Storage, Auth]
})
export class AppModule {}
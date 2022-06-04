import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConnectWalletComponent} from "./connect-wallet/connect-wallet.component";
import {HomeComponent} from "./home/home.component";
import {WalletConnectedRouteGuard} from "./route-guards";

const routes: Routes = [
  {
    path: 'connect-wallet',
    component: ConnectWalletComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [WalletConnectedRouteGuard],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

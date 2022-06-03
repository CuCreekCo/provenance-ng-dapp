import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConnectWalletComponent } from './connect-wallet/connect-wallet.component';
import {WalletConnectService} from "./wallet-connect.service";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    ConnectWalletComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
      WalletConnectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ConnectWalletComponent} from './connect-wallet/connect-wallet.component';
import {WalletConnectService} from "./service/wallet-connect.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NavbarComponent} from './widget/navbar.component';
import {HomeComponent} from './home/home.component';
import {ReactiveFormsModule} from "@angular/forms";
import { SendHashComponent } from './send-hash/send-hash.component';
import { AlertComponent } from './widget/alert.component';
import { PbResponseComponent } from './widget/pb-response.component';

@NgModule({
    declarations: [
        AppComponent,
        ConnectWalletComponent,
        NavbarComponent,
        HomeComponent,
        SendHashComponent,
        AlertComponent,
        PbResponseComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule
    ],
    providers: [
        WalletConnectService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

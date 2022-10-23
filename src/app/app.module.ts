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
import {SendHashComponent} from './send-hash/send-hash.component';
import {EventStatusComponent} from './widget/event.status.component';
import {NgxJsonViewerModule} from "ngx-json-viewer";

@NgModule({
    declarations: [
        AppComponent,
        ConnectWalletComponent,
        NavbarComponent,
        HomeComponent,
        SendHashComponent,
        EventStatusComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgbModule,
        ReactiveFormsModule,
        NgxJsonViewerModule
    ],
    providers: [
        WalletConnectService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

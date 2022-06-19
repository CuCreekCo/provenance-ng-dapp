import {Component, OnInit} from '@angular/core';
import {WalletConnectService} from "../service/wallet-connect.service";

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: []
})
export class NavbarComponent implements OnInit {

    constructor(private walletConnectService: WalletConnectService) {
    }

    ngOnInit(): void {
    }
}

import {Component, OnInit} from '@angular/core';
import {WalletConnectService} from "../wallet-connect.service";

@Component({
    selector: 'app-connect-wallet',
    templateUrl: './connect-wallet.component.html',
    styleUrls: ['./connect-wallet.component.css']
})
export class ConnectWalletComponent implements OnInit {

    qr: string = "";
    address: string = "";
    connected: boolean = false;

    constructor(private walletConnectService: WalletConnectService) {
    }

    ngOnInit(): void {
        this.walletConnectService.connect().subscribe(s => {
            this.qr = s.QRCode;
            this.address = s.address;
            this.connected = s.connected;
        });
        this.walletConnectService.messages.subscribe(s => {
            console.dir(s);
        })
    }
}

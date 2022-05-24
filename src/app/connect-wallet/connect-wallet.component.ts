import {Component, OnInit} from '@angular/core';
import {WalletConnectService} from "@provenanceio/walletconnect-js/lib/service";

@Component({
    selector: 'app-connect-wallet',
    templateUrl: './connect-wallet.component.html',
    styleUrls: ['./connect-wallet.component.css']
})
export class ConnectWalletComponent implements OnInit {

    constructor(private walletConnectService: WalletConnectService) {
    }

    ngOnInit(): void {
    }

    qrCodeImage(): string {
        return this.walletConnectService.state.QRCode;
    }
}

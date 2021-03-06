import {Component, OnInit} from '@angular/core';
import {WalletConnectService} from "../service/wallet-connect.service";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {WalletConnectMessage} from "../model/Models";
import {State, WINDOW_MESSAGES} from "@provenanceio/walletconnect-js/lib/service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-connect-wallet',
    templateUrl: './connect-wallet.component.html',
    styleUrls: []
})
export class ConnectWalletComponent implements OnInit {

    constructor(
        private router: Router,
        private walletConnectService: WalletConnectService,
        private modalService: NgbModal) {
    }

    ngOnInit(): void {
        this.walletConnectService.wcMessages.subscribe((m: WalletConnectMessage) => {
            switch (m.windowMessage) {
                case WINDOW_MESSAGES.DISCONNECT:
                    this.router.navigate(['/']);
                    break;
                case WINDOW_MESSAGES.CONNECTED:
                    if (this.modalService.hasOpenModals()) {
                        this.modalService.dismissAll();
                    }
                    this.router.navigate(['/home']);
                    break;
            }
        });
    }

    disconnect(): void {
        this.walletConnectService.disconnect();
    }

    connect(content: any): void {
        this.walletConnectService.connect().subscribe(c => {
            if (!c.connected) {
                this.modalService.open(content);
            }
        })
    }

    state(): State {
        return this.walletConnectService.state;
    }

}

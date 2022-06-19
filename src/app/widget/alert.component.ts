import {Component, OnInit} from '@angular/core';
import {WalletConnectService} from "../service/wallet-connect.service";
import {WalletConnectMessage} from "../model/Models";

@Component({
    selector: 'app-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent implements OnInit {

    pbResponse: any = null;
    hasAlert: boolean = false;
    alertType: string = "danger";
    alertMessage: string = "";

    constructor(private walletConnectService: WalletConnectService) {
    }

    ngOnInit(): void {
        this.walletConnectService.wcMessages.subscribe({
            next: (n) => {
                this.buildAlert(n);
            }
        })
    }

    private danger() {
        this.alertType = "danger";
    }
    private info() {
        this.alertType = "info";
    }
    private warn() {
        this.alertType = "warning";
    }
    private success() {
        this.alertType = "success";
    }
    private buildAlert(walletConnectMessage: WalletConnectMessage) {

        this.pbResponse = null;

        // @ts-ignore
        if (walletConnectMessage.results.valid === false) {
            // @ts-ignore
            this.alertMessage = walletConnectMessage.results.error.message;
            this.danger();
        } else {
            //FIXME can be multiple, parse out blockchain response
            // @ts-ignore
            this.pbResponse = JSON.parse(walletConnectMessage.results.result);
            this.alertMessage = "Transaction processed.";
            this.success();
        }

        this.hasAlert = true;
    }

    alertClosed() {
        this.pbResponse = null;
        this.hasAlert = false;
    }

}

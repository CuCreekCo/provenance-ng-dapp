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

    private responseMessage(walletConnectMessage: WalletConnectMessage) {
        if(walletConnectMessage?.results) {
            console.log(typeof walletConnectMessage.results.data);
            // @ts-ignore
            if(walletConnectMessage.results.result) {
                // @ts-ignore
                if (walletConnectMessage.results.valid === false) {
                    // @ts-ignore
                    this.alertMessage = walletConnectMessage.results.error.message;
                    this.danger();
                } else {
                    this.alertMessage = "Transaction processed.";
                    this.success();
                }
                this.hasAlert = true;

            } else {
                // @ts-ignore
                if(walletConnectMessage.results.data.event == 'connect') {
                    this.success();
                    return "Connection established";
                }
            }
        }
        return null;
    }
    private pbResponseMessage(walletConnectMessage: WalletConnectMessage) {
        console.dir(walletConnectMessage.results);
        if(walletConnectMessage.results) {
            if(walletConnectMessage.results.data) {
                return walletConnectMessage.results.data;
            }
            // @ts-ignore
            return JSON.parse(walletConnectMessage.results.result);

        }
        return {};

    }
    private buildAlert(walletConnectMessage: WalletConnectMessage) {

        const rMsg = this.responseMessage(walletConnectMessage);

        if (rMsg) {
            this.hasAlert = true;
            this.alertMessage = rMsg;
        }
        this.pbResponse = this.pbResponseMessage(walletConnectMessage);
    }

    alertClosed() {
        this.pbResponse = null;
        this.hasAlert = false;
    }

}

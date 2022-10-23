import {Component, OnInit} from '@angular/core';
import {WalletConnectService} from "../service/wallet-connect.service";
import {WalletConnectMessage} from "../model/Models";

@Component({
    selector: 'event-status',
    templateUrl: './event.status.component.html'
})
export class EventStatusComponent implements OnInit {

    hasAlert: boolean = false;
    alertType: string = "danger";

    walletConnectMessage: WalletConnectMessage | undefined;
    lastEvent: string = "";

    constructor(private walletConnectService: WalletConnectService) {
        this.walletConnectService.wcMessages.subscribe({
            next: (w) => {
                console.log(`event next`);
                console.dir(w);
                this.handleWalletConnectMessage(w);
            },
            error: (e: any) => {
                console.log(`event error`);
                console.dir(e);
            }
        });
    }

    ngOnInit(): void {
    }

    private handleWalletConnectMessage(w: WalletConnectMessage): void {
        this.walletConnectMessage = w;
        this.lastEvent = w.windowMessage;
    }

    resultData(): any {
        if (this.walletConnectMessage != undefined && !!this.walletConnectMessage.results) {
            let w = this.walletConnectMessage.results;

            // @ts-ignore
            if (!!w["result"] && typeof w["result"] === 'string') {
                try {
                    // @ts-ignore
                    w["result"] = JSON.parse(w["result"]);
                } catch (e) {
                    console.log(e);
                }
            }
            return w;
        }
        return {};
    }

    /**
     * Flatten a multidimensional object
     *
     * For example:
     *   flattenObject{ a: 1, b: { c: 2 } }
     * Returns:
     *   { a: 1, c: 2}
     */
    private flattenObject(obj: any): Object {
        const flattened = {}

        Object.keys(obj).forEach((key) => {
            const value = obj[key]

            if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                Object.assign(flattened, this.flattenObject(value))
            } else {
                // @ts-ignore
                flattened[key] = value
            }
        })

        return flattened
    }

    hasEvent(): boolean {
        return this.walletConnectMessage !== undefined;
    }
}

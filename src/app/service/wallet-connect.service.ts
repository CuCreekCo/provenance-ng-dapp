import {Injectable} from '@angular/core';
import {State, WalletConnectService as WC, WINDOW_MESSAGES} from "@provenanceio/walletconnect-js/lib/service";

import {from, Observable, Observer} from "rxjs";
import {WalletConnectMessage} from "../model/Models";
import {Message} from "google-protobuf";
import {buildMessage, createAnyMessageBase64} from "@provenanceio/wallet-utils/lib";
import {convertUtf8ToHex} from "@walletconnect/utils";
import {CustomActionData, GasPrice, SendCoinData} from "@provenanceio/walletconnect-js/lib/types";

@Injectable({

    providedIn: 'root'
})
export class WalletConnectService {
    private wc: WC;
    private readonly wcObservable: Observable<WalletConnectMessage>;

    constructor() {
        this.wc = new WC();
        this.wcObservable = new Observable<WalletConnectMessage>((observer: Observer<WalletConnectMessage>) => {
            Object.keys(WINDOW_MESSAGES).forEach(key => {
                // @ts-ignore
                const l: string = WINDOW_MESSAGES[key];
                this.wc.addListener(l, results => {
                    observer.next(new WalletConnectMessage(l, results));
                });
            });
        });
        this.wcObservable.subscribe(this.observer);

        //does it look like local storage is still connected?
        if(this.wc.state.connected) {
            const af = async () => {
                await this.wc.connect();
            }
            af();
        }
    }

    private observer(m: WalletConnectMessage): void {
        console.log(`observed ${m.windowMessage}`);
        console.dir(m.results);

        switch (m.windowMessage) {
            case WINDOW_MESSAGES.DISCONNECT:
                this.wc?.resetState();
                break;
        }
    }

    connect(): Observable<State> {

        if (this.wc.state.connected) return new Observable<State>((obs) => {
            obs.next(this.wc.state);
            obs.complete();
        });

        const af = async (): Promise<State> => {
            await this.wc.connect();
            return this.wc.state;
        };
        return from(af());
    }

    disconnect(): Observable<State> {

        if (!this.wc.state.connected) return new Observable<State>((obs) => {
            obs.next(this.wc.state);
            obs.complete();
        });

        const af = async (): Promise<State> => {
            await this.wc.disconnect();
            return this.wc.state;
        };
        return from(af());
    }

    public get wcMessages(): Observable<WalletConnectMessage> {
        return this.wcObservable;
    }

    get state(): State {
        return this.wc.state;
    }

    sendCoin(toAddress: string, denom: string, amount: string, gasPrice: GasPrice): Observable<any> {
        const sendMessage = {
            fromAddress: this.state.address,
            toAddress: toAddress,
            amountList: [{ denom: denom, amount: amount }],
        };

        const msgSend = buildMessage('MsgSend', sendMessage);
        const msg = createAnyMessageBase64('MsgSend', msgSend as Message);

        let customAction: CustomActionData = {
            method: "provenance_sendTransaction",
            gasPrice: gasPrice,
            description: `Send ${amount}${denom} to ${toAddress}`,
            message: msg
        }
        return from(this.wc.customAction(customAction));
    }

    sendCoin2(toAddress: string, denom: string, amount: string, gasPrice: GasPrice): Observable<any> {
        let sendCoinData: SendCoinData = {
            amount: Number(amount),
            denom: denom,
            gasPrice: gasPrice,
            to: toAddress
        }
        return from(this.wc.sendCoin(sendCoinData));
    }

}

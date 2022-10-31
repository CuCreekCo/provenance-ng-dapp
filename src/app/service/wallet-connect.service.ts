import { Injectable } from '@angular/core';
import {
  WalletConnectService as WC,
  WINDOW_MESSAGES,
} from '@provenanceio/walletconnect-js/lib/service';
import {
  buildMessage,
  createAnyMessageBase64,
} from '@provenanceio/wallet-utils';
import { from, Observable, Observer } from 'rxjs';
import { WalletConnectMessage } from '../model/Models';
import { Message } from 'google-protobuf';
import { convertUtf8ToHex } from '@walletconnect/utils';
import type {
  GasPrice,
  WCSState,
  SendMessageData,
} from '@provenanceio/walletconnect-js/lib/types';

@Injectable({
  providedIn: 'root',
})
export class WalletConnectService {
  private wc: WC;
  private readonly wcObservable: Observable<WalletConnectMessage>;

  constructor() {
    this.wc = new WC();
    this.wcObservable = new Observable<WalletConnectMessage>(
      (observer: Observer<WalletConnectMessage>) => {
        Object.keys(WINDOW_MESSAGES).forEach((key) => {
          // @ts-ignore
          const l: string = WINDOW_MESSAGES[key];
          this.wc.addListener(l, (results) => {
            observer.next(new WalletConnectMessage(l, results));
          });
        });
      }
    );
    this.wcObservable.subscribe(this.observer);

    //does it look like local storage is still connected?
    if (this.wc.state.connected) {
      const af = async () => {
        await this.wc.connect();
      };
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

  setState = (value: Partial<WCSState>) => this.wc.setState(value);

  connect(): Observable<WCSState> {
    if (this.wc.state.connected)
      return new Observable<WCSState>((obs) => {
        obs.next(this.wc.state);
        obs.complete();
      });

    const af = async (): Promise<WCSState> => {
      await this.wc.connect();
      return this.wc.state;
    };
    return from(af());
  }

  disconnect(): Observable<WCSState> {
    if (!this.wc.state.connected)
      return new Observable<WCSState>((obs) => {
        obs.next(this.wc.state);
        obs.complete();
      });

    const af = async (): Promise<WCSState> => {
      await this.wc.disconnect();
      return this.wc.state;
    };
    return from(af());
  }

  public get wcMessages(): Observable<WalletConnectMessage> {
    return this.wcObservable;
  }

  get state(): WCSState {
    return this.wc.state;
  }

  sendCoin(
    toAddress: string,
    denom: string,
    amount: string,
    gasPrice: GasPrice
  ): Observable<any> {
    const sendMessage = {
      fromAddress: this.state.address,
      toAddress: toAddress,
      amountList: [{ denom: denom, amount: amount }],
    };

    const msgSend = buildMessage('MsgSend', sendMessage);
    const msg = createAnyMessageBase64('MsgSend', msgSend as Message);

    let customMessage: SendMessageData = {
      method: 'provenance_sendTransaction',
      gasPrice: gasPrice,
      description: `Send ${amount}${denom} to ${toAddress}`,
      message: msg,
    };
    console.log('this.wc.state', this.wc.state);
    this.wc.sendMessage(customMessage);
    return from(this.wc.sendMessage(customMessage));
  }
}

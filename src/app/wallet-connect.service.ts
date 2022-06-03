import { Injectable } from '@angular/core';
import {State, WalletConnectService as WC, WINDOW_MESSAGES} from "@provenanceio/walletconnect-js/lib/service";
import {defer, from, Observable, Observer} from "rxjs";
import {BroadcastResults} from "@provenanceio/walletconnect-js/lib/types";

@Injectable({
  providedIn: 'root'
})
export class WalletConnectService {

  private wc: WC;
  private readonly wcObservable: Observable<BroadcastResults>;

  constructor() {
    this.wc = new WC();
    let wcObserver: Observer<BroadcastResults>;
    this.wcObservable = new Observable<BroadcastResults>((observer: Observer<BroadcastResults>) => {
      wcObserver = observer;
    });
    for(let m in WINDOW_MESSAGES) {
      this.wc.addListener(m, (results => {
        wcObserver.next(results);
      }));
    }
  }

  connect(): Observable<State> {

    if(this.wc.state.connected) return new Observable<State>((obs) => {
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

    if(!this.wc.state.connected) return new Observable<State>((obs) => {
      obs.next(this.wc.state);
      obs.complete();
    });

    const af = async (): Promise<State> => {
      await this.wc.disconnect();
      return this.wc.state;
    };
    return from(af());
  }

  public get messages(): Observable<BroadcastResults> {
    return this.wcObservable;
  }

}

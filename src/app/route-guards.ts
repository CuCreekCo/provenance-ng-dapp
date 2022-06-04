import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from "@angular/router";
import {WalletConnectService} from "./service/wallet-connect.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WalletConnectedRouteGuard implements CanActivate{

  constructor(private router: Router, private walletConnectService: WalletConnectService) {

  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.walletConnectService.state.connected;
  }
}

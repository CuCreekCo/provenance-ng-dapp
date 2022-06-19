import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {WalletConnectService} from "../service/wallet-connect.service";
import {GasPrice} from "@provenanceio/walletconnect-js/lib/types";

@Component({
    selector: 'app-send-hash',
    templateUrl: './send-hash.component.html',
    styleUrls: ['./send-hash.component.css']
})
export class SendHashComponent implements OnInit {

    awaitingWallet:boolean = false;

    sendHashForm = this.formBuilder.group({
        toAddress: ['tp1vxlcxp2vjnyjuw6mqn9d8cq62ceu6lllpushy6', Validators.required],
        amount: ['100000000', Validators.required]
    });

    constructor(private formBuilder: FormBuilder, private walletConnectService: WalletConnectService) {
    }

    ngOnInit(): void {
        this.walletConnectService.wcMessages.subscribe({
            next: (n) => {
                console.log('I am in send hash component');
                console.dir(n);
            }
        })
    }

    onSubmit(): void {
        const gasPrice: GasPrice = {
            gasPrice: 1905,
            gasPriceDenom: 'nhash'
        }

        this.awaitingWallet = true;
        this.walletConnectService.sendCoin2(
            this.sendHashForm.get('toAddress')?.value,
            'nhash',
            this.sendHashForm.get('amount')?.value,
            gasPrice
        ).subscribe({
            next: (n) => {
                console.log(n);
            },
            error: (e) => {
                console.log(e);
            },
            complete: () => {
                console.log('Complete');
                this.awaitingWallet = false;
            }
        });
    }

}

import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WalletConnectService} from "../service/wallet-connect.service";
import {GasPrice} from "@provenanceio/walletconnect-js/lib/types";

@Component({
    selector: 'app-send-hash',
    templateUrl: './send-hash.component.html',
    styleUrls: ['./send-hash.component.css']
})
export class SendHashComponent implements OnInit {
    sendHashForm = this.formBuilder.group({
        toAddress: ['tp1vxlcxp2vjnyjuw6mqn9d8cq62ceu6lllpushy6', Validators.required],
        amount: ['100000000', Validators.required]
    });

    constructor(private formBuilder: FormBuilder, private walletConnectService: WalletConnectService) {
    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        const gasPrice: GasPrice = {
            gasPrice: 1905,
            gasPriceDenom: 'nhash'
        }

        this.walletConnectService.sendCoin(
            this.sendHashForm.get('toAddress')?.value,
            'nhash',
            this.sendHashForm.get('amount')?.value,
            gasPrice
        ).subscribe(n => {
            console.log(n);
        }, e => {
            console.log(e);
        });
    }

}

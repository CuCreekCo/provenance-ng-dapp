import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WalletConnectService} from "../service/wallet-connect.service";
import {buildMessage, createAnyMessageBase64} from "@provenanceio/wallet-utils";
import {Message} from 'google-protobuf';
import {convertUtf8ToHex} from '@walletconnect/utils';

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
        this.walletConnectService.sendCoin(
            this.sendHashForm.get('toAddress')?.value,
            'nhash',
            this.sendHashForm.get('amount')?.value,
            1905
        ).subscribe(n => {
            console.log(n);
        }, e => {
            console.log(e);
        });
    }

}

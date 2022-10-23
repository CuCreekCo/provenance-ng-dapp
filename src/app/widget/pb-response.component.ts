import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-pb-response',
    templateUrl: './pb-response.component.html'
})
export class PbResponseComponent implements OnInit, OnChanges {

    @Input()
    pbResponse: any;

    state = {
        txhash: "", height: "", gasWanted: "", gasUsed: "",
        events: []
    };

    constructor() {
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        this.parse();
    }

    /**
     * Flatten a multidimensional object
     *
     * For example:
     *   flattenObject{ a: 1, b: { c: 2 } }
     * Returns:
     *   { a: 1, c: 2}
     */
    flattenObject(obj:any): Object {
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

    eventsList(): string[][] {
        Object.entries(this.flattenObject(this.state.events)).forEach(([key, value], index) => {

            }
        );
        return [[]];
    }

    private parse() {
        if (this.pbResponse != null) {
            console.dir(this.pbResponse);
            console.dir(this.pbResponse.txResponse);
            console.dir(this.pbResponse.txResponse);
            let txResponse = this.pbResponse.txResponse;
            console.dir(txResponse);
            this.state = txResponse;
            console.dir(this.state);
        }
    }

}

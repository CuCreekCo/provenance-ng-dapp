import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-pb-response',
  templateUrl: './pb-response.component.html'
})
export class PbResponseComponent implements OnInit, OnChanges {

  @Input()
  pbResponse: any;

  state = { txhash: "", height: "", gasWanted: "", gasUsed: ""};

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.parse();
  }

  private parse() {
    if (this.pbResponse != null) {
      let txResponse = this.pbResponse.txResponse;
      this.state = txResponse;
    }
  }

}

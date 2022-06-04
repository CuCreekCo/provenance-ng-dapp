import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendHashComponent } from './send-hash.component';

describe('SendHashComponent', () => {
  let component: SendHashComponent;
  let fixture: ComponentFixture<SendHashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendHashComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SendHashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

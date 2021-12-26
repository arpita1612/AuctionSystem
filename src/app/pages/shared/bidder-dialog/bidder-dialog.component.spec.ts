import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidderDialogComponent } from './bidder-dialog.component';

describe('BidderDialogComponent', () => {
  let component: BidderDialogComponent;
  let fixture: ComponentFixture<BidderDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidderDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidderDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

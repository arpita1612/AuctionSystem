import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddarComponent } from './biddar.component';

describe('BiddarComponent', () => {
  let component: BiddarComponent;
  let fixture: ComponentFixture<BiddarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

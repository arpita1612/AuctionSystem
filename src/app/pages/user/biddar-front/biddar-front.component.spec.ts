import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddarFrontComponent } from './biddar-front.component';

describe('BiddarFrontComponent', () => {
  let component: BiddarFrontComponent;
  let fixture: ComponentFixture<BiddarFrontComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiddarFrontComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddarFrontComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

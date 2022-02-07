import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalonForWomenComponent } from './salon-for-women.component';

describe('SalonForWomenComponent', () => {
  let component: SalonForWomenComponent;
  let fixture: ComponentFixture<SalonForWomenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalonForWomenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SalonForWomenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

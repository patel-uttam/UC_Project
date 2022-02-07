import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderHomePageComponent } from './provider-home-page.component';

describe('ProviderHomePageComponent', () => {
  let component: ProviderHomePageComponent;
  let fixture: ComponentFixture<ProviderHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProviderHomePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

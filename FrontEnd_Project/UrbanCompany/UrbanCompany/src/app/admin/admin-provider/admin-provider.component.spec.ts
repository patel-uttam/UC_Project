import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProviderComponent } from './admin-provider.component';

describe('AdminProviderComponent', () => {
  let component: AdminProviderComponent;
  let fixture: ComponentFixture<AdminProviderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminProviderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAfterComponent } from './register-after.component';

describe('RegisterAfterComponent', () => {
  let component: RegisterAfterComponent;
  let fixture: ComponentFixture<RegisterAfterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterAfterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterAfterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

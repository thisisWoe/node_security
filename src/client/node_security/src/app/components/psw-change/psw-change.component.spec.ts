import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PswChangeComponent } from './psw-change.component';

describe('PswChangeComponent', () => {
  let component: PswChangeComponent;
  let fixture: ComponentFixture<PswChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PswChangeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PswChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

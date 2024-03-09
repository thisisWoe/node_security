import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleLogComponent } from './google-log.component';

describe('GoogleLogComponent', () => {
  let component: GoogleLogComponent;
  let fixture: ComponentFixture<GoogleLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GoogleLogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GoogleLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

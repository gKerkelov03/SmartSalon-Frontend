import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySalonsPageComponent } from './my-salons-page.component';

describe('MySalonsPageComponent', () => {
  let component: MySalonsPageComponent;
  let fixture: ComponentFixture<MySalonsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MySalonsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MySalonsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

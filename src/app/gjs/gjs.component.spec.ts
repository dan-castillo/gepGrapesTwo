import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GjsComponent } from './gjs.component';

describe('GjsComponent', () => {
  let component: GjsComponent;
  let fixture: ComponentFixture<GjsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GjsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GjsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

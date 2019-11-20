import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TesthomeComponent } from './testhome.component';

describe('TesthomeComponent', () => {
  let component: TesthomeComponent;
  let fixture: ComponentFixture<TesthomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TesthomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TesthomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

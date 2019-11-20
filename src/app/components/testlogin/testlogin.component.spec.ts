import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestloginComponent } from './testlogin.component';

describe('TestloginComponent', () => {
  let component: TestloginComponent;
  let fixture: ComponentFixture<TestloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

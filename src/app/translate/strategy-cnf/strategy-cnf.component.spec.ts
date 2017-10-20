import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyCNFComponent } from './strategy-cnf.component';

describe('StrategyCNFComponent', () => {
  let component: StrategyCNFComponent;
  let fixture: ComponentFixture<StrategyCNFComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategyCNFComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyCNFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

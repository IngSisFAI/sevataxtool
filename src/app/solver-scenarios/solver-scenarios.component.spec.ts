import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SolverScenariosComponent } from './solver-scenarios.component';

describe('SolverScenariosComponent', () => {
  let component: SolverScenariosComponent;
  let fixture: ComponentFixture<SolverScenariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SolverScenariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SolverScenariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

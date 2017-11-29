import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategySOLVERComponent } from './strategy-solver.component';

describe('StrategyCNFComponent', () => {
  let component: StrategySOLVERComponent;
  let fixture: ComponentFixture<StrategySOLVERComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategySOLVERComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategySOLVERComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

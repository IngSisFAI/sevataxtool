import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrategyUsComponent } from './strategy-us.component';

describe('StrategyUsComponent', () => {
  let component: StrategyUsComponent;
  let fixture: ComponentFixture<StrategyUsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrategyUsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrategyUsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
